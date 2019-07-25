import { listenerWrapper } from "./emit"
import { flattenId } from "./flattenId"
import { bindings, listeners } from "./records"

export { reset } from "./reset"

export type EventId = (
  (string | string[])[] | string | null | undefined
)

export class Listener {
  public listen(
    sourceId: EventId, targetId: EventId
  ): void {
    const source = flattenId(sourceId).join(".")
    const target = flattenId(targetId).join(".")

    bindings[source] = bindings[source] || []
    bindings[source] = bindings[source].concat([target])
  }

  public listener(
    instances: Record<string, any>
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

        instance[fnId] = listenerWrapper
          .bind({ fn, instance, key })

        listeners[key] = listeners[key] || []
        listeners[key] = listeners[key]
          .concat([instance[fnId]])
      }

      if (instance.listen) {
        instance.listen(this)
      }
    }
  }
}

const instance = new Listener()

export const listen = instance.listen.bind(instance)
export const listener = instance.listener.bind(instance)
