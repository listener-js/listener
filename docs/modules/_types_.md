[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)
* [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md)
* [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)
* [ListenerEvent](../interfaces/_types_.listenerevent.md)

### Type aliases

* [ListenerCallback](_types_.md#listenercallback)
* [ListenerCaptureOutputs](_types_.md#listenercaptureoutputs)
* [ListenerInternalFunction](_types_.md#listenerinternalfunction)
* [ListenerInternalFunctions](_types_.md#listenerinternalfunctions)
* [ListenerInternalInstances](_types_.md#listenerinternalinstances)
* [LogEvent](_types_.md#logevent)

## Type aliases

###  ListenerCallback

Ƭ **ListenerCallback**: *function*

Defined in types.ts:30

#### Type declaration:

▸ (`lid`: string[], `event`: [ListenerEvent](../interfaces/_types_.listenerevent.md)): *void | Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`event` | [ListenerEvent](../interfaces/_types_.listenerevent.md) |

___

###  ListenerCaptureOutputs

Ƭ **ListenerCaptureOutputs**: *object*

Defined in types.ts:35

#### Type declaration:

* **promises**: *Promise‹any›[]*

* **promisesById**: *Record‹string, Promise‹any››*

* **values**: *any[]*

* **valuesById**: *Record‹string, any›*

___

###  ListenerInternalFunction

Ƭ **ListenerInternalFunction**: *function*

Defined in types.ts:47

#### Type declaration:

▸ (`id`: string[], ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...arg` | any[] |

___

###  ListenerInternalFunctions

Ƭ **ListenerInternalFunctions**: *Record‹string, [ListenerInternalFunction](_types_.md#listenerinternalfunction)›*

Defined in types.ts:42

___

###  ListenerInternalInstances

Ƭ **ListenerInternalInstances**: *Record‹string, any›*

Defined in types.ts:52

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:54

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |
