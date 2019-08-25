> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](../modules/_index_.md) / [Listener](_index_.listener.md) /

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Properties

* [bindings](_index_.listener.md#bindings)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listeners](_index_.listener.md#listeners)
* [options](_index_.listener.md#options)
* [originals](_index_.listener.md#originals)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [joinInstance](_index_.listener.md#private-joininstance)
* [listSort](_index_.listener.md#private-listsort)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [log](_index_.listener.md#private-log)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [reset](_index_.listener.md#reset)
* [validate](_index_.listener.md#private-validate)
* [wrapListener](_index_.listener.md#private-wraplistener)

## Properties

###  bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:12

___

###  idRegex

• **idRegex**: *`RegExp`* =  /(\*{1,2})|([^\.]+)\.(.+)|([^\.]+)/i

Defined in index.ts:18

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:13

___

###  listeners

• **listeners**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:14

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:15

___

###  originals

• **originals**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:16

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:113

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerBindings](../modules/_types_.md#listenerbindings) |
`list` | [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[] |
`key` | string |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` buildList

▸ **buildList**(`fnId`: string, `id`: string[]): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:129

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:172

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

### `Private` joinInstance

▸ **joinInstance**(`instances`: `Record<string, any>`, `instanceId`: string): *void*

Defined in index.ts:271

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`instanceId` | string |

**Returns:** *void*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]): *number*

Defined in index.ts:345

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

###  listen

▸ **listen**(`matchId`: string[], `targetIds`: string[], `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

Defined in index.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`matchId` | string[] |
`targetIds` | string[] |
`options?` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *void*

___

###  listener

▸ **listener**(`instances`: `Record<string, any>`, `options?`: `Record<string, any>`): *void*

Defined in index.ts:47

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *`Function`*

Defined in index.ts:377

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *`Function`*

___

### `Private` log

▸ **log**(): *void*

Defined in index.ts:20

**Returns:** *void*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *number*

Defined in index.ts:356

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  reset

▸ **reset**(): *void*

Defined in index.ts:80

**Returns:** *void*

___

### `Private` validate

▸ **validate**(`instances`: `Record<string, any>`): *string[]*

Defined in index.ts:386

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |

**Returns:** *string[]*

___

### `Private` wrapListener

▸ **wrapListener**(`instances`: `Record<string, any>`, `instanceId`: string): *void*

Defined in index.ts:426

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`instanceId` | string |

**Returns:** *void*