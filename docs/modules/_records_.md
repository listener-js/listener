> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["records"](_records_.md) /

# External module: "records"

## Index

### Type aliases

* [ListenerBindingsType](_records_.md#listenerbindingstype)
* [ListenerType](_records_.md#listenertype)
* [ListenersType](_records_.md#listenerstype)

### Variables

* [listeners](_records_.md#const-listeners)

### Object literals

* [bindings](_records_.md#const-bindings)

## Type aliases

###  ListenerBindingsType

Ƭ **ListenerBindingsType**: *`Record<string, string[]>`*

Defined in records.ts:5

___

###  ListenerType

Ƭ **ListenerType**: *function*

Defined in records.ts:3

#### Type declaration:

▸ (`id`: [EventId](_index_.md#eventid), ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | [EventId](_index_.md#eventid) |
`...arg` | any[] |

___

###  ListenersType

Ƭ **ListenersType**: *`Record<string, ListenerType[]>`*

Defined in records.ts:4

## Variables

### `Const` listeners

• **listeners**: *[ListenersType](_records_.md#listenerstype)*

Defined in records.ts:7

## Object literals

### `Const` bindings

### ▪ **bindings**: *object*

Defined in records.ts:8

###  *

• *****: *undefined[]* =  []

Defined in records.ts:8