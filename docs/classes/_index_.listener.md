> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](../modules/_index_.md) / [Listener](_index_.listener.md) /

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Properties

* [bindings](_index_.listener.md#bindings)
* [instances](_index_.listener.md#instances)
* [listeners](_index_.listener.md#listeners)
* [options](_index_.listener.md#options)
* [originals](_index_.listener.md#originals)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [listSort](_index_.listener.md#private-listsort)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [reset](_index_.listener.md#reset)

## Properties

###  bindings

• **bindings**: *[ListenerBindings](../modules/_index_.md#listenerbindings)*

Defined in index.ts:24

___

###  instances

• **instances**: *[ListenerInstances](../modules/_index_.md#listenerinstances)*

Defined in index.ts:25

___

###  listeners

• **listeners**: *[Listeners](../modules/_index_.md#listeners)*

Defined in index.ts:26

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_index_.md#listenerbindingoptions)*

Defined in index.ts:28

___

###  originals

• **originals**: *[Listeners](../modules/_index_.md#listeners)*

Defined in index.ts:27

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_index_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_index_.md#listenerbindingitem)[], `key`: string): *void*

Defined in index.ts:114

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerBindings](../modules/_index_.md#listenerbindings) |
`list` | [ListenerBindingItem](../modules/_index_.md#listenerbindingitem)[] |
`key` | string |

**Returns:** *void*

___

### `Private` buildList

▸ **buildList**(`id`: string[]): *[ListenerBindingItem](../modules/_index_.md#listenerbindingitem)[]*

Defined in index.ts:129

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_index_.md#listenerbindingitem)[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `ogOut`: any, ...`args`: any[]): *any*

Defined in index.ts:173

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |
`ogOut` | any |
`...args` | any[] |

**Returns:** *any*

___

### `Private` listSort

▸ **listSort**(`prepend`: boolean): *[ListenerBindingsListSorter](../modules/_index_.md#listenerbindingslistsorter)*

Defined in index.ts:239

**Parameters:**

Name | Type |
------ | ------ |
`prepend` | boolean |

**Returns:** *[ListenerBindingsListSorter](../modules/_index_.md#listenerbindingslistsorter)*

___

###  listen

▸ **listen**(`sourceId`: string[], `targetId`: string[], `options?`: [ListenerOptions](../interfaces/_index_.listeneroptions.md)): *void*

Defined in index.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`sourceId` | string[] |
`targetId` | string[] |
`options?` | [ListenerOptions](../interfaces/_index_.listeneroptions.md) |

**Returns:** *void*

___

###  listener

▸ **listener**(`instances`: `Record<string, any>`, `options?`: `Record<string, any>`): *void*

Defined in index.ts:49

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fn`: any, `instance`: any, `fnId`: string): *`Function`*

Defined in index.ts:229

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |
`instance` | any |
`fnId` | string |

**Returns:** *`Function`*

___

###  reset

▸ **reset**(): *void*

Defined in index.ts:90

**Returns:** *void*