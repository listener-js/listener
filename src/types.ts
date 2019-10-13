import { Listener } from "."

export interface ListenerEvent {
  existing?: string[]
  instance: any
  listener: Listener
  instances?: Record<string, any>
  options?: Record<string, any>
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
