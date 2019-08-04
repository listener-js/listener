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
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [reset](_index_.listener.md#reset)

## Properties

###  bindings

• **bindings**: *[ListenerBindings](../modules/_index_.md#listenerbindings)*

Defined in index.ts:25

___

###  instances

• **instances**: *[ListenerInstances](../modules/_index_.md#listenerinstances)*

Defined in index.ts:26

___

###  listeners

• **listeners**: *[Listeners](../modules/_index_.md#listeners)*

Defined in index.ts:27

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_index_.md#listenerbindingoptions)*

Defined in index.ts:29

___

###  originals

• **originals**: *[Listeners](../modules/_index_.md#listeners)*

Defined in index.ts:28

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

▸ **buildList**(`fnId`: string, `id`: string[]): *[ListenerBindingItem](../modules/_index_.md#listenerbindingitem)[]*

Defined in index.ts:129

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_index_.md#listenerbindingitem)[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:176

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_index_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_index_.listeneroptions.md)]): *number*

Defined in index.ts:248

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_index_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_index_.listeneroptions.md)] |

**Returns:** *number*

___

###  listen

▸ **listen**(`sourceId`: string[], `targetId`: string[], `options?`: [ListenerOptions](../interfaces/_index_.listeneroptions.md)): *void*

Defined in index.ts:31

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

Defined in index.ts:50

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *`Function`*

Defined in index.ts:239

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *`Function`*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_index_.listeneroptions.md)): *number*

Defined in index.ts:259

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_index_.listeneroptions.md) |

**Returns:** *number*

___

###  reset

▸ **reset**(): *void*

Defined in index.ts:90

**Returns:** *void*