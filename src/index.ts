import { buildList } from "./buildList"
import { flattenId } from "./flattenId"

export type EventId = (
  (string | string[])[] | string | null | undefined
)

export type ListenerType =
  (id: EventId, ...arg: any[]) => any

export type ListenersType = Record<string, ListenerType[]>
export type ListenerBindingsType = Record<string, string[]>

export class Listener {
  private bindings: ListenerBindingsType = { "*": [] }
  private listeners: ListenersType = {}

  public listen(
    sourceId: EventId, targetId: EventId
  ): void {
    const source = flattenId(sourceId).join(".")
    const target = flattenId(targetId).join(".")

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

    if (this.bindings["*"].indexOf(key) > -1) {
      return
    }

    const binds = buildList(
      this.bindings, this.bindings["*"], key, id
    )

    for (const target of binds) {
      if (key === target) {
        continue
      }

      const listens = buildList(
        this.listeners, [], target, id
      )

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
    return (eid: EventId, ...args: any[]): any => {
      const id = flattenId(eid).concat([key])
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

        return emitOut && emitOut.then ?
          out : (emitOut || out)
      }
    }
  }

  public reset(): void {
    for (var key in this.bindings) {
      delete this.bindings[key]
    }
    this.bindings["*"] = []
  }
}

const instance = new Listener()

export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
export const reset = instance.reset.bind(instance)
