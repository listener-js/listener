export interface ListenerBindingOptions {
  append?: boolean | number
  index?: number
  intercept?: boolean
  listener?: boolean
  peek?: boolean
  prepend?: boolean | number
  return?: boolean
}

export type ListenerBindings = ListenerBinding[]

export type ListenerBinding = [
  string[],
  string,
  ListenerBindingOptions?
]

export type ListenerCallback = (
  lid: string[],
  instanceId: string,
  instance: any,
  ...args: any[]
) => void | Promise<any>

export type ListenerCallbackArgs = [
  string[],
  string,
  any,
  ...any[]
]

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
