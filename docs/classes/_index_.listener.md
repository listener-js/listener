[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [bindings](_index_.listener.md#private-bindings)
* [commentRegex](_index_.listener.md#commentregex)
* [fnRegex](_index_.listener.md#fnregex)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listenerFns](_index_.listener.md#private-listenerfns)
* [options](_index_.listener.md#options)
* [originalFns](_index_.listener.md#private-originalfns)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [bind](_index_.listener.md#bind)
* [emit](_index_.listener.md#private-emit)
* [emitList](_index_.listener.md#private-emitlist)
* [extractListeners](_index_.listener.md#private-extractlisteners)
* [findLoadBindings](_index_.listener.md#private-findloadbindings)
* [instanceLoaded](_index_.listener.md#private-instanceloaded)
* [instancesLoaded](_index_.listener.md#private-instancesloaded)
* [listSort](_index_.listener.md#private-listsort)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [load](_index_.listener.md#load)
* [loadBinding](_index_.listener.md#private-loadbinding)
* [loadBindings](_index_.listener.md#private-loadbindings)
* [loadInstance](_index_.listener.md#private-loadinstance)
* [loadInstances](_index_.listener.md#private-loadinstances)
* [log](_index_.listener.md#private-log)
* [logLoaded](_index_.listener.md#private-logloaded)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [parseId](_index_.listener.md#parseid)
* [readBindings](_index_.listener.md#private-readbindings)
* [reset](_index_.listener.md#reset)
* [separatePromises](_index_.listener.md#separatepromises)

## Constructors

###  constructor

\+ **new Listener**(): *[Listener](_index_.listener.md)*

Defined in index.ts:22

**Returns:** *[Listener](_index_.listener.md)*

## Properties

### `Private` bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:19

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:13

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:14

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:15

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:16

___

### `Private` listenerFns

• **listenerFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:20

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:17

___

### `Private` originalFns

• **originalFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:22

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:231

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerBindings](../modules/_types_.md#listenerbindings) |
`list` | [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[] |
`key` | string |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], `targetId`: string, `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

Defined in index.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`targetId` | string |
`options?` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *void*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:248

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`id` | string[] |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

### `Private` emitList

▸ **emitList**(`_lid`: string[], `fnId`: string, `id`: string[]): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:354

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *string[]*

Defined in index.ts:409

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` findLoadBindings

▸ **findLoadBindings**(`bindings`: Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›): *Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›*

Defined in index.ts:429

**Parameters:**

Name | Type |
------ | ------ |
`bindings` | Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)› |

**Returns:** *Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›*

___

### `Private` instanceLoaded

▸ **instanceLoaded**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:470

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`listener` | [Listener](_index_.listener.md) |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` instancesLoaded

▸ **instancesLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›[]*

Defined in index.ts:453

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›[]*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]): *number*

Defined in index.ts:617

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:607

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

###  load

▸ **load**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Record‹string, any› | Promise‹Record‹string, any››*

Defined in index.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Record‹string, any› | Promise‹Record‹string, any››*

___

### `Private` loadBinding

▸ **loadBinding**(`lid`: string[], `binding`: [ListenerBind](../modules/_types_.md#listenerbind), `instanceId`: string, `instance`: any, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:548

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`binding` | [ListenerBind](../modules/_types_.md#listenerbind) |
`instanceId` | string |
`instance` | any |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` loadBindings

▸ **loadBindings**(`lid`: string[], `bindings`: Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void*

Defined in index.ts:520

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`bindings` | Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)› |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void*

___

### `Private` loadInstance

▸ **loadInstance**(`lid`: string[], `instanceId`: string, `instance`: any): *void | Promise‹any›*

Defined in index.ts:576

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void | Promise‹any›*

___

### `Private` loadInstances

▸ **loadInstances**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›[]*

Defined in index.ts:560

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›[]*

___

### `Private` log

▸ **log**(): *void*

Defined in index.ts:21

**Returns:** *void*

___

### `Private` logLoaded

▸ **logLoaded**(`lid`: string[], `instanceId`: string, `instance`: any): *void*

Defined in index.ts:480

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *number*

Defined in index.ts:627

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:120

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

### `Private` readBindings

▸ **readBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *[Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›, Promise‹any›[]]*

Defined in index.ts:488

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *[Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›, Promise‹any›[]]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:188

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*

___

###  separatePromises

▸ **separatePromises**(`_lid`: string[], `args`: any[], `instances`: Record‹string, any›, `fn`: string | function): *[Promise‹any›[], any[], Record‹string, Promise‹any››, Record‹string, any›]*

Defined in index.ts:134

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`args` | any[] |
`instances` | Record‹string, any› |
`fn` | string &#124; function |

**Returns:** *[Promise‹any›[], any[], Record‹string, Promise‹any››, Record‹string, any›]*
