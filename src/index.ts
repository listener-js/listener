import { listenerWrapper } from "./emit"
import { flattenId } from "./flattenId"
import { bindings, listeners } from "./records"

export { reset } from "./reset"

export type EventId = (
  (string | string[])[] | string | null | undefined
)

export function listener(
  instance: any,
  instanceId: string,
  ...functionIds: string[]
) {
  for (const fnId of functionIds) {
    const fn = instance[fnId]
    const key = `${instanceId}.${fnId}`

    if (!fn.isListener) {
      instance[fnId] = listenerWrapper.bind({ instance, key, fn })
      instance[fnId].isListener = true

      listeners[key] = listeners[key] || []
      listeners[key] = listeners[key].concat([instance[fnId]])
    }
  }
}

export function listen(sourceId: EventId, targetId: EventId) {
  const source = flattenId(sourceId).join(".")
  const target = flattenId(targetId).join(".")

  bindings[source] = bindings[source] || []
  bindings[source] = bindings[source].concat([target])
}
