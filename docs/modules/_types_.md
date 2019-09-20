[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

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
* [ListenerPendingResolvers](_types_.md#listenerpendingresolvers)
* [Listeners](_types_.md#listeners)
* [LogEvent](_types_.md#logevent)

## Type aliases

###  ListenerBindingItem

Ƭ **ListenerBindingItem**: *[string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]*

Defined in types.ts:17

___

###  ListenerBindingOptions

Ƭ **ListenerBindingOptions**: *Record‹string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)›*

Defined in types.ts:19

___

###  ListenerBindings

Ƭ **ListenerBindings**: *Record‹string, string[]›*

Defined in types.ts:24

___

###  ListenerBindingsListSorter

Ƭ **ListenerBindingsListSorter**: *function*

Defined in types.ts:26

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

Ƭ **ListenerInstances**: *Record‹string, any›*

Defined in types.ts:31

___

###  ListenerPending

Ƭ **ListenerPending**: *Record‹string, Promise‹any››*

Defined in types.ts:33

___

###  ListenerPendingResolvers

Ƭ **ListenerPendingResolvers**: *Record‹string, Function›*

Defined in types.ts:35

___

###  Listeners

Ƭ **Listeners**: *Record‹string, [ListenerFunction](_types_.md#listenerfunction)›*

Defined in types.ts:15

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:40

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |
