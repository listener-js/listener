[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [bindings](_index_.listener.md#bindings)
* [commentRegex](_index_.listener.md#commentregex)
* [fnRegex](_index_.listener.md#fnregex)
* [id](_index_.listener.md#id)
* [idRegex](_index_.listener.md#idregex)
* [instances](_index_.listener.md#instances)
* [listenerFns](_index_.listener.md#private-listenerfns)
* [originalFns](_index_.listener.md#private-originalfns)

### Methods

* [applyInstanceFunctions](_index_.listener.md#private-applyinstancefunctions)
* [applyInstanceId](_index_.listener.md#private-applyinstanceid)
* [bind](_index_.listener.md#bind)
* [captureOutputs](_index_.listener.md#captureoutputs)
* [diffInstances](_index_.listener.md#private-diffinstances)
* [emit](_index_.listener.md#private-emit)
* [emitFunction](_index_.listener.md#emitfunction)
* [emitItem](_index_.listener.md#private-emititem)
* [emitItemOutput](_index_.listener.md#private-emititemoutput)
* [emitOptions](_index_.listener.md#private-emitoptions)
* [extractListeners](_index_.listener.md#private-extractlisteners)
* [listenerBeforeLoaded](_index_.listener.md#private-listenerbeforeloaded)
* [listenerLoaded](_index_.listener.md#private-listenerloaded)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [listenersLoaded](_index_.listener.md#private-listenersloaded)
* [load](_index_.listener.md#load)
* [parseId](_index_.listener.md#parseid)
* [reset](_index_.listener.md#reset)

## Constructors

###  constructor

\+ **new Listener**(`id`: string): *[Listener](_index_.listener.md)*

Defined in index.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  bindings

• **bindings**: *Record‹string, [Bindings](_bindings_.bindings.md)›*

Defined in index.ts:29

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:25

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:26

___

###  id

• **id**: *string*

Defined in index.ts:23

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:27

___

###  instances

• **instances**: *[ListenerInternalInstances](../modules/_types_.md#listenerinternalinstances)*

Defined in index.ts:30

___

### `Private` listenerFns

• **listenerFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:32

___

### `Private` originalFns

• **originalFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:33

## Methods

### `Private` applyInstanceFunctions

▸ **applyInstanceFunctions**(`lid`: string[], `__namedParameters`: object): *void | Promise‹any›*

Defined in index.ts:219

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

Defined in index.ts:249

**Parameters:**

▪ **lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *void | Promise‹any›*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], ...`targets`: [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[]): *void*

Defined in index.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`...targets` | [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[] |

**Returns:** *void*

___

###  captureOutputs

▸ **captureOutputs**(`_lid`: string[], `instances`: Record‹string, any›, `eventAssigns`: Record‹string, any›, `fn`: [ListenerCallback](../modules/_types_.md#listenercallback)): *[ListenerCaptureOutputs](../modules/_types_.md#listenercaptureoutputs)*

Defined in index.ts:53

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

Defined in index.ts:257

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *string[]*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:268

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

###  emitFunction

▸ **emitFunction**(`args`: any[], `id`: string[], `fn`: [ListenerInternalFunction](../modules/_types_.md#listenerinternalfunction), `opts`: [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md), `out`: any): *[ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)*

Defined in index.ts:389

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

Defined in index.ts:350

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

Defined in index.ts:373

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹any› |
`opts` | [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md) |
`out` | any |
`setter` | [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md) |

**Returns:** *any*

___

### `Private` emitOptions

▸ **emitOptions**(`options`: [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md)): *[ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)*

Defined in index.ts:420

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

**Returns:** *[ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *string[]*

Defined in index.ts:435

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` listenerBeforeLoaded

▸ **listenerBeforeLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:455

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:481

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:488

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

### `Private` listenersLoaded

▸ **listenersLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:462

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

Defined in index.ts:89

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Record‹string, any› | Promise‹Record‹string, any››*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:163

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:177

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
