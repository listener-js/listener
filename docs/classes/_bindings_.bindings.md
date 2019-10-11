[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["bindings"](../modules/_bindings_.md) › [Bindings](_bindings_.bindings.md)

# Class: Bindings

## Hierarchy

* **Bindings**

## Index

### Constructors

* [constructor](_bindings_.bindings.md#constructor)

### Properties

* [bindings](_bindings_.bindings.md#bindings)
* [targetIds](_bindings_.bindings.md#targetids)

### Methods

* [add](_bindings_.bindings.md#add)
* [addBinding](_bindings_.bindings.md#addbinding)
* [separateOptions](_bindings_.bindings.md#private-separateoptions)
* [list](_bindings_.bindings.md#static-list)
* [listSort](_bindings_.bindings.md#static-private-listsort)
* [optsToIndex](_bindings_.bindings.md#static-private-optstoindex)

## Constructors

###  constructor

\+ **new Bindings**(...`bindings`: [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[]): *[Bindings](_bindings_.bindings.md)*

Defined in bindings.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`...bindings` | [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[] |

**Returns:** *[Bindings](_bindings_.bindings.md)*

## Properties

###  bindings

• **bindings**: *[ListenerInternalBinding](../interfaces/_bindings_.listenerinternalbinding.md)[]* =  []

Defined in bindings.ts:24

___

###  targetIds

• **targetIds**: *Set‹string›* =  new Set()

Defined in bindings.ts:25

## Methods

###  add

▸ **add**(...`bindings`: [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[]): *void*

Defined in bindings.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`...bindings` | [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)[] |

**Returns:** *void*

___

###  addBinding

▸ **addBinding**(`__namedParameters`: object): *void*

Defined in bindings.ts:55

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`customIds` | string[] |
`options` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |
`targetId` | string |

**Returns:** *void*

___

### `Private` separateOptions

▸ **separateOptions**(`binding`: [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings)): *[string | string[][], [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md)]*

Defined in bindings.ts:160

**Parameters:**

Name | Type |
------ | ------ |
`binding` | [ListenerInternalBindings](../modules/_bindings_.md#listenerinternalbindings) |

**Returns:** *[string | string[][], [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md)]*

___

### `Static` list

▸ **list**(`_lid`: string[], `bindings`: Record‹string, [Bindings](_bindings_.bindings.md)›, `fnId`: string, `id`: string[]): *[ListenerInternalBinding](../interfaces/_bindings_.listenerinternalbinding.md)[]*

Defined in bindings.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`_lid` | string[] |
`bindings` | Record‹string, [Bindings](_bindings_.bindings.md)› |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerInternalBinding](../interfaces/_bindings_.listenerinternalbinding.md)[]*

___

### `Static` `Private` listSort

▸ **listSort**(`__namedParameters`: object, `__namedParameters`: object): *number*

Defined in bindings.ts:120

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`a` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`b` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

**Returns:** *number*

___

### `Static` `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md)): *number*

Defined in bindings.ts:130

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

**Returns:** *number*
