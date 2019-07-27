> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](../modules/_index_.md) / [Listener](_index_.listener.md) /

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Properties

* [bindings](_index_.listener.md#private-bindings)
* [listeners](_index_.listener.md#private-listeners)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [reset](_index_.listener.md#reset)

## Properties

### `Private` bindings

• **bindings**: *[ListenerBindingsType](../modules/_index_.md#listenerbindingstype)*

Defined in index.ts:9

___

### `Private` listeners

• **listeners**: *[ListenersType](../modules/_index_.md#listenerstype)*

Defined in index.ts:10

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenersAnyType](../modules/_index_.md#listenersanytype), `list`: string[], `key`: string): *string[]*

Defined in index.ts:164

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenersAnyType](../modules/_index_.md#listenersanytype) |
`list` | string[] |
`key` | string |

**Returns:** *string[]*

___

### `Private` buildList

▸ **buildList**(`fnId`: string, `id`: string[]): *any[]*

Defined in index.ts:129

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *any[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], ...`args`: any[]): *any*

Defined in index.ts:60

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

▸ **listenerWrapper**(`fn`: any, `instance`: any, `fnId`: string): *`Function`*

Defined in index.ts:97

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

Defined in index.ts:122

**Returns:** *void*