[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)
* [ListenerEmitItem](../interfaces/_types_.listeneremititem.md)
* [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)
* [ListenerEvent](../interfaces/_types_.listenerevent.md)

### Type aliases

* [ListenerBinding](_types_.md#listenerbinding)
* [ListenerBindings](_types_.md#listenerbindings)
* [ListenerCallback](_types_.md#listenercallback)
* [ListenerCaptureOutputs](_types_.md#listenercaptureoutputs)
* [ListenerInternalBinding](_types_.md#listenerinternalbinding)
* [ListenerInternalBindings](_types_.md#listenerinternalbindings)
* [ListenerInternalFunction](_types_.md#listenerinternalfunction)
* [ListenerInternalFunctions](_types_.md#listenerinternalfunctions)
* [ListenerInternalInstances](_types_.md#listenerinternalinstances)
* [ListenerInternalOptions](_types_.md#listenerinternaloptions)
* [LogEvent](_types_.md#logevent)

## Type aliases

###  ListenerBinding

Ƭ **ListenerBinding**: *[string[], string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]*

Defined in types.ts:36

___

###  ListenerBindings

Ƭ **ListenerBindings**: *[ListenerBinding](_types_.md#listenerbinding)[]*

Defined in types.ts:34

___

###  ListenerCallback

Ƭ **ListenerCallback**: *function*

Defined in types.ts:42

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

Defined in types.ts:47

#### Type declaration:

* **promises**: *Promise‹any›[]*

* **promisesById**: *Record‹string, Promise‹any››*

* **values**: *any[]*

* **valuesById**: *Record‹string, any›*

___

###  ListenerInternalBinding

Ƭ **ListenerInternalBinding**: *[string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]*

Defined in types.ts:59

___

###  ListenerInternalBindings

Ƭ **ListenerInternalBindings**: *Record‹string, string[]›*

Defined in types.ts:54

___

###  ListenerInternalFunction

Ƭ **ListenerInternalFunction**: *function*

Defined in types.ts:69

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

Defined in types.ts:64

___

###  ListenerInternalInstances

Ƭ **ListenerInternalInstances**: *Record‹string, any›*

Defined in types.ts:79

___

###  ListenerInternalOptions

Ƭ **ListenerInternalOptions**: *Record‹string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)›*

Defined in types.ts:74

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:81

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |
