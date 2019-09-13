> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](../modules/_index_.md) / [Listener](_index_.listener.md) /

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [bindings](_index_.listener.md#bindings)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listeners](_index_.listener.md#listeners)
* [options](_index_.listener.md#options)
* [originals](_index_.listener.md#originals)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [addListener](_index_.listener.md#private-addlistener)
* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [listSort](_index_.listener.md#private-listsort)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [log](_index_.listener.md#private-log)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [parseId](_index_.listener.md#parseid)
* [reset](_index_.listener.md#reset)
* [wrapListener](_index_.listener.md#private-wraplistener)

## Constructors

###  constructor

\+ **new Listener**(): *[Listener](_index_.listener.md)*

Defined in index.ts:23

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:15

___

###  idRegex

• **idRegex**: *`RegExp`* =  /(\*{1,2})|([^\.]+)\.(.+)|([^\.]+)/i

Defined in index.ts:21

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:16

___

###  listeners

• **listeners**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:17

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:18

___

###  originals

• **originals**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:19

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:180

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerBindings](../modules/_types_.md#listenerbindings) |
`list` | [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[] |
`key` | string |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` addListener

▸ **addListener**(`instanceId`: string, `instance`: any): *void*

Defined in index.ts:169

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

### `Private` buildList

▸ **buildList**(`fnId`: string, `id`: string[]): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:196

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:239

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

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]): *number*

Defined in index.ts:355

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

###  listen

▸ **listen**(`matchId`: string[], `targetIds`: string[], `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

Defined in index.ts:29

**Parameters:**

Name | Type |
------ | ------ |
`matchId` | string[] |
`targetIds` | string[] |
`options?` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *void*

___

###  listener

▸ **listener**(`instances`: `Record<string, any>`, `options?`: `Record<string, any>`): *`Promise<any>`*

Defined in index.ts:54

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *`Promise<any>`*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *`Function`*

Defined in index.ts:346

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *`Function`*

___

### `Private` log

▸ **log**(): *void*

Defined in index.ts:23

**Returns:** *void*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *number*

Defined in index.ts:366

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:105

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(): *void*

Defined in index.ts:119

**Returns:** *void*

___

### `Private` wrapListener

▸ **wrapListener**(`instanceId`: string, `instance`: any): *void*

Defined in index.ts:387

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*