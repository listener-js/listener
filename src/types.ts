import { Listener } from "."

export interface ListenerEmitItem {
  args: any[]
  id: string[]
  fn: ListenerInternalFunction
  opts: ListenerEmitOptions
  out?: any
  setter?: ListenerEmitItemSetter
}

export interface ListenerEvent {
  existing?: string[]
  instance: any
  listener: Listener
  instances?: Record<string, any>
  options?: Record<string, any>
}

export interface ListenerEmitItemSetter {
  out: (o: any) => any
  promise: (p: Promise<any>) => any
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

export interface ListenerEmitFunction {
  promise: Promise<any>
  out: any
}

export type ListenerInternalFunctions = Record<
  string,
  ListenerInternalFunction
>

export type ListenerInternalFunction = (
  id: string[],
  ...arg: any[]
) => any

export type ListenerInternalInstances = Record<string, any>
