[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)

### Type aliases

* [ListenerBinding](_types_.md#listenerbinding)
* [ListenerBindings](_types_.md#listenerbindings)
* [ListenerCallback](_types_.md#listenercallback)
* [ListenerCallbackArgs](_types_.md#listenercallbackargs)
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

Defined in types.ts:13

___

###  ListenerBindings

Ƭ **ListenerBindings**: *[ListenerBinding](_types_.md#listenerbinding)[]*

Defined in types.ts:11

___

###  ListenerCallback

Ƭ **ListenerCallback**: *function*

Defined in types.ts:19

#### Type declaration:

▸ (`lid`: string[], `instanceId`: string, `instance`: any, ...`args`: any[]): *void | Promise‹any›*

**Parameters:**

Name | Type |
------ | ------ |
`lid` | string[] |
`instanceId` | string |
`instance` | any |
`...args` | any[] |

___

###  ListenerCallbackArgs

Ƭ **ListenerCallbackArgs**: *[string[], string, any, Array]*

Defined in types.ts:26

___

###  ListenerCaptureOutputs

Ƭ **ListenerCaptureOutputs**: *object*

Defined in types.ts:33

#### Type declaration:

* **promises**: *Promise‹any›[]*

* **promisesById**: *Record‹string, Promise‹any››*

* **values**: *any[]*

* **valuesById**: *Record‹string, any›*

___

###  ListenerInternalBinding

Ƭ **ListenerInternalBinding**: *[string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)]*

Defined in types.ts:45

___

###  ListenerInternalBindings

Ƭ **ListenerInternalBindings**: *Record‹string, string[]›*

Defined in types.ts:40

___

###  ListenerInternalFunction

Ƭ **ListenerInternalFunction**: *function*

Defined in types.ts:55

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

Defined in types.ts:50

___

###  ListenerInternalInstances

Ƭ **ListenerInternalInstances**: *Record‹string, any›*

Defined in types.ts:65

___

###  ListenerInternalOptions

Ƭ **ListenerInternalOptions**: *Record‹string, [ListenerBindingOptions](../interfaces/_types_.listenerbindingoptions.md)›*

Defined in types.ts:60

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:67

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |
