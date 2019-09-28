import {
  ListenerBindings,
  ListenerInstances,
  Listeners,
  ListenerBindingOptions,
  ListenerOptions,
  ListenerBindingItem,
  LogEvent,
  ListenerBind,
} from "./types"

export class Listener {
  public commentRegex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
  public fnRegex = /^(\(|function \w*\()?\s*lid[\),\s]/
  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)/i
  public instances: ListenerInstances = {}
  public options: ListenerBindingOptions = {}

  private bindings: ListenerBindings = {}
  private listenerFns: Listeners = {}
  private log: LogEvent = (): void => {}
  private originalFns: Listeners = {}

  public constructor() {
    this.reset(["listener.constructor"])
  }

  public bind(
    lid: string[],
    matchId: string[],
    targetId: string,
    options?: ListenerOptions
  ): void {
    const match = matchId.join(".")

    this.bindings[match] = this.bindings[match] || []

    this.bindings[match] = this.bindings[match].concat(
      targetId
    )

    if (options) {
      this.options[match] = this.options[match] || {}
      this.options[match][targetId] = options
    }
  }

  public load(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Record<string, any> | Promise<Record<string, any>> {
    const loadPromises = this.loadInstances(lid, instances)

    const [bindings, bindingPromises] = this.readBindings(
      lid,
      instances,
      options
    )

    if (!options || options.reload !== false) {
      const loadBindings = this.findLoadBindings(bindings)

      if (Object.keys(loadBindings).length) {
        this.loadBindings(
          lid,
          loadBindings,
          instances,
          options
        )

        return this.load(lid, instances, {
          ...options,
          reload: false,
        })
      }
    }

    if (loadPromises.length || bindingPromises.length) {
      return Promise.all(loadPromises)
        .then(() => Promise.all(bindingPromises))
        .then(() => {
          this.loadBindings(
            lid,
            bindings,
            instances,
            options
          )
        })
        .then(
          (): Promise<any> =>
            Promise.all(
              this.instancesLoaded(lid, instances, options)
            )
        )
        .then((): Record<string, any> => this.instances)
    } else {
      this.loadBindings(lid, bindings, instances, options)

      const loadedPromises = this.instancesLoaded(
        lid,
        instances,
        options
      )

      if (loadedPromises.length) {
        return Promise.all(loadedPromises).then(
          (): Record<string, any> => this.instances
        )
      }

      return this.instances
    }
  }

  public parseId(id: string): [string, string] {
    const match = id.match(this.idRegex)

    let joinInstanceId: string
    let fnId: string

    if (match) {
      ;[joinInstanceId, fnId] = match.slice(2)
      joinInstanceId = joinInstanceId || match[4]
    }

    return [joinInstanceId, fnId]
  }

  public reset(lid: string[]): void {
    this.log = (): void => {}

    for (const key in this.originalFns) {
      const [instanceId, fnId] = this.parseId(key)

      const instance = this.instances[instanceId]

      if (instance.instanceId) {
        delete instance.instanceId
        delete instance.listener
      }

      instance[fnId] = this.originalFns[key]
    }

    const recordKeys = [
      "bindings",
      "instances",
      "listenerFns",
      "options",
      "originalFns",
    ]

    for (const key of recordKeys) {
      for (const subKey in this[key]) {
        delete this[key][subKey]
      }
    }

    this.loadInstance(
      ["listener", ...lid],
      "listener",
      this
    )

    this.bind(
      lid,
      ["listener.instanceLoaded", "log", "**"],
      "listener.logLoaded"
    )
  }

  private addList(
    lists: ListenerBindings,
    list: ListenerBindingItem[],
    key: string
  ): ListenerBindingItem[] {
    if (lists[key]) {
      for (const item of lists[key]) {
        const opts = this.options[key]
          ? this.options[key][item]
          : {}

        list = list.concat([[item, opts]])
      }
    }
    return list
  }

  private emit(
    _lid: string[],
    fnId: string,
    id: string[],
    instanceId: string,
    ...args: any[]
  ): any {
    let out: any
    let promise: Promise<any>

    const instance = this.instances[instanceId]

    if (
      this.bindings["**"] &&
      this.bindings["**"].indexOf(fnId) > -1
    ) {
      return this.originalFns[fnId].call(
        instance,
        id,
        ...args
      )
    }

    const list = this.emitList(_lid, fnId, id)

    for (const [target, options] of list) {
      const isBefore = options && options.index < 0
      const isMain = options && options.index === 0
      const isIntercept = options && options.intercept

      const isPeek =
        isIntercept || (options && options.peek)

      const isReturn =
        isIntercept || (options && options.return)

      if (!isMain && fnId === target) {
        continue
      }

      const fn = isMain
        ? this.originalFns[fnId].bind(instance)
        : this.listenerFns[target]

      if (!fn) {
        continue
      }

      if (isBefore) {
        let tmpOut: any

        if (promise) {
          tmpOut = promise.then((): any => fn(id, ...args))
        } else {
          tmpOut = fn(id, ...args)
        }

        if (tmpOut && tmpOut.then) {
          promise = tmpOut
        }

        if (isReturn && tmpOut !== undefined) {
          out = tmpOut
        }
      } else if (isMain) {
        if (promise) {
          promise = promise.then(
            (): any => out || fn(id, ...args)
          )
        } else {
          out = out || fn(id, ...args)

          if (out && out.then) {
            promise = out
          } else {
            promise = undefined
          }
        }
      } else {
        let tmpOut: any

        if (promise) {
          tmpOut = promise.then((): any =>
            isPeek ? fn(id, out, ...args) : fn(id, ...args)
          )
        } else {
          tmpOut = isPeek
            ? fn(id, out, ...args)
            : fn(id, ...args)
        }

        if (tmpOut && tmpOut.then) {
          promise = tmpOut
        }

        if (isReturn && tmpOut !== undefined) {
          out = tmpOut
        }
      }
    }

    return promise && out
      ? promise.then((): any => out)
      : promise || out
  }

  private emitList(
    _lid: string[],
    fnId: string,
    id: string[]
  ): ListenerBindingItem[] {
    const lists = this.bindings

    let key: string
    let key2: string
    let list: ListenerBindingItem[] = [[fnId, { index: 0 }]]

    list = this.addList(lists, list, "**")

    for (const i of id.slice(0).reverse()) {
      key = key ? i + "." + key : i
      list = this.addList(lists, list, "**." + key)
    }

    if (key) {
      list = this.addList(lists, list, key)
    }

    for (const i of id) {
      key2 = key2 ? key2 + "." + i : i
      list = this.addList(lists, list, key2 + ".**")
    }

    if (id.length <= 1) {
      list = this.addList(lists, list, "*")
    } else {
      list = this.addList(
        lists,
        list,
        "*." + id.slice(1).join(".")
      )
      list = this.addList(
        lists,
        list,
        id.slice(0, -1).join(".") + ".*"
      )
    }

    list = list.sort(this.listSort.bind(this))

    if (_lid.indexOf("log.logEvent") < 0 && this.log) {
      this.log(
        ["listener.buildList", "listener.emit", ..._lid],
        "internal",
        list
      )
    }

    return list
  }

  private extractListeners(instance: any): string[] {
    let listeners = []

    for (const name in instance) {
      const fn = instance[name]

      if (
        typeof fn === "function" &&
        fn
          .toString()
          .replace(this.commentRegex, "")
          .match(this.fnRegex)
      ) {
        listeners = listeners.concat(name)
      }
    }

    return listeners
  }

  private findLoadBindings(
    bindings: Record<string, ListenerBind>
  ): Record<string, ListenerBind> {
    const loadBindings = {}

    for (const instanceId in bindings) {
      const binding = bindings[instanceId]

      let found

      for (const bind of binding) {
        if (bind[0].indexOf("listener.load") > -1) {
          found = true
        }
      }

      if (found) {
        loadBindings[instanceId] = binding
      }
    }

    return loadBindings
  }

  private instancesLoaded(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Promise<Record<string, any>>[] {
    let promises = []

    for (const instanceId in instances) {
      const out = this.instanceLoaded(
        [instanceId, ...lid],
        instanceId,
        instances[instanceId],
        this,
        options
      )

      if (out && out.then) {
        promises = promises.concat(out)
      }
    }

    return promises
  }

  private instanceLoaded(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    return
  }

  private logLoaded(
    lid: string[],
    instanceId: string,
    instance: any
  ): void {
    this.log = instance.logEvent
  }

  private readBindings(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): [Record<string, ListenerBind>, Promise<any>[]] {
    const bindings = {}
    let promises = []

    if (options && options.bind === false) {
      return [bindings, promises]
    }

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (!instance.listenerBind) {
        continue
      }

      const out = instance.listenerBind(
        lid,
        instanceId,
        instance,
        this,
        options
      )

      if (out && out.then) {
        promises = promises.concat(
          out.then((binding: ListenerBind): void => {
            bindings[instanceId] = binding
          })
        )
      } else {
        bindings[instanceId] = out
      }
    }

    return [bindings, promises]
  }

  private loadBindings(
    lid: string[],
    bindings: Record<string, ListenerBind>,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    if (options && options.bind === false) {
      return
    }

    for (const instanceId in instances) {
      const instance = instances[instanceId]
      const binding = bindings[instanceId]

      if (!binding) {
        continue
      }

      this.loadBinding(
        [instanceId, ...lid],
        binding,
        instanceId,
        instance,
        options
      )
    }
  }

  private loadBinding(
    lid: string[],
    binding: ListenerBind,
    instanceId: string,
    instance: any,
    options?: Record<string, any>
  ): void | Promise<any> {
    for (const [match, targetId, options] of binding) {
      this.bind(lid, match, targetId, options)
    }
  }

  private loadInstances(
    lid: string[],
    instances: Record<string, any>
  ): Promise<Record<string, any>>[] {
    let promises = []

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (instance.then) {
        continue
      }

      const out = this.loadInstance(
        [instanceId, ...lid],
        instanceId,
        instance
      )

      if (out && out.then) {
        promises = promises.concat(out)
      }
    }

    return promises
  }

  private loadInstance(
    lid: string[],
    instanceId: string,
    instance: any
  ): void | Promise<any> {
    const listeners = this.extractListeners(instance)

    this.instances[instanceId] = instance

    for (const fnName of listeners) {
      const fnId = `${instanceId}.${fnName}`

      if (!instance[fnName] || this.originalFns[fnId]) {
        continue
      }

      this.originalFns[fnId] = instance[fnName]

      instance[fnName] = this.listenerWrapper(
        fnId,
        instanceId
      )

      this.listenerFns[fnId] = instance[fnName]
    }
  }

  private listenerWrapper(
    fnId: string,
    instanceId: string
  ): Function {
    return (_lid: string[], ...args: any[]): any => {
      const id = [fnId].concat(_lid || [])
      return this.emit(id, fnId, id, instanceId, ...args)
    }
  }

  private listSort(
    [, a = {}]: ListenerBindingItem,
    [, b = {}]: ListenerBindingItem
  ): number {
    const aIndex = this.optsToIndex(a)
    const bIndex = this.optsToIndex(b)

    return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0
  }

  private optsToIndex(opts: ListenerOptions): number {
    if (typeof opts.index === "number") {
      return opts.index
    }
    if (opts.prepend) {
      if (typeof opts.prepend === "number") {
        return opts.prepend * -1
      } else {
        return -1
      }
    }
    if (opts.append) {
      if (typeof opts.append === "number") {
        return opts.append
      } else {
        return 1
      }
    }
    return 1
  }
}

export const instance = new Listener()
export default instance

// eslint-disable-next-line max-len
export const bind: typeof instance.bind = instance.bind.bind(
  instance
)

// eslint-disable-next-line max-len
export const load: typeof instance.load = instance.load.bind(
  instance
)
// eslint-disable-next-line max-len
export const reset: typeof instance.reset = instance.reset.bind(
  instance
)
export * from "./types"
