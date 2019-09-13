> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["joiner"](../modules/_joiner_.md) / [Joiner](_joiner_.joiner.md) /

# Class: Joiner

## Hierarchy

* **Joiner**

## Index

### Properties

* [listeners](_joiner_.joiner.md#listeners)
* [loadedIds](_joiner_.joiner.md#loadedids)
* [loadedResolvers](_joiner_.joiner.md#loadedresolvers)

### Methods

* [join](_joiner_.joiner.md#join)
* [loaded](_joiner_.joiner.md#loaded)
* [preJoin](_joiner_.joiner.md#prejoin)

## Properties

###  listeners

• **listeners**: *string[]* =  ["join", "loaded", "preJoin"]

Defined in joiner.ts:4

___

###  loadedIds

• **loadedIds**: *`Set<string>`* =  new Set()

Defined in joiner.ts:5

___

###  loadedResolvers

• **loadedResolvers**: *`Record<string, Function>`*

Defined in joiner.ts:6

## Methods

###  join

▸ **join**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: `Record<string, any>`): *`Promise<any>`*

Defined in joiner.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | [Listener](_index_.listener.md) |
`options?` | `Record<string, any>` |

**Returns:** *`Promise<any>`*

___

###  loaded

▸ **loaded**(`id`: string[], `instanceId`: string): *void*

Defined in joiner.ts:97

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |

**Returns:** *void*

___

###  preJoin

▸ **preJoin**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md)): *boolean*

Defined in joiner.ts:62

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | [Listener](_index_.listener.md) |

**Returns:** *boolean*