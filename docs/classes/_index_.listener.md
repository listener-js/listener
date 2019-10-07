[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [arrow](_index_.listener.md#arrow)
* [bindings](_index_.listener.md#bindings)
* [callbackBindings](_index_.listener.md#private-callbackbindings)
* [commentRegex](_index_.listener.md#commentregex)
* [fnRegex](_index_.listener.md#fnregex)
* [id](_index_.listener.md#id)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listenerFns](_index_.listener.md#private-listenerfns)
* [log](_index_.listener.md#private-log)
* [options](_index_.listener.md#options)
* [originalFns](_index_.listener.md#private-originalfns)

### Methods

* [applyCallbackBindings](_index_.listener.md#private-applycallbackbindings)
* [applyCallbacksBindings](_index_.listener.md#private-applycallbacksbindings)
* [applyInstanceFunctions](_index_.listener.md#private-applyinstancefunctions)
* [applyInstanceId](_index_.listener.md#private-applyinstanceid)
* [applyInstancesFunctions](_index_.listener.md#private-applyinstancesfunctions)
* [applyInstancesId](_index_.listener.md#private-applyinstancesid)
* [applyListenerBindings](_index_.listener.md#private-applylistenerbindings)
* [applyListenersBindings](_index_.listener.md#private-applylistenersbindings)
* [bind](_index_.listener.md#bind)
* [captureOutputs](_index_.listener.md#captureoutputs)
* [emit](_index_.listener.md#private-emit)
* [emitList](_index_.listener.md#private-emitlist)
* [extractListeners](_index_.listener.md#private-extractlisteners)
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

## Constructors

###  constructor

\+ **new Listener**(`id`: string): *[Listener](_index_.listener.md)*

Defined in index.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  arrow

• **arrow**: *string* = " < "

Defined in index.ts:17

___

###  bindings

• **bindings**: *[ListenerInternalBindings](../modules/_types_.md#listenerinternalbindings)*

Defined in index.ts:23

___

### `Private` callbackBindings

• **callbackBindings**: *Record‹string, [ListenerBindings](../modules/_types_.md#listenerbindings)›*

Defined in index.ts:27

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:19

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:20

___

###  id

• **id**: *string*

Defined in index.ts:16

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:21

___

###  instances

• **instances**: *[ListenerInternalInstances](../modules/_types_.md#listenerinternalinstances)*

Defined in index.ts:24

___

### `Private` listenerFns

• **listenerFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:32

___

### `Private` log

• **log**: *[LogEvent](../modules/_types_.md#logevent)*

Defined in index.ts:35

___

###  options

• **options**: *[ListenerInternalOptions](../modules/_types_.md#listenerinternaloptions)*

Defined in index.ts:25

___

### `Private` originalFns

• **originalFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:33

## Methods

### `Private` applyCallbackBindings

▸ **applyCallbackBindings**(`lid`: string[], `instanceId`: string, `instance`: any, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:325

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyCallbacksBindings

▸ **applyCallbacksBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void*

Defined in index.ts:308

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void*

___

### `Private` applyInstanceFunctions

▸ **applyInstanceFunctions**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in index.ts:218

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *void | Promise‹any›*

___

### `Private` applyInstanceId

▸ **applyInstanceId**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in index.ts:265

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *void | Promise‹any›*

___

### `Private` applyInstancesFunctions

▸ **applyInstancesFunctions**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:201

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyInstancesId

▸ **applyInstancesId**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:248

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyListenerBindings

▸ **applyListenerBindings**(`lid`: string[], `binding`: [ListenerBindings](../modules/_types_.md#listenerbindings), `instanceId?`: string, `instance?`: any, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:296

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`binding` | [ListenerBindings](../modules/_types_.md#listenerbindings) |
`instanceId?` | string |
`instance?` | any |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyListenersBindings

▸ **applyListenersBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void*

Defined in index.ts:273

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], `targetId`: string, `options?`: [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)): *void*

Defined in index.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`targetId` | string |
`options?` | [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md) |

**Returns:** *void*

___

###  captureOutputs

▸ **captureOutputs**(`_lid`: string[], `instances`: Record‹string, any›, `eventAssigns`: Record‹string, any›, `fn`: [ListenerCallback](../modules/_types_.md#listenercallback)): *[ListenerCaptureOutputs](../modules/_types_.md#listenercaptureoutputs)*

Defined in index.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`instances` | Record‹string, any› |
`eventAssigns` | Record‹string, any› |
`fn` | [ListenerCallback](../modules/_types_.md#listenercallback) |

**Returns:** *[ListenerCaptureOutputs](../modules/_types_.md#listenercaptureoutputs)*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:367

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

▸ **emitList**(`_lid`: string[], `fnId`: string, `id`: string[]): *[ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[]*

Defined in index.ts:489

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[]*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *string[]*

Defined in index.ts:550

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` listAdd

▸ **listAdd**(`lists`: [ListenerInternalBindings](../modules/_types_.md#listenerinternalbindings), `list`: [ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[], `key`: string): *void*

Defined in index.ts:651

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerInternalBindings](../modules/_types_.md#listenerinternalbindings) |
`list` | [ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[] |
`key` | string |

**Returns:** *void*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)], `__namedParameters`: [undefined, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]): *number*

Defined in index.ts:667

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)] |
`__namedParameters` | [undefined, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)] |

**Returns:** *number*

___

### `Private` listenerBindings

▸ **listenerBindings**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:610

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:634

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:641

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

### `Private` listenersBindings

▸ **listenersBindings**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Promise‹any› | void*

Defined in index.ts:570

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

Defined in index.ts:617

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

Defined in index.ts:100

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Record‹string, any› | Promise‹Record‹string, any››*

___

### `Private` logLoaded

▸ **logLoaded**(`lid`: string[], `__namedParameters`: object): *void*

Defined in index.ts:677

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *void*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)): *number*

Defined in index.ts:684

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:108

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:122

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
