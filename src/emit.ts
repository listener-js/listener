import {
  ListenerInternalBindingOptions,
  ListenerInternalBinding,
} from "./bindings"

import { ListenerInternalFunction } from "./types"

export interface ListenerEmitFunction {
  promise: Promise<any>
  out: any
}

export interface ListenerEmitItem {
  args: any[]
  id: string[]
  fn: ListenerInternalFunction
  opts: ListenerEmitOptions
  setter?: ListenerEmitItemSetter
}

export interface ListenerEmitItemSetter {
  out: (o?: any) => any
  promise: (p?: Promise<any>) => any
}

export interface ListenerEmitOptions {
  addListener: boolean
  isBefore: boolean
  isIntercept: boolean
  isMain: boolean
  isPeek: boolean
  isReturn: boolean
  once: boolean
}

export class Emit {
  public static customizeArgs(
    args: any[],
    { addListener }: ListenerEmitOptions
  ): any[] {
    let customArgs: any[]

    if (addListener) {
      customArgs = addListener ? [this, ...args] : args
    }

    return customArgs
  }

  public static customizeIds(
    id: string[],
    { customIds }: ListenerInternalBinding
  ): any[] {
    let customId: string[]

    if (customIds) {
      customId = [...customIds, ...id]
    }

    return customId
  }

  public static callFunction({
    args,
    fn,
    id,
    opts,
    setter,
  }: ListenerEmitItem): ListenerEmitFunction {
    const { isMain, isPeek, isReturn } = opts

    let out = setter.out()
    let promise: Promise<any>

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

  public static callItem(item: ListenerEmitItem): any {
    const { out, promise } = Emit.callFunction(item)
    const { opts, setter } = item

    setter.out(out)
    setter.promise(promise)

    return this.itemOutput(promise, opts, setter)
  }

  public static itemOutput(
    promise: Promise<any>,
    opts: ListenerEmitOptions,
    setter: ListenerEmitItemSetter
  ): any {
    const out = setter.out()
    const { isMain, isReturn } = opts
    const isMainWithoutReturn = isMain && out === undefined

    if (promise && (isMainWithoutReturn || isReturn)) {
      return promise ? promise.then(setter.out) : out
    } else {
      return promise ? promise : out
    }
  }

  public static options(
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
}
