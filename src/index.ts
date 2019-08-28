import {
  ListenerBindings,
  ListenerInstances,
  Listeners,
  ListenerBindingOptions,
  ListenerOptions,
  ListenerBindingItem,
  LogEvent,
  ListenerPending
} from "./types"

export class Listener {
  public bindings: ListenerBindings = {}
  public instances: ListenerInstances = {}
  public listeners: Listeners = {}
  public options: ListenerBindingOptions = {}
  public originals: Listeners = {}
  public pending: ListenerPending = {}

  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)|([^\.]+)/i

  private log: LogEvent = (): void => {}

  public listen(
    matchId: string[],
    targetIds: string[],
    options?: ListenerOptions
  ): void {
    const match = matchId.join(".")

    this.bindings[match] = this.bindings[match] || []
    
    this.bindings[match] =
      this.bindings[match].concat(targetIds)
    
    if (options) {
      this.options[match] = this.options[match] || {}
      for (const target of targetIds) {
        this.options[match][target] = options
      }
    }

    this.log(
      [`listen([${matchId.join(", ")}], [${targetIds.join(", ")}])`],
      "internal", options
    )
  }

  public listener(
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    const instanceIds = this.validate(instances)

    for (const instanceId of instanceIds) {
      const instance = instances[instanceId]

      if (instance.then) {
        if (this.pending[instanceId]) {
          this.log(
            [`listener({ ${instanceId} })`],
            "warn",
            "tried to setup instance more than once"
          )
          continue
        }

        this.pending[instanceId] = instance.then(
          (inst: any): void => {
            this.processInstance(instanceId, inst, options)
          }
        )
      } else {
        instance.instanceId = instanceId
        instance.listener = this

        this.wrapListener(instanceId, instance)
      }
    }

    for (const instanceId of instanceIds) {
      const instance = instances[instanceId]

      if (!instance.then) {
        this.joinInstance(instanceId, instance)
      }
    }

    for (const instanceId of instanceIds) {
      const instance = instances[instanceId]
      
      if (!instance.then && instance.listen) {
        instance.listen(options || {})
      }
    }

    this.log(
      [`listener({ ${Object.keys(instances).join(", ")} })`],
      "internal", options
    )
  }

  public reset(): void {
    this.log(["reset"], "internal")
    this.log = (): void => {}
    
    for (let key in this.originals) {
      const [instanceId, fnId] =
        key.match(this.idRegex).slice(2)
      
      const instance = this.instances[instanceId]
      
      if (instance.instanceId) {
        if (instance.reset) {
          instance.reset()
        }

        delete instance.instanceId
        delete instance.listener
      }

      instance[fnId] = this.originals[key]
      delete this.originals[key]
    }

    const recordKeys =
      ["bindings", "instances", "listeners", "options"]
    
    for (const key of recordKeys) {
      for (const subKey in this[key]) {
        delete this[key][subKey]
      }
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
        lists, list, "*." + id.slice(1).join(".")
      )
      list = this.addList(
        lists, list, id.slice(0, -1).join(".") + ".*"
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
      this.log(["emit", ...id], "internal", list)
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

      const fn = isMain ?
        this.originals[fnId].bind(
          this.instances[instanceId]
        ) :
        this.listeners[target]

      if (!fn) {
        continue
      }

      if (isBefore) {
        let tmpOut: any

        if (promise) {
          tmpOut = promise.then(
            (): any => fn(id, ...args)
          )
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
        if (out) {
          return out
        }

        out = fn(id, ...args)

        if (!out || !out.then) {
          promise = undefined
        }
      } else {
        let tmpOut: any

        if (promise && out && out.then) {
          tmpOut = promise.then(
            (): any => isPeek ?
              fn(id, out, ...args) :
              fn(id, ...args)
          )
        } else {
          tmpOut = isPeek ?
            fn(id, out, ...args) :
            fn(id, ...args)
        }

        if (tmpOut && tmpOut.then) {
          promise = tmpOut
        }

        if (isReturn && tmpOut !== undefined) {
          out = tmpOut
        }
      }
    }

    return promise && out && out.then ?
      promise.then((): any => out) :
      out
  }

  private joinInstance(
    instanceId: string,
    instance: any
  ): void {
    const joinInstanceIds: Set<string> = new Set()

    if (!instance || !instance.instances) {
      return
    }

    for (const id of instance.instances) {
      if (instance[id]) {
        continue
      }

      const match = id.match(this.idRegex)

      let joinInstanceId: string
      let fnId: string

      if (match) {
        [joinInstanceId, fnId] = match.slice(2)
        joinInstanceId = joinInstanceId || match[4]
      }

      if (!joinInstanceId) {
        continue
      }

      if (!this.instances[joinInstanceId]) {
        this.log(
          [`listener({ ${id} })`],
          "warn", `instance '${joinInstanceId}' not found`
        )
        continue
      }

      joinInstanceIds.add(joinInstanceId)

      if (!fnId) {
        instance[joinInstanceId] =
          this.instances[joinInstanceId]

        continue
      }

      if (!this.instances[joinInstanceId][fnId]) {
        this.log(
          [`listener({ ${id} })`],
          "warn",
          `function '${joinInstanceId}.${fnId}' not found`
        )
        continue
      }

      instance[fnId] =
        (id: string[], ...args: any[]): any => {
          return this.instances[joinInstanceId][fnId](
            [`${instanceId}.${fnId}`, ...id],
            ...args
          )
        }
    }

    joinInstanceIds.forEach((joinInstanceId): void => {
      if (this.instances[joinInstanceId].join) {
        this.instances[joinInstanceId].join(
          instanceId, instance
        )
      }
    })
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

  private processInstance(
    instanceId: string,
    instance: any,
    options?: Record<string, any>
  ): void {
    this.wrapListener(instanceId, instance)
    this.joinInstance(instanceId, instance)

    if (instance.listen) {
      instance.listen(options || {})
    }
  }

  private listenerWrapper(
    fnId: string, instanceId: string
  ): Function {
    return (eid: string[], ...args: any[]): any => {
      const id = [fnId].concat(eid || [])
      return this.emit(fnId, id, instanceId, ...args)
    }
  }

  private validate(
    instances: Record<string, any>
  ): string[] {
    return Object.keys(instances).filter(
      (instanceId): boolean => {
        const instance = instances[instanceId]

        if (!instance) {
          this.log(
            [`listener({ ${instanceId} })`],
            "warn", "instance not found"
          )
          return
        }

        if (
          !instance.listeners &&
          !instance.instances
        ) {
          this.log(
            [`listener({ ${instanceId} })`],
            "warn",
            "'listeners' or 'instances' property not found"
          )
          return
        }

        if (instance.instanceId) {
          this.log(
            [`listener({ ${instanceId} })`],
            "warn", "tried to setup instance more than once"
          )
          return
        }

        return true
      }
    )
  }

  private wrapListener(
    instanceId: string,
    instance: any
  ): void {
    if (!instance.listeners) {
      return
    }

    this.instances[instanceId] = instance

    for (const fnName of instance.listeners) {
      if (!instance[fnName]) {
        continue
      }

      const fnId = `${instanceId}.${fnName}`

      this.originals[fnId] = instance[fnName]

      instance[fnName] = this.listenerWrapper(
        fnId, instanceId
      )

      this.listeners[fnId] = instance[fnName]
    }

    if (instanceId === "log") {
      this.log = instance.logEvent
    }
  }
}

export const instance = new Listener()
export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
export const reset = instance.reset.bind(instance)
