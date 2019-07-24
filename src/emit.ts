import { EventId } from "./"
import { buildList } from "./buildList"
import { flattenId } from "./flattenId"
import { bindings, listeners } from "./records"

export function emit(key: string, id: string[], ...args: any[]) {
  let promise = Promise.resolve()
  let isAsync = false
  let out

  const binds = buildList(bindings, bindings["*"], key, id)

  for (const target of binds) {
    if (key === target) {
      continue
    }

    const listens = buildList(listeners, [], target, id)

    for (const fn of listens) {
      out = fn(id, ...args)
      if (out.then) {
        isAsync = true
        promise = promise.then(() => out)
      }
    }
  }

  return isAsync ? promise : out
}

export function listenerWrapper(eid: EventId, ...args: any[]) {
  const { fn, instance, key } = this
  const id = flattenId(eid).concat([key])
  const out = fn.call(instance, id, ...args)

  if (out.then) {
    let promiseValue: any

    return out.then(
      (value: any) => {
        promiseValue = value
        return emit(key, id, ...args)
      }
    ).then(
      (value: any) => value ? value : promiseValue
    )
  } else {
    const emitOut = emit(key, id, ...args)
    return emitOut && emitOut.then ? out : (emitOut || out)
  }
}
