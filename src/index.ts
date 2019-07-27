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

      for (const fnId of instance.listeners) {
        const fn = instance[fnId]
        const key = `${instanceId}.${fnId}`

        instance[fnId] = this.listenerWrapper(
          fn, instance, key
        )

        this.listeners[key] = this.listeners[key] || []
        this.listeners[key] = this.listeners[key]
          .concat([instance[fnId]])
      }

      if (instance.listen) {
        instance.listen(this, options || {})
      }
    }
  }

  private emit(
    key: string, id: string[], ...args: any[]
  ): any {
    let promise
    let out

    if (this.bindings["**"].indexOf(key) > -1) {
      return
    }

    const binds = this.buildList(
      this.bindings, key, id
    )

    for (const target of binds) {
      if (key === target) {
        continue
      }

      const listens = this.listeners[target]

      if (!listens) {
        continue
      }

      for (const fn of listens) {
        out = promise ?
          promise.then((): any => fn(id, ...args)) :
          fn(id, ...args)

        if (out && out.then) {
          promise = out
        }
      }
    }

    return promise || out
  }

  private listenerWrapper(
    fn: any, instance: any, key: string
  ): Function {
    return (eid: string[], ...args: any[]): any => {
      const id = eid.concat([key])
      const out = fn.call(instance, id, ...args)

      if (out && out.then) {
        let firstValue: any

        return out.then(
          (value: any): any => {
            firstValue = value
            return this.emit(key, id, ...args)
          }
        ).then(
          (value: any): any => value || firstValue
        )
      } else {
        const emitOut = this.emit(key, id, ...args)
        return emitOut || out
      }
    }
  }

  public reset(): void {
    for (var key in this.bindings) {
      delete this.bindings[key]
    }
    this.bindings["**"] = []
  }

  private buildList(
    lists: ListenersAnyType,
    key: string,
    id: string[]
  ): any[] {
    let list = []
    let idKey = key

    list = this.addList(list, lists, "**")

    if (id.length > 1) {
      list = this.addList(list, lists, idKey + ".**")
    }

    for (const i of id.slice(0, -2)) {
      idKey = idKey + "." + i
      list = this.addList(list, lists, idKey + ".**")
    }

    if (id.length <= 1) {
      list = this.addList(list, lists, "*")
    } else {
      list = this.addList(list, lists, idKey + ".*")
    }

    idKey = idKey + (
      id.length <= 1 ? "" : "." + id[id.length - 2]
    )

    list = this.addList(list, lists, idKey)

    return list
  }

  private addList(
    list: string[], lists: ListenersAnyType, key: string
  ): string[] {
    if (lists[key]) {
      return list.concat(lists[key])
    }
    return list
  }
}

const instance = new Listener()

export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
export const reset = instance.reset.bind(instance)
