[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["index"](../modules/_index_.md) › [Listener](_index_.listener.md)

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Constructors

* [constructor](_index_.listener.md#constructor)

### Properties

* [bindings](_index_.listener.md#bindings)
* [id](_index_.listener.md#id)
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
* [load](_index_.listener.md#load)
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

###  bindings

• **bindings**: *Record‹string, [Bindings](_bindings_.bindings.md)›*

Defined in index.ts:30

___

###  id

• **id**: *string*

Defined in index.ts:28

___

###  instances

• **instances**: *[ListenerInternalInstances](../modules/_types_.md#listenerinternalinstances)*

Defined in index.ts:31

___

### `Private` listenerFns

• **listenerFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:33

___

### `Private` originalFns

• **originalFns**: *[ListenerInternalFunctions](../modules/_types_.md#listenerinternalfunctions)*

Defined in index.ts:34

## Methods

### `Private` applyInstanceFunctions

▸ **applyInstanceFunctions**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:196

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyInstanceId

▸ **applyInstanceId**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:230

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], ...`targets`: [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[]): *void*

Defined in index.ts:41

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

Defined in index.ts:241

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

Defined in index.ts:254

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

Defined in index.ts:267

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

Defined in index.ts:287

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *string[]*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:298

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

▸ **emitFunction**(`__namedParameters`: object): *[ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)*

Defined in index.ts:423

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`args` | any[] |
`fn` | function |
`id` | string[] |
`opts` | [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md) |
`out` | any |

**Returns:** *[ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)*

___

### `Private` emitItem

▸ **emitItem**(`item`: [ListenerEmitItem](../interfaces/_types_.listeneremititem.md)): *any*

Defined in index.ts:454

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ListenerEmitItem](../interfaces/_types_.listeneremititem.md) |

**Returns:** *any*

___

### `Private` emitItemOutput

▸ **emitItemOutput**(`promise`: Promise‹any›, `opts`: [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md), `out`: any, `setter`: [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md)): *any*

Defined in index.ts:464

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

Defined in index.ts:480

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

**Returns:** *[ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *[string, string][]*

Defined in index.ts:496

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *[string, string][]*

___

### `Private` listenerBeforeLoaded

▸ **listenerBeforeLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:520

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:527

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string, `lidName`: string): *Function*

Defined in index.ts:534

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |
`lidName` | string |

**Returns:** *Function*

___

###  load

▸ **load**(`lid_`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *Record‹string, any› | Promise‹Record‹string, any››*

Defined in index.ts:54

**Parameters:**

Name | Type |
------ | ------ |
`lid_` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *Record‹string, any› | Promise‹Record‹string, any››*

___

###  parseId

▸ **parseId**(`id`: string): *[string, string]*

Defined in index.ts:140

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:154

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
