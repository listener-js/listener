[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [bindOutputs](_index_.listener.md#private-bindoutputs)
* [bindings](_index_.listener.md#bindings)
* [commentRegex](_index_.listener.md#commentregex)
* [fnRegex](_index_.listener.md#fnregex)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listenerFns](_index_.listener.md#private-listenerfns)
* [log](_index_.listener.md#private-log)
* [options](_index_.listener.md#options)
* [originalFns](_index_.listener.md#private-originalfns)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [bind](_index_.listener.md#bind)
* [captureOutputs](_index_.listener.md#captureoutputs)
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
* [logLoaded](_index_.listener.md#private-logloaded)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [parseId](_index_.listener.md#parseid)
* [readBindings](_index_.listener.md#private-readbindings)
* [reset](_index_.listener.md#reset)

## Constructors

###  constructor

\+ **new Listener**(): *[Listener](_index_.listener.md)*

Defined in index.ts:27

**Returns:** *[Listener](_index_.listener.md)*

## Properties

### `Private` bindOutputs

• **bindOutputs**: *Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›*

Defined in index.ts:23

___

###  bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:19

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:15

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:16

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:17

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:20

___

### `Private` listenerFns

• **listenerFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:24

___

### `Private` log

• **log**: *[LogEvent](../modules/_types_.md#logevent)*

Defined in index.ts:27

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:21

___

### `Private` originalFns

• **originalFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:25

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

Defined in index.ts:199

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

Defined in index.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`targetId` | string |
`options?` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *void*

___

###  captureOutputs

▸ **captureOutputs**(`_lid`: string[], `args`: any[], `instances`: Record‹string, any›, `fn`: string | [ListenerCallback](../modules/_types_.md#listenercallback)): *[ListenerOutputs](../modules/_types_.md#listeneroutputs)*

Defined in index.ts:85

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`args` | any[] |
`instances` | Record‹string, any› |
`fn` | string &#124; [ListenerCallback](../modules/_types_.md#listenercallback) |

**Returns:** *[ListenerOutputs](../modules/_types_.md#listeneroutputs)*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:216

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

Defined in index.ts:322

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

Defined in index.ts:377

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` findLoadBindings

▸ **findLoadBindings**(`instances`: Record‹string, any›): *boolean*

Defined in index.ts:397

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *boolean*

___

### `Private` instanceLoaded

▸ **instanceLoaded**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:440

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

Defined in index.ts:419

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

Defined in index.ts:593

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:603

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

###  load

▸ **load**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Record‹string, any› | Promise‹Record‹string, any››*

Defined in index.ts:53

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

Defined in index.ts:529

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

▸ **loadBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void*

Defined in index.ts:502

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void*

___

### `Private` loadInstance

▸ **loadInstance**(`lid`: string[], `instanceId`: string, `instance`: any): *void | Promise‹any›*

Defined in index.ts:562

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void | Promise‹any›*

___

### `Private` loadInstances

▸ **loadInstances**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›[]*

Defined in index.ts:541

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›[]*

___

### `Private` logLoaded

▸ **logLoaded**(`lid`: string[], `instanceId`: string, `instance`: any): *void*

Defined in index.ts:450

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

Defined in index.ts:613

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

### `Private` readBindings

▸ **readBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Promise‹any›[] | void*

Defined in index.ts:458

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any›[] | void*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:127

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
