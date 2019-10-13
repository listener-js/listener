[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["emit"](../modules/_emit_.md) › [Emit](_emit_.emit.md)

# Class: Emit

## Hierarchy

* **Emit**

## Index

### Methods

* [callFunction](_emit_.emit.md#static-callfunction)
* [callItem](_emit_.emit.md#static-callitem)
* [callPromises](_emit_.emit.md#static-callpromises)
* [customizeArgs](_emit_.emit.md#static-customizeargs)
* [customizeIds](_emit_.emit.md#static-customizeids)
* [itemOutput](_emit_.emit.md#static-itemoutput)
* [options](_emit_.emit.md#static-options)

## Methods

### `Static` callFunction

▸ **callFunction**(`__namedParameters`: object, `setter`: [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md)): *[ListenerEmitFunction](../interfaces/_emit_.listeneremitfunction.md)*

Defined in emit.ts:62

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`args` | any[] |
`fn` | function |
`id` | string[] |
`opts` | [ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md) |

▪ **setter**: *[ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md)*

**Returns:** *[ListenerEmitFunction](../interfaces/_emit_.listeneremitfunction.md)*

___

### `Static` callItem

▸ **callItem**(`item`: [ListenerEmitItem](../interfaces/_emit_.listeneremititem.md), `setter`: [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md)): *any*

Defined in emit.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`item` | [ListenerEmitItem](../interfaces/_emit_.listeneremititem.md) |
`setter` | [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md) |

**Returns:** *any*

___

### `Static` callPromises

▸ **callPromises**(`promises`: [ListenerEmitItem](../interfaces/_emit_.listeneremititem.md)[], `setter`: [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md)): *void*

Defined in emit.ts:104

**Parameters:**

Name | Type |
------ | ------ |
`promises` | [ListenerEmitItem](../interfaces/_emit_.listeneremititem.md)[] |
`setter` | [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md) |

**Returns:** *void*

___

### `Static` customizeArgs

▸ **customizeArgs**(`args`: any[], `__namedParameters`: object): *any[]*

Defined in emit.ts:36

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

Defined in emit.ts:49

**Parameters:**

▪ **id**: *string[]*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`customIds` | string[] |

**Returns:** *any[]*

___

### `Static` itemOutput

▸ **itemOutput**(`promise`: Promise‹any›, `opts`: [ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md), `setter`: [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md)): *any*

Defined in emit.ts:123

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹any› |
`opts` | [ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md) |
`setter` | [ListenerEmitSetter](../interfaces/_emit_.listeneremitsetter.md) |

**Returns:** *any*

___

### `Static` options

▸ **options**(`options`: [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md)): *[ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md)*

Defined in emit.ts:139

**Parameters:**

Name | Type |
------ | ------ |
`options` | [ListenerBindingOptions](../interfaces/_bindings_.listenerbindingoptions.md) |

**Returns:** *[ListenerEmitOptions](../interfaces/_emit_.listeneremitoptions.md)*
