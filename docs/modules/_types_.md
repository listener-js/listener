> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["types"](_types_.md) /

# External module: "types"

## Index

### Interfaces

* [ListenerOptions](../interfaces/_types_.listeneroptions.md)

### Type aliases

* [ListenerBindingItem](_types_.md#listenerbindingitem)
* [ListenerBindingOptions](_types_.md#listenerbindingoptions)
* [ListenerBindings](_types_.md#listenerbindings)
* [ListenerBindingsListSorter](_types_.md#listenerbindingslistsorter)
* [ListenerFunction](_types_.md#listenerfunction)
* [ListenerInstances](_types_.md#listenerinstances)
* [ListenerPending](_types_.md#listenerpending)
* [Listeners](_types_.md#listeners)
* [LogEvent](_types_.md#logevent)

## Type aliases

###  ListenerBindingItem

Ƭ **ListenerBindingItem**: *[string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]*

Defined in types.ts:15

___

###  ListenerBindingOptions

Ƭ **ListenerBindingOptions**: *`Record<string, ListenerOptions>`*

Defined in types.ts:17

___

###  ListenerBindings

Ƭ **ListenerBindings**: *`Record<string, string[]>`*

Defined in types.ts:20

___

###  ListenerBindingsListSorter

Ƭ **ListenerBindingsListSorter**: *function*

Defined in types.ts:22

#### Type declaration:

▸ (`a`: [ListenerBindingItem](_types_.md#listenerbindingitem), `b`: [ListenerBindingItem](_types_.md#listenerbindingitem)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [ListenerBindingItem](_types_.md#listenerbindingitem) |
`b` | [ListenerBindingItem](_types_.md#listenerbindingitem) |

___

###  ListenerFunction

Ƭ **ListenerFunction**: *function*

Defined in types.ts:10

#### Type declaration:

▸ (`id`: string[], ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...arg` | any[] |

___

###  ListenerInstances

Ƭ **ListenerInstances**: *`Record<string, any>`*

Defined in types.ts:25

___

###  ListenerPending

Ƭ **ListenerPending**: *`Record<string, Promise<any>>`*

Defined in types.ts:27

___

###  Listeners

Ƭ **Listeners**: *`Record<string, ListenerFunction>`*

Defined in types.ts:13

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:29

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |