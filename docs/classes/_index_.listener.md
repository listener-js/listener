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
* [pending](_index_.listener.md#pending)
* [pendingResolvers](_index_.listener.md#pendingresolvers)

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
* [onLoad](_index_.listener.md#private-onload)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [processInstance](_index_.listener.md#private-processinstance)
* [reset](_index_.listener.md#reset)
* [validate](_index_.listener.md#private-validate)
* [wrapListener](_index_.listener.md#private-wraplistener)

## Properties

###  bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:14

___

###  idRegex

• **idRegex**: *`RegExp`* =  /(\*{1,2})|([^\.]+)\.(.+)|([^\.]+)/i

Defined in index.ts:22

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:15

___

###  listeners

• **listeners**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:16

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:17

___

###  originals

• **originals**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:18

___

###  pending

• **pending**: *[ListenerPending](../modules/_types_.md#listenerpending)*

Defined in index.ts:19

___

###  pendingResolvers

• **pendingResolvers**: *[ListenerPendingResolvers](../modules/_types_.md#listenerpendingresolvers)*

Defined in index.ts:20

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:145

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

Defined in index.ts:161

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:204

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

▸ **joinInstance**(`instanceId`: string, `instance`: any): *`Promise<any>`[]*

Defined in index.ts:311

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *`Promise<any>`[]*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]): *number*

Defined in index.ts:413

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

###  listen

▸ **listen**(`matchId`: string[], `targetIds`: string[], `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

Defined in index.ts:26

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

Defined in index.ts:51

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *`Promise<any>`*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *`Function`*

Defined in index.ts:467

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *`Function`*

___

### `Private` log

▸ **log**(): *void*

Defined in index.ts:24

**Returns:** *void*

___

### `Private` onLoad

▸ **onLoad**(`instanceId`: string, `promise?`: `Promise<any>`): *`Promise<any>`*

Defined in index.ts:394

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`promise?` | `Promise<any>` |

**Returns:** *`Promise<any>`*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *number*

Defined in index.ts:424

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

### `Private` processInstance

▸ **processInstance**(`instanceId`: string, `instance`: any, `options?`: `Record<string, any>`): *`Promise<any>`*

Defined in index.ts:445

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |
`options?` | `Record<string, any>` |

**Returns:** *`Promise<any>`*

___

###  reset

▸ **reset**(): *void*

Defined in index.ts:106

**Returns:** *void*

___

### `Private` validate

▸ **validate**(`instances`: `Record<string, any>`): *string[]*

Defined in index.ts:476

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |

**Returns:** *string[]*

___

### `Private` wrapListener

▸ **wrapListener**(`instanceId`: string, `instance`: any): *void*

Defined in index.ts:520

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*