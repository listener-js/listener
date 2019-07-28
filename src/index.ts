export type ListenerType =
  (id: string[], ...arg: any[]) => any

export type ListenersType = Record<string, ListenerType[]>
export type ListenersAnyType = Record<string, any[]>
export type ListenerBindingsType = Record<string, string[]>

export class Listener {
  private bindings: ListenerBindingsType = {}
  private listeners: ListenersType = {}

  public listen(
    sourceId: string[], targetId: string[]
  ): void {
    const source = sourceId.join(".")
    const target = targetId.join(".")

    this.bindings[source] = this.bindings[source] || []
    
    this.bindings[source] =
      this.bindings[source].concat([target])
  }

  public listener(
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void {
    for (const instanceId in instances) {
      const instance = instances[instanceId]

      if (
        !instance ||
        !instance.listeners ||
        instance._listeners
      ) {
        continue
      }

      instance._listeners = true

      for (const fnName of instance.listeners) {
        const fn = instance[fnName]
        const fnId = `${instanceId}.${fnName}`

        instance[fnName] = this.listenerWrapper(
          fn, instance, fnId
        )

        this.listeners[fnId] = this.listeners[fnId] || []
        this.listeners[fnId] = this.listeners[fnId]
          .concat([instance[fnName]])
      }

      if (instance.listen) {
        instance.listen(this, options || {})
      }
    }
  }

  private emit(
    fnId: string, id: string[], ...args: any[]
  ): any {
    let promise: Promise<any>
    let out: any

    if (
      this.bindings["**"] &&
      this.bindings["**"].indexOf(fnId) > -1
    ) {
      return
    }

    this.buildList(id).forEach((target): void => {
      if (fnId === target) {
        return
      }

      const listens = this.listeners[target]

      if (!listens) {
        return
      }

      for (const fn of listens) {
        out = promise ?
          promise.then((): any => fn(id, ...args)) :
          fn(id, ...args)

        if (out && out.then) {
          promise = out
        }
      }
    })

    return promise || out
  }

  private listenerWrapper(
    fn: any, instance: any, fnId: string
  ): Function {
    return (eid: string[], ...args: any[]): any => {
      const id = [fnId].concat(eid)
      const out = fn.call(instance, id, ...args)

      if (out && out.then) {
        let firstValue: any

        return out.then(
          (value: any): any => {
            firstValue = value
            return this.emit(fnId, id, ...args)
          }
        ).then(
          (value: any): any => value || firstValue
        )
      } else {
        const emitOut = this.emit(fnId, id, ...args)
        return emitOut || out
      }
    }
  }

  public reset(): void {
    for (var key in this.bindings) {
      delete this.bindings[key]
    }
  }

  private buildList(id: string[]): Set<string> {
    const lists = this.bindings

    let key: string
    let key2: string
    let list: Set<string> = new Set()

    this.addList(lists, list, "**")
    
    for (const i of id.slice(1).reverse()) {
      key = key ? i + "." + key : i
      this.addList(lists, list, "**." + key)
    }

    for (const i of id.slice(0, -1)) {
      key2 = key2 ? key2 + "." + i : i
      this.addList(lists, list, key2 + ".**")
    }

    if (id.length <= 1) {
      this.addList(lists, list, "*")
    } else {
      this.addList(lists, list, "*." + key)
      this.addList(lists, list, key2 + ".*")
    }

    if (key && id.length) {
      key = id[0] + "." + key
    }

    if (!key && id.length) {
      key = id[0]
    }

    if (key) {
      this.addList(lists, list, key)
    }

    return list
  }

  private addList(
    lists: ListenersAnyType, list: Set<string>, key: string
  ): void {
    if (lists[key]) {
      for (const item of lists[key]) {
        list.add(item)
      }
    }
  }
}

const instance = new Listener()

export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
export const reset = instance.reset.bind(instance)
