import {
  ListenerBindings,
  ListenerInternalInstances,
  ListenerInternalBindings,
  ListenerInternalOptions,
  ListenerBindingOptions,
  LogEvent,
  ListenerCallback,
  ListenerInternalBinding,
  ListenerInternalFunctions,
  ListenerCaptureOutputs,
  ListenerEvent,
} from "./types"

export class Listener {
  public id: string
  public arrow = " < "

  public commentRegex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
  public fnRegex = /^(\(|function \w*\()?\s*lid[\),\s]/
  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)/i

  public bindings: ListenerInternalBindings = {}
  public instances: ListenerInternalInstances = {}
  public options: ListenerInternalOptions = {}

  private callbackBindings: Record<
    string,
    ListenerBindings
  > = {}

  private listenerFns: ListenerInternalFunctions = {}
  private originalFns: ListenerInternalFunctions = {}

  private log: LogEvent

  public constructor(id: string) {
    this.id = id
    this.reset([`${id}.constructor`])
  }

  public bind(
    lid: string[],
    matchId: string[],
    targetId: string,
    options?: ListenerBindingOptions
  ): void {
    const match = matchId.join(this.arrow)

    this.bindings[match] = this.bindings[match] || []

    if (this.bindings[match].indexOf(targetId) < 0) {
      this.bindings[match] = this.bindings[match].concat(
        targetId
      )

      if (options) {
        this.options[match] = this.options[match] || {}
        this.options[match][targetId] = options
      }
    }
  }

  public captureOutputs(
    _lid: string[],
    instances: Record<string, any>,
    eventAssigns: Record<string, any>,
    fn: ListenerCallback
  ): ListenerCaptureOutputs {
    const promises = []
    const promisesById = {}

    const values = []
    const valuesById = {}

    for (const id in instances) {
      if (!fn) {
        continue
      }

      const out = fn([id, ..._lid], {
        instance: instances[id],
        instances,
        listener: this,
        ...eventAssigns,
      })

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

    for (const instanceId in this.instances) {
      const instance = this.instances[instanceId]

      if (instance !== this) {
        delete instance.id
      }
    }

    for (const key in this.originalFns) {
      const [instanceId, fnId] = this.parseId(key)
      const instance = this.instances[instanceId]

      instance[fnId] = this.originalFns[key]
    }

    const recordKeys = [
      "callbackBindings",
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

    this.applyInstanceFunctions([this.id, ...lid], {
      instance: this,
      listener: this,
    })

    this.applyListenerBindings(
      [this.id, ...lid],
      [
        [
          [`${this.id}.listenerLoaded`, "log", "**"],
          `${this.id}.logLoaded`,
        ],
        [
          [`${this.id}.load`, "**"],
          `${this.id}.applyInstancesId`,
          { prepend: 0.5 },
        ],
        [
          [`${this.id}.load`, "**"],
          `${this.id}.applyInstancesFunctions`,
          { prepend: 0.4 },
        ],
        [
          [`${this.id}.load`, "**"],
          `${this.id}.applyCallbacksBindings`,
          { prepend: 0.3 },
        ],
        [
          [`${this.id}.load`, "**"],
          `${this.id}.listenersBindings`,
          { prepend: 0.2 },
        ],
        [
          [`${this.id}.load`, "**"],
          `${this.id}.applyListenersBindings`,
          { prepend: 0.1 },
        ],
        [
          [`${this.id}.load`, "**"],
          `${this.id}.listenersLoaded`,
          { append: 0.1 },
        ],
      ]
    )
  }

  private applyInstancesFunctions(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    const { promises } = this.captureOutputs(
      lid,
      instances,
      { options },
      this.applyInstanceFunctions
    )

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private applyInstanceFunctions(
    lid: string[],
    { instance }: ListenerEvent
  ): void | Promise<any> {
    this.instances[instance.id] = instance

    if (instance.then) {
      return
    }

    const listeners = this.extractListeners(instance)

    for (const fnName of listeners) {
      const fnId = `${instance.id}.${fnName}`

      if (!instance[fnName] || this.originalFns[fnId]) {
        continue
      }

      this.originalFns[fnId] = instance[fnName]

      instance[fnName] = this.listenerWrapper(
        fnId,
        instance.id
      )

      this.listenerFns[fnId] = instance[fnName]
    }
  }

  private applyInstancesId(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    const { promises } = this.captureOutputs(
      lid,
      instances,
      { options },
      this.applyInstanceId
    )

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private applyInstanceId(
    lid: string[],
    { instance }: ListenerEvent
  ): void | Promise<any> {
    this.instances[lid[1]] = instance
    instance.id = lid[1]
  }

  private applyListenersBindings(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    for (const instanceId in instances) {
      const instance = instances[instanceId]
      const binding = this.callbackBindings[instanceId]

      if (!binding) {
        continue
      }

      this.applyListenerBindings(
        [instanceId, ...lid],
        binding,
        instanceId,
        instance,
        options
      )
    }
  }

  private applyListenerBindings(
    lid: string[],
    binding: ListenerBindings,
    instanceId?: string,
    instance?: any,
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
    for (const instanceId in instances) {
      const instance = instances[instanceId]

      this.applyCallbackBindings(
        [instanceId, ...lid],
        instanceId,
        instance,
        options
      )
    }
  }

  private applyCallbackBindings(
    lid: string[],
    instanceId: string,
    instance: any,
    options?: Record<string, any>
  ): void | Promise<any> {
    if (instance.listenerBindings) {
      this.bind(
        lid,
        [`${this.id}.listenerBindings`, instanceId, "**"],
        `${instanceId}.listenerBindings`,
        { prepend: true, return: true }
      )
    }

    if (instance.listenerExtendBindings) {
      this.bind(
        lid,
        [`${this.id}.listenerBindings`, "**"],
        `${instanceId}.listenerExtendBindings`,
        { intercept: true }
      )
    }

    if (instance.listenerLoaded) {
      this.bind(
        lid,
        [`${this.id}.listenerLoaded`, instanceId, "**"],
        `${instanceId}.listenerLoaded`
      )
    }

    if (instance.listenerReset) {
      this.bind(
        lid,
        [`${this.id}.reset`, "**"],
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

      const extArgs =
        options && options.listener ? [this, ...args] : args

      if (isBefore) {
        let tmpOut: any

        if (promise) {
          tmpOut = promise.then((): any =>
            fn(id, ...extArgs)
          )
        } else {
          tmpOut = fn(id, ...extArgs)
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
            (): any => out || fn(id, ...extArgs)
          )
        } else {
          out = out || fn(id, ...extArgs)

          if (out && out.then) {
            promise = out
            out = undefined
          } else {
            promise = undefined
          }
        }
      } else {
        let tmpOut: any

        if (promise) {
          tmpOut = promise.then((out): any => {
            const tmpOut = isPeek
              ? fn(id, out, ...extArgs)
              : fn(id, ...extArgs)

            if (tmpOut && tmpOut.then) {
              return tmpOut
            }

            return isReturn && tmpOut !== undefined
              ? tmpOut
              : out
          })
        } else {
          tmpOut = isPeek
            ? fn(id, out, ...extArgs)
            : fn(id, ...extArgs)
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
  ): ListenerInternalBinding[] {
    const lists = this.bindings

    let key: string
    let key2: string
    let list: ListenerInternalBinding[] = [
      [fnId, { index: 0 }],
    ]

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
        [
          `${this.id}.buildList`,
          `${this.id}.emit`,
          ..._lid,
        ],
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

  private listenersBindings(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Promise<any> | void {
    const promises = []

    const {
      promisesById,
      valuesById,
    } = this.captureOutputs(
      lid,
      instances,
      { options },
      this.listenerBindings
    )

    this.callbackBindings = {
      ...this.callbackBindings,
      ...valuesById,
    }

    for (const id in promisesById) {
      const promise = promisesById[id]

      promises.push(
        promise.then((binding: ListenerBindings): void => {
          this.callbackBindings = {
            ...this.callbackBindings,
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
    event: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenersLoaded(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    const { promises } = this.captureOutputs(
      lid,
      instances,
      { options },
      this.listenerLoaded
    )

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private listenerLoaded(
    lid: string[],
    event: ListenerEvent
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
    lists: ListenerInternalBindings,
    list: ListenerInternalBinding[],
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
    [, a = {}]: ListenerInternalBinding,
    [, b = {}]: ListenerInternalBinding
  ): number {
    const aIndex = this.optsToIndex(a)
    const bIndex = this.optsToIndex(b)

    return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0
  }

  private logLoaded(
    lid: string[],
    { instance }: ListenerEvent
  ): void {
    this.log = instance.logEvent
  }

  private optsToIndex(
    opts: ListenerBindingOptions
  ): number {
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

export const instance = new Listener("listener")
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
