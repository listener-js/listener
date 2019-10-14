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
* [callListenerAfterLoaded](_index_.listener.md#private-calllistenerafterloaded)
* [callListenerBeforeLoaded](_index_.listener.md#private-calllistenerbeforeloaded)
* [callListenerLoaded](_index_.listener.md#private-calllistenerloaded)
* [callWithEvent](_index_.listener.md#private-callwithevent)
* [diffInstances](_index_.listener.md#private-diffinstances)
* [emit](_index_.listener.md#private-emit)
* [extractListeners](_index_.listener.md#private-extractlisteners)
* [listenerAfterLoaded](_index_.listener.md#private-listenerafterloaded)
* [listenerBeforeLoaded](_index_.listener.md#private-listenerbeforeloaded)
* [listenerLoaded](_index_.listener.md#private-listenerloaded)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [load](_index_.listener.md#load)
* [parseId](_index_.listener.md#parseid)
* [reset](_index_.listener.md#reset)

## Constructors

###  constructor

\+ **new Listener**(`id`: string): *[Listener](_index_.listener.md)*

Defined in index.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Listener](_index_.listener.md)*

## Properties

###  bindings

• **bindings**: *Record‹string, [Bindings](_bindings_.bindings.md)›*

Defined in index.ts:23

___

###  id

• **id**: *string*

Defined in index.ts:21

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

Defined in index.ts:24

___

### `Private` listenerFns

• **listenerFns**: *[ListenerFunctions](../modules/_types_.md#listenerfunctions)*

Defined in index.ts:26

___

### `Private` originalFns

• **originalFns**: *[ListenerFunctions](../modules/_types_.md#listenerfunctions)*

Defined in index.ts:27

## Methods

### `Private` applyInstanceFunctions

▸ **applyInstanceFunctions**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:214

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

### `Private` applyInstanceId

▸ **applyInstanceId**(`lid`: string[], `instances`: Record‹string, any›): *void | Promise‹any›*

Defined in index.ts:248

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |

**Returns:** *void | Promise‹any›*

___

###  bind

▸ **bind**(`lid`: string[], `matchId`: string[], ...`targets`: [ListenerBindings](../modules/_bindings_.md#listenerbindings)[]): *void*

Defined in index.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`matchId` | string[] |
`...targets` | [ListenerBindings](../modules/_bindings_.md#listenerbindings)[] |

**Returns:** *void*

___

### `Private` callListenerAfterLoaded

▸ **callListenerAfterLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹void›*

Defined in index.ts:259

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instances` | Record‹string, any› |
`options?` | Record‹string, any› |

**Returns:** *void | Promise‹void›*

___

### `Private` callListenerBeforeLoaded

▸ **callListenerBeforeLoaded**(`lid`: string[], `instances`: Record‹string, any›, `options?`: Record‹string, any›): *void | Promise‹void›*

Defined in index.ts:272

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

Defined in index.ts:285

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

Defined in index.ts:298

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

Defined in index.ts:318

**Parameters:**

Name | Type |
------ | ------ |
`instances` | Record‹string, any› |

**Returns:** *string[]*

___

### `Private` emit

▸ **emit**(`_lid`: string[], `fnId`: string, `instanceId`: string, ...`args`: any[]): *any*

Defined in index.ts:329

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`fnId` | string |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

### `Private` extractListeners

▸ **extractListeners**(`instance`: any): *[string, string][]*

Defined in index.ts:420

**Parameters:**

Name | Type |
------ | ------ |
`instance` | any |

**Returns:** *[string, string][]*

___

### `Private` listenerAfterLoaded

▸ **listenerAfterLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:444

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerBeforeLoaded

▸ **listenerBeforeLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:451

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerLoaded

▸ **listenerLoaded**(`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

Defined in index.ts:458

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

**Returns:** *void | Promise‹any›*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string, `lidName`: string): *Function*

Defined in index.ts:465

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

Defined in index.ts:47

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

Defined in index.ts:158

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[string, string]*

___

###  reset

▸ **reset**(`lid`: string[]): *void*

Defined in index.ts:172

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |

**Returns:** *void*
