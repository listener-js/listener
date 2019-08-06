export interface ListenerOptions {
  append?: boolean | number
  index?: number
  prepend?: boolean | number
  useReturn?: boolean
}

export type ListenerFunction =
  (id: string[], ...arg: any[]) => any

export type Listeners = Record<string, ListenerFunction>

export type ListenerBindingItem = [string, ListenerOptions]

export type ListenerBindingOptions =
  Record<string, ListenerOptions>

export type ListenerBindings = Record<string, string[]>

export type ListenerBindingsListSorter =
  (a: ListenerBindingItem, b: ListenerBindingItem) => number

export type ListenerInstances = Record<string, any>

export type logEvent =
  (id: string[], level: string, ...value: any[]) => void
