[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [arrow](_index_.listener.md#arrow)
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

* [applyBinding](_index_.listener.md#private-applybinding)
* [applyBindings](_index_.listener.md#private-applybindings)
* [applyCallbackBindings](_index_.listener.md#private-applycallbackbindings)
* [applyCallbacksBindings](_index_.listener.md#private-applycallbacksbindings)
* [bind](_index_.listener.md#bind)
* [captureOutputs](_index_.listener.md#captureoutputs)
* [emit](_index_.listener.md#private-emit)
* [emitList](_index_.listener.md#private-emitlist)
* [extractListeners](_index_.listener.md#private-extractlisteners)
* [findLoadBindings](_index_.listener.md#private-findloadbindings)
* [listAdd](_index_.listener.md#private-listadd)
* [listSort](_index_.listener.md#private-listsort)
* [listenerBindings](_index_.listener.md#private-listenerbindings)
* [listenerLoaded](_index_.listener.md#private-listenerloaded)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [listenersBindings](_index_.listener.md#private-listenersbindings)
* [listenersLoaded](_index_.listener.md#private-listenersloaded)
* [load](_index_.listener.md#load)
* [logLoaded](_index_.listener.md#private-logloaded)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [parseId](_index_.listener.md#parseid)
* [reset](_index_.listener.md#reset)
* [wrapFunction](_index_.listener.md#private-wrapfunction)
* [wrapFunctions](_index_.listener.md#private-wrapfunctions)

## Constructors

###  constructor

\+ **new Listener**(): *[Listener](_index_.listener.md)*

Defined in index.ts:29

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  arrow

• **arrow**: *string* = " < "

Defined in index.ts:15

___

### `Private` bindOutputs

• **bindOutputs**: *Record‹string, [ListenerBind](../modules/_types_.md#listenerbind)›*

Defined in index.ts:25

___

###  bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

Defined in index.ts:21

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:17

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:18

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:19

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:22

___

### `Private` listenerFns

• **listenerFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:26

___

### `Private` log

• **log**: *[LogEvent](../modules/_types_.md#logevent)*

Defined in index.ts:29

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

Defined in index.ts:23

___

### `Private` originalFns

• **originalFns**: *[Listeners](../modules/_types_.md#listeners)*

Defined in index.ts:27

## Methods

### `Private` applyBinding

▸ **applyBinding**(`lid`: string[], `binding`: [ListenerBind](../modules/_types_.md#listenerbind), `instanceId?`: string, `instance?`: any, `listener?`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:218

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`binding` | [ListenerBind](../modules/_types_.md#listenerbind) |
`instanceId?` | string |
`instance?` | any |
`listener?` | [Listener](_index_.listener.md) |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyBindings

▸ **applyBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void*

Defined in index.ts:190

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void*

___

### `Private` applyCallbackBindings

▸ **applyCallbackBindings**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:253

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

### `Private` applyCallbacksBindings

▸ **applyCallbacksBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void*

Defined in index.ts:231

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], `targetId`: string, `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

Defined in index.ts:35

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

▸ **captureOutputs**(`_lid`: string[], `args`: any[], `instances`: Record‹string, any›, `fn`: [ListenerCallback](../modules/_types_.md#listenercallback)): *[ListenerOutputs](../modules/_types_.md#listeneroutputs)*

Defined in index.ts:55

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`args` | any[] |
`instances` | Record‹string, any› |
`fn` | [ListenerCallback](../modules/_types_.md#listenercallback) |

**Returns:** *[ListenerOutputs](../modules/_types_.md#listeneroutputs)*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:287

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

Defined in index.ts:400

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

Defined in index.ts:455

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` findLoadBindings

▸ **findLoadBindings**(`instances`: Record‹string, any›): *boolean*

Defined in index.ts:475

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *boolean*

___

### `Private` listAdd

▸ **listAdd**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *void*

Defined in index.ts:591

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerBindings](../modules/_types_.md#listenerbindings) |
`list` | [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[] |
`key` | string |

**Returns:** *void*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]): *number*

Defined in index.ts:607

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

### `Private` listenerBindings

▸ **listenerBindings**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:540

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

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `instanceId`: string, `instance`: any, `listener`: [Listener](_index_.listener.md), `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:571

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

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:581

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

### `Private` listenersBindings

▸ **listenersBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in index.ts:496

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Promise‹any› | void*

___

### `Private` listenersLoaded

▸ **listenersLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:550

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

###  load

▸ **load**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Record‹string, any› | Promise‹Record‹string, any››*

Defined in index.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Record‹string, any› | Promise‹Record‹string, any››*

___

### `Private` logLoaded

▸ **logLoaded**(`lid`: string[], `instanceId`: string, `instance`: any): *void*

Defined in index.ts:617

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

Defined in index.ts:625

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:109

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:123

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*

___

### `Private` wrapFunction

▸ **wrapFunction**(`lid`: string[], `instanceId`: string, `instance`: any): *void | Promise‹any›*

Defined in index.ts:667

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |

**Returns:** *void | Promise‹any›*

___

### `Private` wrapFunctions

▸ **wrapFunctions**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:646

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*
