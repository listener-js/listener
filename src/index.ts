import {
  ListenerBindings,
  ListenerInstances,
  Listeners,
  ListenerBindingOptions,
  ListenerOptions,
  ListenerBindingItem,
  LogEvent
} from "./types"

export class Listener {
  public bindings: ListenerBindings = {}
  public instances: ListenerInstances = {}
  public listeners: Listeners = {}
  public options: ListenerBindingOptions = {}
  public originals: Listeners = {}

  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)/i

  private log: LogEvent = (): void => {}

  public listen(
    sourceId: string[],
    targetId: string[],
    options?: ListenerOptions
  ): void {
    const source = sourceId.join(".")
    const target = targetId.join(".")

    this.bindings[source] = this.bindings[source] || []
    
    this.bindings[source] =
      this.bindings[source].concat([target])
    
    if (options) {
      this.options[source] = this.options[source] || {}
      this.options[source][target] = options
    }

    this.log(
      ["listener.listen"],
      "internal",
      sourceId, targetId, options
    )
  }

  public listener(
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (
        !instance ||
        !instance.listeners
      ) {
        this.log(
          ["listener.listener"],
          "warn",
          `"listeners" array not found on instance "${instanceId}"`
        )
        continue
      }

      this.instances[instanceId] = instance
      
      if (instance._listeners) {
        this.log(
          ["listener.listener"],
          "warn",
          `tried to setup instance "${instanceId}" more than once`
        )
        continue
      }

      this.log(
        ["listener.listener"],
        "internal",
        instanceId, options
      )

      instance._listeners = true

      for (const fnName of instance.listeners) {
        if (!instance[fnName]) {
          this.log(
            ["listener.listener"],
            "warn",
            `could not find function "${fnName}" on instance "${instanceId}"`
          )
          continue
        }

        const fnId = `${instanceId}.${fnName}`

        this.originals[fnId] = instance[fnName]

        instance[fnName] = this.listenerWrapper(
          fnId, instanceId
        )

        this.listeners[fnId] = instance[fnName]
      }

      if (instance.listen) {
        instance.listen(this, options || {})
      }

      if (instanceId === "log") {
        this.log = instance.logEvent
      }
    }
  }

  public reset(): void {
    this.log(["listener.reset"], "internal")
    this.log = (): void => {}
    
    for (let key in this.originals) {
      const [instanceId, fnId] =
        key.match(this.idRegex).slice(2)

      this.instances[instanceId][fnId] =
        this.originals[key]

      delete this.instances[instanceId]._listeners
      delete this.originals[key]
    }
    
    for (let key in this.bindings) {
      delete this.bindings[key]
    }
    
    for (let key in this.instances) {
      delete this.instances[key]
    }
    
    for (let key in this.listeners) {
      delete this.listeners[key]
    }
    
    for (let key in this.options) {
      delete this.options[key]
    }
  }

  private addList(
    lists: ListenerBindings,
    list: ListenerBindingItem[],
    key: string
  ): ListenerBindingItem[] {
    if (lists[key]) {
      for (const item of lists[key]) {
        const opts = this.options[key] ?
          this.options[key][item] : {}
        
        list = list.concat([[ item, opts ]])
      }
    }
    return list
  }

  private buildList(
    fnId: string, id: string[]
  ): ListenerBindingItem[] {
    const lists = this.bindings

    let key: string
    let key2: string
    let list: ListenerBindingItem[] = [
      [fnId, { index: 0 }]
    ]

    list = this.addList(lists, list, "**")
    
    for (const i of id.slice(1).reverse()) {
      key = key ? i + "." + key : i
      list = this.addList(lists, list, "**." + key)
    }

    for (const i of id.slice(0, -1)) {
      key2 = key2 ? key2 + "." + i : i
      list = this.addList(lists, list, key2 + ".**")
    }

    if (id.length <= 1) {
      list = this.addList(lists, list, "*")
    } else {
      list = this.addList(lists, list, "*." + key)
      list = this.addList(lists, list, key2 + ".*")
    }

    if (key && id.length) {
      key = id[0] + "." + key
    }

    if (!key && id.length) {
      key = id[0]
    }

    if (key) {
      list = this.addList(lists, list, key)
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
    let promise: Promise<any>
    let out: any
    let finalOut: any

    if (
      this.bindings["**"] &&
      this.bindings["**"].indexOf(fnId) > -1
    ) {
      return this.originals[fnId].call(
        this.instances[instanceId], id, ...args
      )
    }

    const list = this.buildList(fnId, id)

    if (id.indexOf("log.logEvent") < 0) {
      this.log(["listener.emit", ...id], "internal", list)
    }

    for (const [target, options] of list) {
      const isMainFn = options && options.index === 0

      if (!isMainFn && fnId === target) {
        continue
      }

      const fn = isMainFn ?
        this.originals[fnId].bind(
          this.instances[instanceId]
        ) :
        this.listeners[target]

      if (!fn) {
        continue
      }

      out = promise ?
        promise.then((): any => fn(id, ...args)) :
        fn(id, ...args)

      if (out && out.then) {
        promise = out
      }

      if (options &&
        (
          (!finalOut && isMainFn) ||
          options.useReturn
        )
      ) {
        finalOut = promise || out
      }
    }

    if (promise) {
      return promise.then((): any => finalOut)
    }

    return finalOut
  }

  private listenerWrapper(
    fnId: string, instanceId: string
  ): Function {
    return (eid: string[], ...args: any[]): any => {
      const id = [fnId].concat(eid)
      return this.emit(fnId, id, instanceId, ...args)
    }
  }

  private listSort(
    [, a = {}]: ListenerBindingItem,
    [, b = {}]: ListenerBindingItem
  ): number {
    const aIndex = this.optsToIndex(a)
    const bIndex = this.optsToIndex(b)

    return (aIndex > bIndex) ? 1 :
      (aIndex < bIndex) ? -1 : 0
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

const instance = new Listener()

export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
export const reset = instance.reset.bind(instance)
