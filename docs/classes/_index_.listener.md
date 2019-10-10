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
* [bind](_index_.listener.md#bind)
* [captureOutputs](_index_.listener.md#captureoutputs)
* [diffInstances](_index_.listener.md#private-diffinstances)
* [emit](_index_.listener.md#private-emit)
* [emitFunction](_index_.listener.md#emitfunction)
* [emitItem](_index_.listener.md#private-emititem)
* [emitItemOutput](_index_.listener.md#private-emititemoutput)
* [emitList](_index_.listener.md#private-emitlist)
* [emitOptions](_index_.listener.md#private-emitoptions)
* [extractListeners](_index_.listener.md#private-extractlisteners)
* [listAdd](_index_.listener.md#private-listadd)
* [listSort](_index_.listener.md#private-listsort)
* [listenerBeforeLoaded](_index_.listener.md#private-listenerbeforeloaded)
* [listenerLoaded](_index_.listener.md#private-listenerloaded)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [listenersBeforeLoaded](_index_.listener.md#private-listenersbeforeloaded)
* [listenersLoaded](_index_.listener.md#private-listenersloaded)
* [load](_index_.listener.md#load)
* [logLoaded](_index_.listener.md#private-logloaded)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [parseId](_index_.listener.md#parseid)
* [reset](_index_.listener.md#reset)

## Constructors

###  constructor

\+ **new Listener**(`id`: string): *[Listener](_index_.listener.md)*

Defined in index.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  arrow

• **arrow**: *string* = " < "

Defined in index.ts:21

___

###  bindings

• **bindings**: *[ListenerInternalBindings](../modules/_types_.md#listenerinternalbindings)*

Defined in index.ts:27

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:23

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:24

___

###  id

• **id**: *string*

Defined in index.ts:20

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:25

___

###  instances

• **instances**: *[ListenerInternalInstances](../modules/_types_.md#listenerinternalinstances)*

Defined in index.ts:28

___

### `Private` listenerFns

• **listenerFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:31

___

### `Private` log

• **log**: *[LogEvent](../modules/_types_.md#logevent)*

Defined in index.ts:34

___

###  options

• **options**: *[ListenerInternalOptions](../modules/_types_.md#listenerinternaloptions)*

Defined in index.ts:29

___

### `Private` originalFns

• **originalFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:32

## Methods

### `Private` applyCallbackBindings

▸ **applyCallbackBindings**(`lid`: string[], `instanceId`: string, `instance`: any, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:282

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

Defined in index.ts:265

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

Defined in index.ts:210

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

Defined in index.ts:257

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

Defined in index.ts:193

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

Defined in index.ts:240

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], ...`targets`: [ListenerBindTargets](../modules/_types_.md#listenerbindtargets)): *void*

Defined in index.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`...targets` | [ListenerBindTargets](../modules/_types_.md#listenerbindtargets) |

**Returns:** *void*

___

###  captureOutputs

▸ **captureOutputs**(`_lid`: string[], `instances`: Record‹string, any›, `eventAssigns`: Record‹string, any›, `fn`: [ListenerCallback](../modules/_types_.md#listenercallback)): *[ListenerCaptureOutputs](../modules/_types_.md#listenercaptureoutputs)*

Defined in index.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`instances` | Record‹string, any› |
`eventAssigns` | Record‹string, any› |
`fn` | [ListenerCallback](../modules/_types_.md#listenercallback) |

**Returns:** *[ListenerCaptureOutputs](../modules/_types_.md#listenercaptureoutputs)*

___

### `Private` diffInstances

▸ **diffInstances**(`instances`: Record‹string, any›): *string[]*

Defined in index.ts:336

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *string[]*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:347

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

###  emitFunction

▸ **emitFunction**(`args`: any[], `id`: string[], `fn`: [ListenerInternalFunction](../modules/_types_.md#listenerinternalfunction), `opts`: [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md), `out`: any): *[ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)*

Defined in index.ts:463

**Parameters:**

Name | Type |
------ | ------ |
`args` | any[] |
`id` | string[] |
`fn` | [ListenerInternalFunction](../modules/_types_.md#listenerinternalfunction) |
`opts` | [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md) |
`out` | any |

**Returns:** *[ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)*

___

### `Private` emitItem

▸ **emitItem**(`args`: any[], `id`: string[], `fn`: [ListenerInternalFunction](../modules/_types_.md#listenerinternalfunction), `opts`: [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md), `out`: any, `promise`: Promise‹any›, `setter`: [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md)): *any*

Defined in index.ts:424

**Parameters:**

Name | Type |
------ | ------ |
`args` | any[] |
`id` | string[] |
`fn` | [ListenerInternalFunction](../modules/_types_.md#listenerinternalfunction) |
`opts` | [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md) |
`out` | any |
`promise` | Promise‹any› |
`setter` | [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md) |

**Returns:** *any*

___

### `Private` emitItemOutput

▸ **emitItemOutput**(`promise`: Promise‹any›, `opts`: [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md), `out`: any, `setter`: [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md)): *any*

Defined in index.ts:447

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹any› |
`opts` | [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md) |
`out` | any |
`setter` | [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md) |

**Returns:** *any*

___

### `Private` emitList

▸ **emitList**(`_lid`: string[], `fnId`: string, `id`: string[]): *[ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[]*

Defined in index.ts:494

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[]*

___

### `Private` emitOptions

▸ **emitOptions**(`options`: [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)): *[ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)*

Defined in index.ts:555

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md) |

**Returns:** *[ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *string[]*

Defined in index.ts:570

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` listAdd

▸ **listAdd**(`lists`: [ListenerInternalBindings](../modules/_types_.md#listenerinternalbindings), `list`: [ListenerInternalBinding](../modules/_types_.md#listenerinternalbinding)[], `key`: string): *void*

Defined in index.ts:652

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

Defined in index.ts:668

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)] |
`__namedParameters` | [undefined, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)] |

**Returns:** *number*

___

### `Private` listenerBeforeLoaded

▸ **listenerBeforeLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:609

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:635

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:642

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

### `Private` listenersBeforeLoaded

▸ **listenersBeforeLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:590

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` listenersLoaded

▸ **listenersLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:616

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

Defined in index.ts:108

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

Defined in index.ts:678

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

Defined in index.ts:685

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md) |

**Returns:** *number*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:116

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:130

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
