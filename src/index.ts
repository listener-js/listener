import {
  ListenerBindings,
  ListenerInstances,
  Listeners,
  ListenerBindingOptions,
  ListenerOptions,
  ListenerBindingItem,
  LogEvent,
} from "./types"

export class Listener {
  public callbacks = [
    "listenerInit",
    "listenerLoad",
    "listenerReset",
  ]
  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)|([^\.]+)/i
  public instances: ListenerInstances = {}
  public listeners = ["listen", ...this.callbacks]
  public options: ListenerBindingOptions = {}

  private bindings: ListenerBindings = {}
  private listenerFns: Listeners = {}
  private log: LogEvent = (): void => {}
  private originalFns: Listeners = {}

  public constructor() {
    this.reset()
  }

  public listen(
    id: string[],
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

  public listener(
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Promise<any> {
    let promises = []

    for (const instanceId in instances) {
      for (const listenerId of this.callbacks) {
        this.listen(
          ["listener"],
          [`listener.${listenerId}`, instanceId, "**"],
          `${instanceId}.${listenerId}`,
          { append: 1000, return: true }
        )
      }

      const out = this.listenerInit(
        [instanceId],
        instanceId,
        instances[instanceId],
        this,
        options
      )

      if (out && out.then) {
        promises = promises.concat(out)
      }
    }

    for (const instanceId in instances) {
      const out = this.listenerLoad(
        [instanceId],
        instanceId,
        instances[instanceId],
        this,
        options
      )

      if (out && out.then) {
        promises = promises.concat(out)
      }
    }

    return Promise.all(promises)
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

  public reset(): void {
    this.log = (): void => {}

    for (const instanceId in this.instances) {
      this.listenerReset(
        [instanceId],
        instanceId,
        this.instances[instanceId],
        this
      )
    }

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

    this.listenerInit(["reset"], "listener", this, this)
    this.listenerLoad(["reset"], "listener", this, this)
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

  private buildList(
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

    return list
  }

  private emit(
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

    const list = this.buildList(fnId, id)

    if (id.indexOf("log.logEvent") < 0) {
      this.log(["emit", ...id], "internal", ...args)
    }

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

  private listenerInit(
    id: string[],
    instanceId: string,
    instance: any,
    // eslint-disable-next-line
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): void | Promise<any> {
    if (instance.then) {
      return
    }

    this.instances[instanceId] = instance
    instance.instanceId = instanceId

    if (instance !== this) {
      instance.listener = this
    }

    this.wrapListener(instanceId, instance)

    if (instanceId === "log") {
      this.log = instance.logEvent
    }
  }

  private listenerLoad(
    // eslint-disable-next-line
    id: string[],
    // eslint-disable-next-line
    instanceId: string,
    // eslint-disable-next-line
    instance: any,
    // eslint-disable-next-line
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): void | Promise<any> {
    return
  }

  private listenerReset(
    // eslint-disable-next-line
    id: string[],
    // eslint-disable-next-line
    instanceId: string,
    // eslint-disable-next-line
    instance: any,
    // eslint-disable-next-line
    listener: Listener,
    // eslint-disable-next-line
    options?: Record<string, any>
  ): void {
    return
  }

  private listenerWrapper(
    fnId: string,
    instanceId: string
  ): Function {
    return (eid: string[], ...args: any[]): any => {
      const id = [fnId].concat(eid || [])
      return this.emit(fnId, id, instanceId, ...args)
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

  private wrapListener(
    instanceId: string,
    instance: any
  ): void {
    const listeners = (instance.listeners || []).concat(
      this.callbacks
    )

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
export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
export const reset = instance.reset.bind(instance)
