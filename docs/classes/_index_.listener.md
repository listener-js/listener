> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](../modules/_index_.md) / [Listener](_index_.listener.md) /

# Class: Listener

## Hierarchy

* **Listener**

## Index

### Properties

* [bindings](_index_.listener.md#bindings)
* [instances](_index_.listener.md#instances)
* [listeners](_index_.listener.md#listeners)
* [options](_index_.listener.md#options)
* [originals](_index_.listener.md#originals)

### Methods

* [addList](_index_.listener.md#private-addlist)
* [buildList](_index_.listener.md#private-buildlist)
* [emit](_index_.listener.md#private-emit)
* [listSort](_index_.listener.md#private-listsort)
* [listen](_index_.listener.md#listen)
* [listener](_index_.listener.md#listener)
* [listenerWrapper](_index_.listener.md#private-listenerwrapper)
* [optsToIndex](_index_.listener.md#private-optstoindex)
* [reset](_index_.listener.md#reset)

## Properties

###  bindings

• **bindings**: *[ListenerBindings](../modules/_types_.md#listenerbindings)*

*Defined in [index.ts:13](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L13)*

___

###  instances

• **instances**: *[ListenerInstances](../modules/_types_.md#listenerinstances)*

*Defined in [index.ts:14](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L14)*

___

###  listeners

• **listeners**: *[Listeners](../modules/_types_.md#listeners)*

*Defined in [index.ts:15](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L15)*

___

###  options

• **options**: *[ListenerBindingOptions](../modules/_types_.md#listenerbindingoptions)*

*Defined in [index.ts:16](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L16)*

___

###  originals

• **originals**: *[Listeners](../modules/_types_.md#listeners)*

*Defined in [index.ts:17](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L17)*

## Methods

### `Private` addList

▸ **addList**(`lists`: [ListenerBindings](../modules/_types_.md#listenerbindings), `list`: [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[], `key`: string): *void*

*Defined in [index.ts:102](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`lists` | [ListenerBindings](../modules/_types_.md#listenerbindings) |
`list` | [ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[] |
`key` | string |

**Returns:** *void*

___

### `Private` buildList

▸ **buildList**(`fnId`: string, `id`: string[]): *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

*Defined in [index.ts:117](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L117)*

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |

**Returns:** *[ListenerBindingItem](../modules/_types_.md#listenerbindingitem)[]*

___

### `Private` emit

▸ **emit**(`fnId`: string, `id`: string[], `instanceId`: string, ...`args`: any[]): *any*

*Defined in [index.ts:164](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L164)*

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`id` | string[] |
`instanceId` | string |
`...args` | any[] |

**Returns:** *any*

___

### `Private` listSort

▸ **listSort**(`__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)], `__namedParameters`: [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)]): *number*

*Defined in [index.ts:236](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L236)*

**Parameters:**

Name | Type |
------ | ------ |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |
`__namedParameters` | [undefined, [ListenerOptions](../interfaces/_types_.listeneroptions.md)] |

**Returns:** *number*

___

###  listen

▸ **listen**(`sourceId`: string[], `targetId`: string[], `options?`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *void*

*Defined in [index.ts:19](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`sourceId` | string[] |
`targetId` | string[] |
`options?` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *void*

___

###  listener

▸ **listener**(`instances`: `Record<string, any>`, `options?`: `Record<string, any>`): *void*

*Defined in [index.ts:38](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`instances` | `Record<string, any>` |
`options?` | `Record<string, any>` |

**Returns:** *void*

___

### `Private` listenerWrapper

▸ **listenerWrapper**(`fnId`: string, `instanceId`: string): *`Function`*

*Defined in [index.ts:227](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L227)*

**Parameters:**

Name | Type |
------ | ------ |
`fnId` | string |
`instanceId` | string |

**Returns:** *`Function`*

___

### `Private` optsToIndex

▸ **optsToIndex**(`opts`: [ListenerOptions](../interfaces/_types_.listeneroptions.md)): *number*

*Defined in [index.ts:247](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L247)*

**Parameters:**

Name | Type |
------ | ------ |
`opts` | [ListenerOptions](../interfaces/_types_.listeneroptions.md) |

**Returns:** *number*

___

###  reset

▸ **reset**(): *void*

*Defined in [index.ts:78](https://github.com/listener-js/listener/blob/02261ac/src/index.ts#L78)*

**Returns:** *void*