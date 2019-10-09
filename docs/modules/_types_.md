[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)
* [ListenerEmitFunction](../interfaces/_types_.listeneremitfunction.md)
* [ListenerEmitItemSetter](../interfaces/_types_.listeneremititemsetter.md)
* [ListenerEmitOptions](../interfaces/_types_.listeneremitoptions.md)
* [ListenerEvent](../interfaces/_types_.listenerevent.md)

### Type aliases

* [ListenerBindTarget](_types_.md#listenerbindtarget)
* [ListenerBindTargets](_types_.md#listenerbindtargets)
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

###  ListenerBindTarget

Ƭ **ListenerBindTarget**: *[string] | [string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]*

Defined in types.ts:51

___

###  ListenerBindTargets

Ƭ **ListenerBindTargets**: *string[] | [string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)][]*

Defined in types.ts:47

___

###  ListenerBinding

Ƭ **ListenerBinding**: *[string[], string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]*

Defined in types.ts:41

___

###  ListenerBindings

Ƭ **ListenerBindings**: *[ListenerBinding](_types_.md#listenerbinding)[]*

Defined in types.ts:39

___

###  ListenerCallback

Ƭ **ListenerCallback**: *function*

Defined in types.ts:55

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

Defined in types.ts:60

#### Type declaration:

* **promises**: *Promise‹any›[]*

* **promisesById**: *Record‹string, Promise‹any››*

* **values**: *any[]*

* **valuesById**: *Record‹string, any›*

___

###  ListenerInternalBinding

Ƭ **ListenerInternalBinding**: *[string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]*

Defined in types.ts:72

___

###  ListenerInternalBindings

Ƭ **ListenerInternalBindings**: *Record‹string, string[]›*

Defined in types.ts:67

___

###  ListenerInternalFunction

Ƭ **ListenerInternalFunction**: *function*

Defined in types.ts:82

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

Defined in types.ts:77

___

###  ListenerInternalInstances

Ƭ **ListenerInternalInstances**: *Record‹string, any›*

Defined in types.ts:92

___

###  ListenerInternalOptions

Ƭ **ListenerInternalOptions**: *Record‹string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)›*

Defined in types.ts:87

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:94

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |
