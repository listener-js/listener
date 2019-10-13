[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["bindings"](../modules/_bindings_.md) › [Bindings](_bindings_.bindings.md)

# Class: Bindings

## Hierarchy

* **Bindings**

## Index

### Constructors

* [constructor](_bindings_.bindings.md#constructor)

### Properties

* [bindings](_bindings_.bindings.md#bindings)
* [matchId](_bindings_.bindings.md#matchid)
* [targetIds](_bindings_.bindings.md#targetids)

### Methods

* [add](_bindings_.bindings.md#add)
* [addBinding](_bindings_.bindings.md#addbinding)
* [remove](_bindings_.bindings.md#remove)
* [separateOptions](_bindings_.bindings.md#private-separateoptions)
* [list](_bindings_.bindings.md#static-list)
* [listSort](_bindings_.bindings.md#static-private-listsort)
* [optsToIndex](_bindings_.bindings.md#static-private-optstoindex)

## Constructors

###  constructor

\+ **new Bindings**(`matchId?`: string): *[Bindings](_bindings_.bindings.md)*

Defined in bindings.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`matchId?` | string |

**Returns:** *[Bindings](_bindings_.bindings.md)*

## Properties

###  bindings

• **bindings**: *[ListenerBinding](../interfaces/_bindings_.listenerbinding.md)[]* =  []

Defined in bindings.ts:33

___

###  matchId

• **matchId**: *string*

Defined in bindings.ts:34

___

###  targetIds

• **targetIds**: *Set‹string›* =  new Set()

Defined in bindings.ts:35

## Methods

###  add

▸ **add**(...`bindings`: [ListenerBindings](../modules/_bindings_.md#listenerbindings)[]): *[Bindings](_bindings_.bindings.md)*

Defined in bindings.ts:41

**Parameters:**

Name | Type |
------ | ------ |
`...bindings` | [ListenerBindings](../modules/_bindings_.md#listenerbindings)[] |

**Returns:** *[Bindings](_bindings_.bindings.md)*

___

###  addBinding

▸ **addBinding**(`__namedParameters`: object): *void*

Defined in bindings.ts:65

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`customIds` | string[] |
`options` | [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md) |
`targetId` | string |

**Returns:** *void*

___

###  remove

▸ **remove**(`binding`: [ListenerBinding](../interfaces/_bindings_.listenerbinding.md)): *void*

Defined in bindings.ts:85

**Parameters:**

Name | Type |
------ | ------ |
`binding` | [ListenerBinding](../interfaces/_bindings_.listenerbinding.md) |

**Returns:** *void*

___

### `Private` separateOptions

▸ **separateOptions**(`binding`: [ListenerBindings](../modules/_bindings_.md#listenerbindings)): *[string | string[][], [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md)]*

Defined in bindings.ts:199

**Parameters:**

Name | Type |
------ | ------ |
`binding` | [ListenerBindings](../modules/_bindings_.md#listenerbindings) |

**Returns:** *[string | string[][], [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md)]*

___

### `Static` list

▸ **list**(`_lid`: string[], `__namedParameters`: object): *[[ListenerBinding](../interfaces/_bindings_.listenerbinding.md)[], number[]]*

Defined in bindings.ts:95

**Parameters:**

▪ **_lid**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`bindings` | object |
`fnId` | string |
`id` | string[] |
`index` | number |

**Returns:** *[[ListenerBinding](../interfaces/_bindings_.listenerbinding.md)[], number[]]*

___

### `Static` `Private` listSort

▸ **listSort**(`__namedParameters`: object, `__namedParameters`: object): *number*

Defined in bindings.ts:159

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`a` | [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md) |

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`b` | [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md) |

**Returns:** *number*

___

### `Static` `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md)): *number*

Defined in bindings.ts:169

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md) |

**Returns:** *number*
