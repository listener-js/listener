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
* [Listeners](_types_.md#listeners)

## Type aliases

###  ListenerBindingItem

Ƭ **ListenerBindingItem**: *[string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]*

*Defined in [types.ts:13](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L13)*

___

###  ListenerBindingOptions

Ƭ **ListenerBindingOptions**: *`Record<string, ListenerOptions>`*

*Defined in [types.ts:15](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L15)*

___

###  ListenerBindings

Ƭ **ListenerBindings**: *`Record<string, string[]>`*

*Defined in [types.ts:18](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L18)*

___

###  ListenerBindingsListSorter

Ƭ **ListenerBindingsListSorter**: *function*

*Defined in [types.ts:20](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L20)*

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

*Defined in [types.ts:8](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L8)*

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

*Defined in [types.ts:23](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L23)*

___

###  Listeners

Ƭ **Listeners**: *`Record<string, ListenerFunction>`*

*Defined in [types.ts:11](https://github.com/listener-js/listener/blob/34983e2/src/types.ts#L11)*