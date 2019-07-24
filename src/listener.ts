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

export function listener(key: string, instance: any) {
  const fnKey = key.split(/[.#]/)[1]
  const fn = instance[fnKey]

  if (!fn.isListener) {
    instance[fnKey] = (eid: EventId, ...args: any[]) => {
      const id = flatten(eid).concat([key])
      const out = fn.call(instance, id, ...args)
      
      if (out.then) {
        let promiseValue

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
        return emitOut.then ? out : (emitOut || out)
      }
    }

    if (!listeners[key]) {
      listeners[key] = listeners[key] || []
    }
    
    instance[fnKey].isListener = true
    listeners[key] = listeners[key].concat([instance[fnKey]])
  }
}

export function emit(key: string, id: EventId, ...args: any[]) {
  let promise = Promise.resolve()
  let isAsync = false
  let out
  
  for (const target of bindings["*"].concat(bindings[key] || [])) {
    if (listeners[target]) {
      for (const fn of listeners[target]) {
        out = fn(id, ...args)
        if (out.then) {
          isAsync = true
          promise = promise.then(() => out)
        }
      }
    }
  }

  return isAsync ? promise : out
}

export function listen(source: string, target: string) {
  bindings[source] = bindings[source] || []
  bindings[source] = bindings[source].concat([target])
}
