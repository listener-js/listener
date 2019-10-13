import { Listener } from "."

export interface ListenerEvent {
  existing?: string[]
  instance: any
  listener: Listener
  instances?: Record<string, any>
  options?: Record<string, any>
}

export type ListenerFunctions = Record<
  string,
  ListenerFunction
>

export type ListenerFunction = (
  id: string[],
  ...arg: any[]
) => any

export type ListenerInstances = Record<string, any>
