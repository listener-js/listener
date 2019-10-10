import { Listener } from "."

export interface ListenerEvent {
  existing?: string[]
  instance: any
  listener: Listener
  instances?: Record<string, any>
  options?: Record<string, any>
}

export interface ListenerBindingOptions {
  append?: boolean | number
  index?: number
  intercept?: boolean
  listener?: boolean
  peek?: boolean
  prepend?: boolean | number
  return?: boolean
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
}

export interface ListenerEmitFunction {
  promise: Promise<any>
  out: any
}

export type ListenerBindTargets =
  | string[]
  | [string, ListenerBindingOptions][]

export type ListenerCallback = (
  lid: string[],
  event: ListenerEvent
) => void | Promise<any>

export type ListenerCaptureOutputs = {
  promises: Promise<any>[]
  promisesById: Record<string, Promise<any>>
  values: any[]
  valuesById: Record<string, any>
}

export type ListenerInternalBindings = Record<
  string,
  string[]
>

export type ListenerInternalBinding = [
  string,
  ListenerBindingOptions
]

export type ListenerInternalFunctions = Record<
  string,
  ListenerInternalFunction
>

export type ListenerInternalFunction = (
  id: string[],
  ...arg: any[]
) => any

export type ListenerInternalOptions = Record<
  string,
  ListenerBindingOptions
>

export type ListenerInternalInstances = Record<string, any>

export type LogEvent = (
  id: string[],
  level: string,
  ...value: any[]
) => void
