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
* [callListenerBeforeLoaded](_index_.listener.md#private-calllistenerbeforeloaded)
* [callListenerLoaded](_index_.listener.md#private-calllistenerloaded)
* [callWithEvent](_index_.listener.md#private-callwithevent)
* [diffInstances](_index_.listener.md#private-diffinstances)
* [emit](_index_.listener.md#private-emit)
* [emitFunction](_index_.listener.md#private-emitfunction)
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

Defined in index.ts:30

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  bindings

• **bindings**: *Record‹string, [Bindings](_bindings_.bindings.md)›*

Defined in index.ts:26

___

###  commentRegex

• **commentRegex**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in index.ts:22

___

###  fnRegex

• **fnRegex**: *RegExp* =  /^(\(|function \w*\()?\s*lid[\),\s]/

Defined in index.ts:23

___

###  id

• **id**: *string*

Defined in index.ts:20

___

###  idRegex

• **idRegex**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:24

___

###  instances

• **instances**: *[ListenerInternalInstances](../modules/_types_.md#listenerinternalinstances)*

Defined in index.ts:27

___

### `Private` listenerFns

• **listenerFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:29

___

### `Private` originalFns

• **originalFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:30

## Methods

### `Private` applyInstanceFunctions

▸ **applyInstanceFunctions**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:194

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyInstanceId

▸ **applyInstanceId**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:231

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], ...`targets`: [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[]): *void*

Defined in index.ts:37

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`...targets` | [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[] |

**Returns:** *void*

___

### `Private` callListenerBeforeLoaded

▸ **callListenerBeforeLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹void›*

Defined in index.ts:246

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹void›*

___

### `Private` callListenerLoaded

▸ **callListenerLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹void›*

Defined in index.ts:259

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹void›*

___

### `Private` callWithEvent

▸ **callWithEvent**(`_lid`: string[], `fn`: string, `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹void›*

Defined in index.ts:272

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fn` | string |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹void›*

___

### `Private` diffInstances

▸ **diffInstances**(`instances`: Record‹string, any›): *string[]*

Defined in index.ts:296

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *string[]*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:307

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

### `Private` emitFunction

▸ **emitFunction**(`args`: any[], `id`: string[], `fn`: [ListenerInternalFunction](../modules/_types_.md#listenerinternalfunction), `opts`: [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md), `out`: any): *[ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)*

Defined in index.ts:398

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

Defined in index.ts:429

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

Defined in index.ts:452

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

Defined in index.ts:468

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

**Returns:** *[ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *string[]*

Defined in index.ts:483

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *string[]*

___

### `Private` listenerBeforeLoaded

▸ **listenerBeforeLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:503

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:518

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *Function*

Defined in index.ts:525

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *Function*

___

### `Private` listenersLoaded

▸ **listenersLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:510

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

Defined in index.ts:50

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

Defined in index.ts:134

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:148

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
