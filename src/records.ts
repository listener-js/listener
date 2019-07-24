import { EventId } from "./"

export type ListenerType = (id: EventId, ...arg: any[]) => any
export type ListenersType = Record<string, ListenerType[]>
export type ListenerBindingsType = Record<string, string[]>

export const listeners: ListenersType = {}
export const bindings: ListenerBindingsType = { "*": [] }
