[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["types"](_types_.md)

# External module: "types"

## Index

### Interfaces

* [ListenerOptions](../interfaces/_types_.listeneroptions.md)

### Type aliases

* [ListenerBind](_types_.md#listenerbind)
* [ListenerBindItem](_types_.md#listenerbinditem)
* [ListenerBindingItem](_types_.md#listenerbindingitem)
* [ListenerBindingOptions](_types_.md#listenerbindingoptions)
* [ListenerBindings](_types_.md#listenerbindings)
* [ListenerBindingsListSorter](_types_.md#listenerbindingslistsorter)
* [ListenerCallback](_types_.md#listenercallback)
* [ListenerCallbackArgs](_types_.md#listenercallbackargs)
* [ListenerFunction](_types_.md#listenerfunction)
* [ListenerInstances](_types_.md#listenerinstances)
* [ListenerOutputs](_types_.md#listeneroutputs)
* [ListenerPending](_types_.md#listenerpending)
* [ListenerPendingResolvers](_types_.md#listenerpendingresolvers)
* [Listeners](_types_.md#listeners)
* [LogEvent](_types_.md#logevent)

## Type aliases

###  ListenerBind

Ƭ **ListenerBind**: *[ListenerBindItem](_types_.md#listenerbinditem)[]*

Defined in types.ts:17

___

###  ListenerBindItem

Ƭ **ListenerBindItem**: *[string[], string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]*

Defined in types.ts:19

___

###  ListenerBindingItem

Ƭ **ListenerBindingItem**: *[string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]*

Defined in types.ts:25

___

###  ListenerBindingOptions

Ƭ **ListenerBindingOptions**: *Record‹string, [ListenerOptions](../interfaces/_types_.listeneroptions.md)›*

Defined in types.ts:27

___

###  ListenerBindings

Ƭ **ListenerBindings**: *Record‹string, string[]›*

Defined in types.ts:32

___

###  ListenerBindingsListSorter

Ƭ **ListenerBindingsListSorter**: *function*

Defined in types.ts:34

#### Type declaration:

▸ (`a`: [ListenerBindingItem](_types_.md#listenerbindingitem), `b`: [ListenerBindingItem](_types_.md#listenerbindingitem)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [ListenerBindingItem](_types_.md#listenerbindingitem) |
`b` | [ListenerBindingItem](_types_.md#listenerbindingitem) |

___

###  ListenerCallback

Ƭ **ListenerCallback**: *function*

Defined in types.ts:39

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

Defined in types.ts:46

___

###  ListenerFunction

Ƭ **ListenerFunction**: *function*

Defined in types.ts:10

#### Type declaration:

▸ (`id`: string[], ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...arg` | any[] |

___

###  ListenerInstances

Ƭ **ListenerInstances**: *Record‹string, any›*

Defined in types.ts:53

___

###  ListenerOutputs

Ƭ **ListenerOutputs**: *object*

Defined in types.ts:55

#### Type declaration:

* **promises**: *Promise‹any›[]*

* **promisesById**: *Record‹string, Promise‹any››*

* **values**: *any[]*

* **valuesById**: *Record‹string, any›*

___

###  ListenerPending

Ƭ **ListenerPending**: *Record‹string, Promise‹any››*

Defined in types.ts:62

___

###  ListenerPendingResolvers

Ƭ **ListenerPendingResolvers**: *Record‹string, Function›*

Defined in types.ts:64

___

###  Listeners

Ƭ **Listeners**: *Record‹string, [ListenerFunction](_types_.md#listenerfunction)›*

Defined in types.ts:15

___

###  LogEvent

Ƭ **LogEvent**: *function*

Defined in types.ts:69

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |
