import {
  ListenerInternalBindings,
  ListenerInternalBindingOptions,
  Bindings,
} from "./bindings"

import {
  ARROW,
  REGEX_ID,
  REGEX_COMMENT,
  REGEX_FN,
} from "./constants"

import {
  ListenerInternalInstances,
  ListenerInternalFunctions,
  ListenerEvent,
  ListenerEmitOptions,
  ListenerInternalFunction,
  ListenerEmitFunction,
  ListenerEmitItemSetter,
} from "./types"

import { Uid } from "./uid"

export class Listener {
  public id: string

  public bindings: Record<string, Bindings> = {}
  public instances: ListenerInternalInstances = {}

  private listenerFns: ListenerInternalFunctions = {}
  private originalFns: ListenerInternalFunctions = {}

  public constructor(id: string) {
    this.id = id
    this.reset([`${id}.constructor`])
  }

  public bind(
    lid: string[],
    matchId: string[],
    ...targets: ListenerInternalBindings[]
  ): void {
    const match = matchId.join(ARROW)

    this.bindings[match] =
      this.bindings[match] || new Bindings(match)

    this.bindings[match].add(...targets)
  }

  public load(
    lid_: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Record<string, any> | Promise<Record<string, any>> {
    const id = lid_[1]

    for (const instanceId in instances) {
      const instance = instances[instanceId]

      this.bind(
        lid_,
        [`${this.id}.load`, id, "**"],
        [
          `${this.id}.applyInstanceId`,
          instanceId,
          { append: 0.1, once: true },
        ],
        [
          `${this.id}.applyInstanceFunctions`,
          instanceId,
          { append: 0.2, once: true },
        ],
        [
          `${this.id}.callListenerBeforeLoaded`,
          instanceId,
          { append: 0.3, once: true },
        ],
        [
          `${this.id}.callListenerLoaded`,
          instanceId,
          { append: 0.4, once: true },
        ]
      )

      if (instance.listenerBeforeLoaded) {
        this.bind(
          lid_,
          [
            `${this.id}.listenerBeforeLoaded`,
            instanceId,
            "**",
          ],
          `${instanceId}.listenerBeforeLoaded`
        )
      }

      if (instance.listenerLoaded) {
        this.bind(
          lid_,
          [`${this.id}.listenerLoaded`, instanceId, "**"],
          `${instanceId}.listenerLoaded`
        )
      }

      if (instance.listenerBeforeLoadedAny) {
        this.bind(
          lid_,
          [`${this.id}.listenerBeforeLoaded`, "**"],
          `${instanceId}.listenerBeforeLoadedAny`
        )
      }

      if (instance.listenerLoadedAny) {
        this.bind(
          lid_,
          [`${this.id}.listenerLoaded`, "**"],
          `${instanceId}.listenerLoadedAny`
        )
      }

      if (instance.listenerReset) {
        this.bind(
          lid_,
          [`${this.id}.reset`, "**"],
          [
            `${instanceId}.listenerReset`,
            { listener: true, prepend: true },
          ]
        )
      }
    }

    return this.instances
  }

  public parseId(id: string): [string, string] {
    const match = id.match(REGEX_ID)

    let joinInstanceId: string
    let fnId: string

    if (match) {
      ;[joinInstanceId, fnId] = match.slice(2)
      joinInstanceId = joinInstanceId || match[4]
    }

    return [joinInstanceId, fnId]
  }

  public reset(lid: string[]): void {
    Uid.reset()

    for (const instanceId in this.instances) {
      const instance = this.instances[instanceId]

      if (instance !== this) {
        delete instance.id
      }
    }

    for (const key in this.originalFns) {
      const [instanceId, fnId] = this.parseId(key)
      const instance = this.instances[instanceId]

      instance[fnId] = this.originalFns[key]
    }

    const recordKeys = [
      "bindings",
      "instances",
      "listenerFns",
      "options",
      "originalFns",
    ]

    for (const key of recordKeys) {
      for (const subKey in this[key]) {
        delete this[key][subKey]
      }
    }

    this.applyInstanceFunctions(
      [
        "listener.applyInstanceFunctions",
        "listener",
        ...lid,
      ],
      { listener: this }
    )
  }

  private applyInstanceFunctions(
    lid: string[],
    instances: Record<string, any>
  ): void | Promise<any> {
    const id = lid[1]
    const instance = instances[id]

    this.instances[id] = instance

    if (instance.then) {
      return
    }

    const listeners = this.extractListeners(instance)

    for (const [fnName, lidName] of listeners) {
      const fnId = `${instance.id}.${fnName}`

      if (!instance[fnName] || this.originalFns[fnId]) {
        continue
      }

      this.originalFns[fnId] = instance[fnName]

      instance[fnName] = this.listenerWrapper(
        fnId,
        instance.id,
        lidName
      )

      this.listenerFns[fnId] = instance[fnName]
    }
  }

  private applyInstanceId(
    lid: string[],
    instances: Record<string, any>
  ): void | Promise<any> {
    const id = lid[1]
    const instance = instances[id]

    this.instances[id] = instance
    instance.id = id
  }

  private callListenerBeforeLoaded(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<void> {
    return this.callWithEvent(
      lid,
      "listenerBeforeLoaded",
      instances,
      options
    )
  }

  private callListenerLoaded(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<void> {
    return this.callWithEvent(
      lid,
      "listenerLoaded",
      instances,
      options
    )
  }

  private callWithEvent(
    _lid: string[],
    fn: string,
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<void> {
    const id = _lid[1]
    const instance = instances[id]

    const event: ListenerEvent = {
      existing: this.diffInstances(instances),
      instance,
      instances,
      listener: this,
      options,
    }

    return this[fn]([id, ..._lid], event)
  }

  private diffInstances(
    instances: Record<string, any>
  ): string[] {
    const allInstances = Object.keys(this.instances)
    const newInstances = Object.keys(instances)

    return allInstances.filter(
      i => newInstances.indexOf(i) < 0
    )
  }

  private emit(
    _lid: string[],
    fnId: string,
    instanceId: string,
    ...args: any[]
  ): any {
    let out: any
    let promise: Promise<any>

    const id = [fnId].concat(_lid || [])
    const instance = this.instances[instanceId]

    if (
      this.bindings["**"] &&
      this.bindings["**"].targetIds.has(fnId)
    ) {
      return this.originalFns[fnId].call(
        instance,
        id,
        ...args
      )
    }

    const setter = {
      out: (o: any): any =>
        (out = o === undefined ? out : o),
      promise: (p: Promise<any>): any =>
        (promise = p === undefined ? promise : p),
    }

    for (const index of [-1, 0, 1]) {
      const list = Bindings.list(
        _lid,
        this.bindings,
        fnId,
        id,
        index
      )

      for (const binding of list) {
        const {
          customIds,
          matchId,
          options,
          targetId,
        } = binding

        const opts = this.emitOptions(options)
        const { addListener, isMain } = opts

        if (!isMain && fnId === targetId) {
          continue
        }

        const fn = isMain
          ? this.originalFns[fnId].bind(instance)
          : this.listenerFns[targetId]

        if (!fn) {
          continue
        }

        if (opts.once) {
          this.bindings[matchId].remove(binding)
        }

        let customArgs: any[]
        let customId: string[]

        if (addListener) {
          customArgs = addListener ? [this, ...args] : args
        }

        if (customIds) {
          customId = [...customIds, ...id]
        }

        if (promise) {
          promise = promise.then(() =>
            this.emitItem(
              customArgs || args,
              customId || id,
              fn,
              opts,
              out,
              promise,
              setter
            )
          )
        } else {
          this.emitItem(
            customArgs || args,
            customId || id,
            fn,
            opts,
            out,
            promise,
            setter
          )
        }
      }
    }

    return promise ? promise.then(setter.out) : out
  }

  private emitFunction(
    args: any[],
    id: string[],
    fn: ListenerInternalFunction,
    opts: ListenerEmitOptions,
    out: any
  ): ListenerEmitFunction {
    const { isMain, isPeek, isReturn } = opts

    let promise

    if (isMain && out !== undefined) {
      return { out, promise }
    }

    const tmpOut = isPeek
      ? fn(id, out, ...args)
      : fn(id, ...args)

    if (tmpOut && tmpOut.then) {
      promise = tmpOut
    } else if (
      (isMain || isReturn) &&
      tmpOut !== undefined
    ) {
      out = tmpOut
    }

    return { out, promise }
  }

  private emitItem(
    args: any[],
    id: string[],
    fn: ListenerInternalFunction,
    opts: ListenerEmitOptions,
    out: any,
    promise: Promise<any>,
    setter: ListenerEmitItemSetter
  ): any {
    const { out: o, promise: p } = this.emitFunction(
      args,
      id,
      fn,
      opts,
      out
    )

    out = setter.out(o)
    promise = setter.promise(p)

    return this.emitItemOutput(p, opts, out, setter)
  }

  private emitItemOutput(
    promise: Promise<any>,
    opts: ListenerEmitOptions,
    out: any,
    setter: ListenerEmitItemSetter
  ): any {
    const { isMain, isReturn } = opts
    const isMainWithoutReturn = isMain && out === undefined

    if (promise && (isMainWithoutReturn || isReturn)) {
      return promise ? promise.then(setter.out) : out
    } else {
      return promise ? promise : out
    }
  }

  private emitOptions(
    options: ListenerInternalBindingOptions
  ): ListenerEmitOptions {
    const isIntercept = options && options.intercept

    return {
      addListener: options && options.listener,
      isBefore: options && options.index < 0,
      isIntercept,
      isMain: options && options.index === 0,
      isPeek: isIntercept || (options && options.peek),
      isReturn: isIntercept || (options && options.return),
      once: options && options.once,
    }
  }

  private extractListeners(
    instance: any
  ): [string, string][] {
    const listeners = []

    for (const name in instance) {
      const fn = instance[name]

      let match: RegExpMatchArray

      if (
        typeof fn === "function" &&
        (match = (fn as Function)
          .toString()
          .replace(REGEX_COMMENT, "")
          .match(REGEX_FN))
      ) {
        listeners.push([name, match[2]])
      }
    }

    return listeners
  }

  private listenerBeforeLoaded(
    lid: string[],
    event: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenerLoaded(
    lid: string[],
    event: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenerWrapper(
    fnId: string,
    instanceId: string,
    lidName: string
  ): Function {
    return (_lid: string[], ...args: any[]): any => {
      if (lidName === "lid_") {
        _lid = [Uid.uid()].concat(_lid)
      }
      return this.emit(_lid, fnId, instanceId, ...args)
    }
  }
}

export const instance = new Listener("listener")
export default instance

// eslint-disable-next-line max-len
export const bind: typeof instance.bind = instance.bind.bind(
  instance
)

// eslint-disable-next-line max-len
export const load: typeof instance.load = instance.load.bind(
  instance
)
// eslint-disable-next-line max-len
export const reset: typeof instance.reset = instance.reset.bind(
  instance
)
export * from "./types"
