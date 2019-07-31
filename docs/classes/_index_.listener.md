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

### Methods

* [addList](_index_.listener.md#private-addlist)
* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [reset](_index_.listener.md#reset)

## Properties

###  bindings

• **bindings**: *[ListenerBindingsType](../modules/_index_.md#listenerbindingstype)*

Defined in index.ts:10

___

###  instances

• **instances**: *[ListenerInstancesType](../modules/_index_.md#listenerinstancestype)*

Defined in index.ts:11

___

###  listeners

• **listeners**: *[ListenersType](../modules/_index_.md#listenerstype)*

Defined in index.ts:12

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenersAnyType](../modules/_index_.md#listenersanytype), `list`: `Set<string>`, `key`: string): *void*

Defined in index.ts:114

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenersAnyType](../modules/_index_.md#listenersanytype) |
`list` | `Set<string>` |
`key` | string |

**Returns:** *void*

___

### `Private` buildList

▸ **buildList**(`id`: string[]): *`Set<string>`*

Defined in index.ts:124

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *`Set<string>`*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], ...`args`: any[]): *any*

Defined in index.ts:76

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |
`...args` | any[] |

**Returns:** *any*

___

###  listen

▸ **listen**(`sourceId`: string[], `targetId`: string[]): *void*

Defined in index.ts:14

**Parameters:**

Name | Type |
------ | ------ |
`sourceId` | string[] |
`targetId` | string[] |

**Returns:** *void*

___

###  listener

▸ **listener**(`instances`: `Record<string, any>`, `options?`: `Record<string, any>`): *void*

Defined in index.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fn`: any, `instance`: any, `fnId`: string): *`Function`*

Defined in index.ts:165

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

Defined in index.ts:64

**Returns:** *void*