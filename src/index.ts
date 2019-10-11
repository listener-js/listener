import {
  ListenerInternalInstances,
  LogEvent,
  ListenerCallback,
  ListenerInternalFunctions,
  ListenerCaptureOutputs,
  ListenerEvent,
  ListenerEmitOptions,
  ListenerInternalFunction,
  ListenerEmitFunction,
  ListenerEmitItemSetter,
} from "./types"

import {
  ListenerInternalBindings,
  ListenerInternalBindingOptions,
  Bindings,
} from "./bindings"

import { ARROW } from "./constants"

export class Listener {
  public id: string

  public commentRegex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm
  public fnRegex = /^(\(|function \w*\()?\s*lid[\),\s]/
  public idRegex = /(\*{1,2})|([^\.]+)\.(.+)/i

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
      this.bindings[match] || new Bindings()

    this.bindings[match].add(...targets)
  }

  public captureOutputs(
    _lid: string[],
    instances: Record<string, any>,
    eventAssigns: Record<string, any>,
    fn: ListenerCallback
  ): ListenerCaptureOutputs {
    const promises = []
    const promisesById = {}

    const values = []
    const valuesById = {}

    for (const id in instances) {
      if (!fn) {
        continue
      }

      const out = fn([id, ..._lid], {
        instance: instances[id],
        instances,
        listener: this,
        ...eventAssigns,
      })

      if (out && out.then) {
        promises.push(out)
        promisesById[id] = out
      } else {
        values.push(out)
        valuesById[id] = out
      }
    }

    return { promises, promisesById, values, valuesById }
  }

  public load(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): Record<string, any> | Promise<Record<string, any>> {
    for (const instanceId in instances) {
      const instance = instances[instanceId]

      this.bind(
        lid,
        [`${this.id}.listenerLoaded`, instanceId, "**"],
        [`${this.id}.applyInstanceId`, { prepend: 0.3 }],
        [
          `${this.id}.applyInstanceFunctions`,
          { prepend: 0.2 },
        ],
        [
          `${this.id}.listenerBeforeLoaded`,
          { prepend: 0.1 },
        ]
      )

      if (instance.listenerBeforeLoaded) {
        this.bind(
          lid,
          [
            `${this.id}.listenerBeforeLoaded`,
            `${this.id}.listenerLoaded`,
            instanceId,
            "**",
          ],
          `${instanceId}.listenerBeforeLoaded`
        )
      }

      if (instance.listenerLoaded) {
        this.bind(
          lid,
          [`${this.id}.listenerLoaded`, instanceId, "**"],
          `${instanceId}.listenerLoaded`
        )
      }

      if (instance.listenerBeforeLoadedAny) {
        this.bind(
          lid,
          [`${this.id}.listenerBeforeLoaded`, "**"],
          `${instanceId}.listenerBeforeLoadedAny`
        )
      }

      if (instance.listenerLoadedAny) {
        this.bind(
          lid,
          [`${this.id}.listenerLoaded`, "**"],
          `${instanceId}.listenerLoadedAny`
        )
      }

      if (instance.listenerReset) {
        this.bind(
          lid,
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
    const match = id.match(this.idRegex)

    let joinInstanceId: string
    let fnId: string

    if (match) {
      ;[joinInstanceId, fnId] = match.slice(2)
      joinInstanceId = joinInstanceId || match[4]
    }

    return [joinInstanceId, fnId]
  }

  public reset(lid: string[]): void {
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

    this.applyInstanceFunctions(lid, {
      instance: this,
      listener: this,
    })

    this.bind(
      lid,
      [`${this.id}.load`, "**"],
      [`${this.id}.listenersLoaded`, { append: 0.1 }]
    )
  }

  private applyInstanceFunctions(
    lid: string[],
    { instance }: ListenerEvent
  ): void | Promise<any> {
    this.instances[instance.id] = instance

    if (instance.then) {
      return
    }

    const listeners = this.extractListeners(instance)

    for (const fnName of listeners) {
      const fnId = `${instance.id}.${fnName}`

      if (!instance[fnName] || this.originalFns[fnId]) {
        continue
      }

      this.originalFns[fnId] = instance[fnName]

      instance[fnName] = this.listenerWrapper(
        fnId,
        instance.id
      )

      this.listenerFns[fnId] = instance[fnName]
    }
  }

  private applyInstanceId(
    lid: string[],
    { instance }: ListenerEvent
  ): void | Promise<any> {
    this.instances[lid[2]] = instance
    instance.id = lid[2]
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

    const list = Bindings.list(
      _lid,
      this.bindings,
      fnId,
      id
    )

    const setter = {
      out: (o): any => (out = o === undefined ? out : o),
      promise: (p): any =>
        (promise = p === undefined ? promise : p),
    }

    for (const { customIds, options, targetId } of list) {
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
    }
  }

  private extractListeners(instance: any): string[] {
    const listeners = []

    for (const name in instance) {
      const fn = instance[name]

      if (
        typeof fn === "function" &&
        fn
          .toString()
          .replace(this.commentRegex, "")
          .match(this.fnRegex)
      ) {
        listeners.push(name)
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

  private listenersLoaded(
    lid: string[],
    instances: Record<string, any>,
    options?: Record<string, any>
  ): void | Promise<any> {
    const existing = this.diffInstances(instances)

    const { promises } = this.captureOutputs(
      lid,
      instances,
      { existing, options },
      this.listenerLoaded
    )

    if (promises.length) {
      return Promise.all(promises)
    }
  }

  private listenerLoaded(
    lid: string[],
    event: ListenerEvent
  ): void | Promise<any> {
    return
  }

  private listenerWrapper(
    fnId: string,
    instanceId: string
  ): Function {
    return (_lid: string[], ...args: any[]): any => {
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
