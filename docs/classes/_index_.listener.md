[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener


## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [bindings](_index_.listener.md#private-bindings)
* [callbacks](_index_.listener.md#callbacks)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listenerFns](_index_.listener.md#private-listenerfns)
* [listeners](_index_.listener.md#listeners)
* [options](_index_.listener.md#options)
* [originalFns](_index_.listener.md#private-originalfns)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [buildList](_index_.listener.md#private-buildlist)
* [callbackListenOptions](_index_.listener.md#private-callbacklistenoptions)
* [emit](_index_.listener.md#private-emit)
* [listSort](_index_.listener.md#private-listsort)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerInit](_index_.listener.md#private-listenerinit)
* [listenerLoad](_index_.listener.md#private-listenerload)
* [listenerReset](_index_.listener.md#private-listenerreset)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [log](_index_.listener.md#private-log)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [parseId](_index_.listener.md#parseid)
* [reset](_index_.listener.md#reset)
* [wrapListener](_index_.listener.md#private-wraplistener)

## Constructors

###  constructor

\+ **new Listener**(): *[Listener](_index_.listener.md)*

Defined in index.ts:32

**Returns:** *[Listener](_index_.listener.md)*

## Properties

### `Private` bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:29

___

###  callbacks

• **callbacks**: *string[]* =  [
    "listenerInit",
    "listenerLoad",
    "listenerReset",
  ]

Defined in index.ts:12

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)|([^\.]+)/i

Defined in index.ts:25

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:26

___

### `Private` listenerFns

• **listenerFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:30

___

###  listeners

• **listeners**: *string[]* =  [
    "listen",
    "listener",
    "reset",
    ...this.callbacks,
  ]

Defined in index.ts:18

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:27

___

### `Private` originalFns

• **originalFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:32

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:177

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

Defined in index.ts:194

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` callbackListenOptions

▸ **callbackListenOptions**(`listenerId`: string, `options?`: Record‹string, any›): *Record‹string, any›*

Defined in index.ts:240

**Parameters:**

Name | Type |
------ | ------ |
`listenerId` | string |
`options?` | Record‹string, any› |

**Returns:** *Record‹string, any›*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:260

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

Defined in index.ts:421

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

###  listen

▸ **listen**(`id`: string[], `matchId`: string[], `targetId`: string, `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

Defined in index.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`matchId` | string[] |
`targetId` | string |
`options?` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *void*

___

###  listener

▸ **listener**(`id`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Promise‹any›*

Defined in index.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›*

___

### `Private` listenerInit

▸ **listenerInit**(`id`: string[], `instanceId`: string, `instance`: any, `instances`: Record‹string, any›, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:373

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`instances` | Record‹string, any› |
`listener` | [Listener](_index_.listener.md) |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoad

▸ **listenerLoad**(`id`: string[], `instanceId`: string, `instance`: any, `instances`: Record‹string, any›, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:386

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`instances` | Record‹string, any› |
`listener` | [Listener](_index_.listener.md) |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerReset

▸ **listenerReset**(`id`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void*

Defined in index.ts:399

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | [Listener](_index_.listener.md) |
`options?` | Record‹string, any› |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:411

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

### `Private` log

▸ **log**(): *void*

Defined in index.ts:31

**Returns:** *void*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *number*

Defined in index.ts:431

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:121

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`id`: string[]): *void*

Defined in index.ts:135

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |

**Returns:** *void*

___

### `Private` wrapListener

▸ **wrapListener**(`instanceId`: string, `instance`: any): *void*

Defined in index.ts:452

**Parameters:**

Name | Type |
------ | ------ |
`instanceId` | string |
`instance` | any |

**Returns:** *void*