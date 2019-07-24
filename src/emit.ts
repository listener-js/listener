import { EventId } from "./"
import { buildList } from "./buildList"
import { flattenId } from "./flattenId"
import { bindings, listeners } from "./records"

export function emit(key: string, id: string[], ...args: any[]) {
  let promise
  let out

  const binds = buildList(bindings, bindings["*"], key, id)

  for (const target of binds) {
    if (key === target) {
      continue
    }

    const listens = buildList(listeners, [], target, id)

    for (const fn of listens) {
      out = promise ?
        promise.then(() => fn(id, ...args)) :
        fn(id, ...args)
      
      if (out.then) {
        promise = out
      }
    }
  }

  return promise || out
}

export function listenerWrapper(eid: EventId, ...args: any[]) {
  const { fn, instance, key } = this
  const id = flattenId(eid).concat([key])
  const out = fn.call(instance, id, ...args)

  if (out.then) {
    let firstValue: any

    return out.then(
      (value: any) => {
        firstValue = value
        return emit(key, id, ...args)
      }
    ).then(
      (value: any) => value || firstValue
    )
  } else {
    const emitOut = emit(key, id, ...args)
    return emitOut && emitOut.then ? out : (emitOut || out)
  }
}
