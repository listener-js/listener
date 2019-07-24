export type EventId = (
  (string | string[])[] | string | null | undefined
)

export type ListenerType = (id: EventId, ...arg: any[]) => any
export type ListenersType = Record<string, ListenerType[]>
export type ListenerBindingsType = Record<string, string[]>

export const listeners: ListenersType = {}
export const bindings: ListenerBindingsType = { "*": [] }

export function flatten(id: EventId): string[] {
  if (Array.isArray(id)) {
    let result = []
    for (const item of id) {
      result = result.concat(item)
    }
    return result
  } else if (id) {
    return [id]
  } else {
    return []
  }
}

export function listener(
  instance: any,
  instanceId: string,
  ...functionIds: string[]
) {
  for (const fnId of functionIds) {
    const fn = instance[fnId]
    const key = `${instanceId}.${fnId}`

    if (!fn.isListener) {
      instance[fnId] = (eid: EventId, ...args: any[]) => {
        const id = flatten(eid).concat([key])
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

      instance[fnId].isListener = true

      listeners[key] = listeners[key] || []
      listeners[key] = listeners[key].concat([instance[fnId]])
    }
  }
}

export function emit(key: string, id: string[], ...args: any[]) {
  let binds = bindings["*"]
  let idKey = key
  
  if (bindings[key]) {
    binds = binds.concat(bindings[key])
  }

  for (const i of id) {
    idKey = idKey + "." + i
    if (bindings[idKey]) {
      binds = binds.concat(bindings[idKey])
    }
  }

  let promise = Promise.resolve()
  let isAsync = false
  let out
  
  for (const target of binds) {
    if (key === target) {
      continue
    }

    let targetIdKey = target
    let listens = listeners[target] || []

    for (const i of id) {
      targetIdKey = targetIdKey + "." + i
      if (listeners[targetIdKey]) {
        listens = listens.concat(listeners[targetIdKey])
      }
    }
    
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

export function listen(sourceId: EventId, targetId: EventId) {
  const source = flatten(sourceId).join(".")
  const target = flatten(targetId).join(".")
  bindings[source] = bindings[source] || []
  bindings[source] = bindings[source].concat([target])
}

export function reset() {
  for (var key in bindings) delete bindings[key]
  bindings["*"] = []
}
