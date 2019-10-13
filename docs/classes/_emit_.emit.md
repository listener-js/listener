[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["emit"](../modules/_emit_.md) › [Emit](_emit_.emit.md)

# Class: Emit

## Hierarchy

* **Emit**

## Index

### Methods

* [callFunction](_emit_.emit.md#static-callfunction)
* [callItem](_emit_.emit.md#static-callitem)
* [customizeArgs](_emit_.emit.md#static-customizeargs)
* [customizeIds](_emit_.emit.md#static-customizeids)
* [itemOutput](_emit_.emit.md#static-itemoutput)
* [options](_emit_.emit.md#static-options)

## Methods

### `Static` callFunction

▸ **callFunction**(`__namedParameters`: object): *[ListenerEmitFunction](../interfaces/_emit_.listeneremitfunction.md)*

Defined in emit.ts:63

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`args` | any[] |
`fn` | function |
`id` | string[] |
`opts` | [ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md) |
`setter` | [ListenerEmitItemSetter](../interfaces/_emit_.listeneremititemsetter.md) |

**Returns:** *[ListenerEmitFunction](../interfaces/_emit_.listeneremitfunction.md)*

___

### `Static` callItem

▸ **callItem**(`item`: [ListenerEmitItem](../interfaces/_emit_.listeneremititem.md)): *any*

Defined in emit.ts:95

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ListenerEmitItem](../interfaces/_emit_.listeneremititem.md) |

**Returns:** *any*

___

### `Static` customizeArgs

▸ **customizeArgs**(`args`: any[], `__namedParameters`: object): *any[]*

Defined in emit.ts:37

**Parameters:**

▪ **args**: *any[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`addListener` | boolean |

**Returns:** *any[]*

___

### `Static` customizeIds

▸ **customizeIds**(`id`: string[], `__namedParameters`: object): *any[]*

Defined in emit.ts:50

**Parameters:**

▪ **id**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`customIds` | string[] |

**Returns:** *any[]*

___

### `Static` itemOutput

▸ **itemOutput**(`promise`: Promise‹any›, `opts`: [ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md), `setter`: [ListenerEmitItemSetter](../interfaces/_emit_.listeneremititemsetter.md)): *any*

Defined in emit.ts:105

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹any› |
`opts` | [ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md) |
`setter` | [ListenerEmitItemSetter](../interfaces/_emit_.listeneremititemsetter.md) |

**Returns:** *any*

___

### `Static` options

▸ **options**(`options`: [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md)): *[ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md)*

Defined in emit.ts:121

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ListenerInternalBindingOptions](../interfaces/_bindings_.listenerinternalbindingoptions.md) |

**Returns:** *[ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md)*
