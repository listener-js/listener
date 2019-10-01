import {
  ListenerBindings,
  ListenerInstances,
  Listeners,
  ListenerBindingOptions,
  ListenerOptions,
  ListenerBindingItem,
  LogEvent,
  ListenerBind,
  ListenerCallback,
  ListenerOutputs,
} from "./types"

export class Listener {
  public arrow = " < "

  public commentRegex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
  public fnRegex = /^(\(|function \w*\()?\s*lid[\),\s]/
  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)/i

  public bindings: ListenerBindings = {}
  public instances: ListenerInstances = {}
  public options: ListenerBindingOptions = {}

  private bindOutputs: Record<string, ListenerBind> = {}
  private listenerFns: Listeners = {}
  private originalFns: Listeners = {}

  private log: LogEvent

  public constructor() {
    this.reset(["listener.constructor"])
  }

  public bind(
    lid: string[],
    matchId: string[],
    targetId: string,
    options?: ListenerOptions
  ): void {
    const match = matchId.join(this.arrow)

    this.bindings[match] = this.bindings[match] || []

    this.bindings[match] = this.bindings[match].concat(
      targetId
    )

    if (options) {
      this.options[match] = this.options[match] || {}
      this.options[match][targetId] = options
    }
  }

  public captureOutputs(
    _lid: string[],
    args: any[],
    instances: Record<string, any>,
    fn: ListenerCallback
  ): ListenerOutputs {
    const promises = []
    const promisesById = {}

    const values = []
    const valuesById = {}

    for (const id in instances) {
      if (!fn) {
        continue
      }

      const out = fn(
        [id, ..._lid],
        id,
        instances[id],
        ...args
      )

      if (out && out.then) {
        promises.push(out)
        promisesById[id] = out
      } else {
        values.push(out)
        valuesById[id] = out
      }
    }

    return { promises, promisesById, values, valuesById }
  }

  public load(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Record<string, any> | Promise<Record<string, any>> {
    if (
      (!options || options.reload !== true) &&
      this.findLoadBindings(instances)
    ) {
      return this.load(lid, instances, {
        ...options,
        reload: true,
      })
    }

    return this.instances
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

      instance[fnId] = this.originalFns[key]
    }

    const recordKeys = [
      "bindOutputs",
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

    this.wrapFunction(
      ["listener", ...lid],
      "listener",
      this
    )

    this.applyBinding(
      ["listener", ...lid],
      [
        [
          ["listener.listenerLoaded", "log", "**"],
          "listener.logLoaded",
        ],
        [
          ["listener.load", "**"],
          "listener.applyCallbacksBindings",
          { prepend: 0.4 },
        ],
        [
          ["listener.load", "**"],
          "listener.wrapFunctions",
          { prepend: 0.3 },
        ],
        [
          ["listener.load", "**"],
          "listener.listenersBindings",
          { prepend: 0.2 },
        ],
        [
          ["listener.load", "**"],
          "listener.applyBindings",
          { prepend: 0.1 },
        ],
        [
          ["listener.load", "**"],
          "listener.listenersLoaded",
          { append: 0.1 },
        ],
      ]
    )
  }

  private applyBindings(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    if (options && options.reload === true) {
      return
    }

    for (const instanceId in instances) {
      const instance = instances[instanceId]
      const binding = this.bindOutputs[instanceId]

      if (!binding) {
        continue
      }

      this.applyBinding(
        [instanceId, ...lid],
        binding,
        instanceId,
        instance,
        this,
        options
      )
    }
  }

  private applyBinding(
    lid: string[],
    binding: ListenerBind,
    instanceId?: string,
    instance?: any,
    listener?: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    for (const [match, targetId, options] of binding) {
      this.bind(lid, match, targetId, options)
    }
  }

  private applyCallbacksBindings(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    if (options && options.reload === true) {
      return
    }

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      this.applyCallbackBindings(
        [instanceId, ...lid],
        instanceId,
        instance,
        this,
        options
      )
    }
  }

  private applyCallbackBindings(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (instance.anyListenerLoaded) {
      this.bind(
        lid,
        ["listener.listenerLoaded", "**"],
        `${instanceId}.anyListenerLoaded`
      )
    }

    if (instance.anyListenerBindings) {
      this.bind(
        lid,
        ["listener.listenerBindings", "**"],
        `${instanceId}.anyListenerBindings`
      )
    }

    if (instance.listenerBindings) {
      this.bind(
        lid,
        ["listener.listenerBindings", instanceId, "**"],
        `${instanceId}.listenerBindings`,
        { prepend: true, return: true }
      )
    }

    if (instance.listenerLoaded) {
      this.bind(
        lid,
        ["listener.listenerLoaded", instanceId, "**"],
        `${instanceId}.listenerLoaded`
      )
    }

    if (instance.listenerReset) {
      this.bind(
        lid,
        ["listener.reset", "**"],
        `${instanceId}.listenerReset`,
        { prepend: true }
      )
    }
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

    this.listAdd(lists, list, "**")

    for (const i of id.slice(0).reverse()) {
      key = key ? i + this.arrow + key : i
      this.listAdd(lists, list, "**" + this.arrow + key)
    }

    if (key) {
      this.listAdd(lists, list, key)
    }

    for (const i of id) {
      key2 = key2 ? key2 + this.arrow + i : i
      this.listAdd(lists, list, key2 + this.arrow + "**")
    }

    if (id.length <= 1) {
      this.listAdd(lists, list, "*")
    } else {
      this.listAdd(
        lists,
        list,
        "*" + this.arrow + id.slice(1).join(this.arrow)
      )
      this.listAdd(
        lists,
        list,
        id.slice(0, -1).join(this.arrow) + this.arrow + "*"
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
    const listeners = []

    for (const name in instance) {
      const fn = instance[name]

      if (
        typeof fn === "function" &&
        fn
          .toString()
          .replace(this.commentRegex, "")
          .match(this.fnRegex)
      ) {
        listeners.push(name)
      }
    }

    return listeners
  }

  private findLoadBindings(
    instances: Record<string, any>
  ): boolean {
    let found: boolean

    for (const instanceId in instances) {
      const binding = this.bindOutputs[instanceId]

      if (!binding) {
        continue
      }

      for (const bind of binding) {
        if (bind[0].indexOf("listener.load") > -1) {
          found = true
        }
      }
    }

    return found
  }

  private listenersBindings(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Promise<any> | void {
    if (options && options.reload === true) {
      return
    }

    const promises = []

    const {
      promisesById,
      valuesById,
    } = this.captureOutputs(
      lid,
      [this, options],
      instances,
      this.listenerBindings
    )

    this.bindOutputs = {
      ...this.bindOutputs,
      ...valuesById,
    }

    for (const id in promisesById) {
      const promise = promisesById[id]

      promises.push(
        promise.then((binding: ListenerBind): void => {
          this.bindOutputs = {
            ...this.bindOutputs,
            [id]: binding,
          }
        })
      )
    }

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private listenerBindings(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    return
  }

  private listenersLoaded(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (options && options.reload === true) {
      return
    }

    const { promises } = this.captureOutputs(
      lid,
      [this, options],
      instances,
      this.listenerLoaded
    )

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private listenerLoaded(
    lid: string[],
    instanceId: string,
    instance: any,
    listener: Listener,
    options?: Record<string, any>
  ): void | Promise<any> {
    return
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

  private listAdd(
    lists: ListenerBindings,
    list: ListenerBindingItem[],
    key: string
  ): void {
    if (lists[key]) {
      for (const item of lists[key]) {
        const opts = this.options[key]
          ? this.options[key][item]
          : {}

        list.push([item, opts])
      }
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

  private logLoaded(
    lid: string[],
    instanceId: string,
    instance: any
  ): void {
    this.log = instance.logEvent
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

  private wrapFunctions(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (options && options.reload === true) {
      return
    }

    const { promises } = this.captureOutputs(
      lid,
      [],
      instances,
      this.wrapFunction
    )

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private wrapFunction(
    lid: string[],
    instanceId: string,
    instance: any
  ): void | Promise<any> {
    this.instances[instanceId] = instance

    if (instance.then) {
      return
    }

    const listeners = this.extractListeners(instance)

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
