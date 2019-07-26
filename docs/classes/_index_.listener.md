> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](../modules/_index_.md) / [Listener](_index_.listener.md) /

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Properties

* [listeners](_index_.listener.md#private-listeners)

### Methods

* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [reset](_index_.listener.md#reset)

### Object literals

* [bindings](_index_.listener.md#private-bindings)

## Properties

### `Private` listeners

• **listeners**: *[ListenersType](../modules/_index_.md#listenerstype)*

Defined in index.ts:10

## Methods

### `Private` buildList

▸ **buildList**(`lists`: [ListenersAnyType](../modules/_index_.md#listenersanytype), `initialList`: any[], `key`: string, `id`: string[]): *any[]*

Defined in index.ts:131

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenersAnyType](../modules/_index_.md#listenersanytype) |
`initialList` | any[] |
`key` | string |
`id` | string[] |

**Returns:** *any[]*

___

### `Private` emit

▸ **emit**(`key`: string, `id`: string[], ...`args`: any[]): *any*

Defined in index.ts:60

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`id` | string[] |
`...args` | any[] |

**Returns:** *any*

___

###  listen

▸ **listen**(`sourceId`: string[], `targetId`: string[]): *void*

Defined in index.ts:12

**Parameters:**

Name | Type |
------ | ------ |
`sourceId` | string[] |
`targetId` | string[] |

**Returns:** *void*

___

###  listener

▸ **listener**(`instances`: `Record<string, any>`, `options?`: `Record<string, any>`): *void*

Defined in index.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fn`: any, `instance`: any, `key`: string): *`Function`*

Defined in index.ts:97

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |
`instance` | any |
`key` | string |

**Returns:** *`Function`*

___

###  reset

▸ **reset**(): *void*

Defined in index.ts:124

**Returns:** *void*

## Object literals

### `Private` bindings

### ▪ **bindings**: *object*

Defined in index.ts:9

###  *

• *****: *undefined[]* =  []

Defined in index.ts:9