> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](_index_.md) /

# External module: "index"

## Index

### Classes

* [Listener](../classes/_index_.listener.md)

### Interfaces

* [ListenerOptions](../interfaces/_index_.listeneroptions.md)

### Type aliases

* [ListenerBindingItem](_index_.md#listenerbindingitem)
* [ListenerBindingOptions](_index_.md#listenerbindingoptions)
* [ListenerBindings](_index_.md#listenerbindings)
* [ListenerBindingsListSorter](_index_.md#listenerbindingslistsorter)
* [ListenerFunction](_index_.md#listenerfunction)
* [ListenerInstances](_index_.md#listenerinstances)
* [Listeners](_index_.md#listeners)

### Variables

* [instance](_index_.md#const-instance)
* [listen](_index_.md#const-listen)
* [listener](_index_.md#const-listener)
* [listenerIdRegex](_index_.md#const-listeneridregex)
* [reset](_index_.md#const-reset)

## Type aliases

###  ListenerBindingItem

Ƭ **ListenerBindingItem**: *[string, [ListenerOptions](../interfaces/_index_.listeneroptions.md)]*

Defined in index.ts:13

___

###  ListenerBindingOptions

Ƭ **ListenerBindingOptions**: *`Record<string, ListenerOptions>`*

Defined in index.ts:15

___

###  ListenerBindings

Ƭ **ListenerBindings**: *`Record<string, string[]>`*

Defined in index.ts:11

___

###  ListenerBindingsListSorter

Ƭ **ListenerBindingsListSorter**: *function*

Defined in index.ts:18

#### Type declaration:

▸ (`a`: [ListenerBindingItem](_index_.md#listenerbindingitem), `b`: [ListenerBindingItem](_index_.md#listenerbindingitem)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [ListenerBindingItem](_index_.md#listenerbindingitem) |
`b` | [ListenerBindingItem](_index_.md#listenerbindingitem) |

___

###  ListenerFunction

Ƭ **ListenerFunction**: *function*

Defined in index.ts:7

#### Type declaration:

▸ (`id`: string[], ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...arg` | any[] |

___

###  ListenerInstances

Ƭ **ListenerInstances**: *`Record<string, any>`*

Defined in index.ts:12

___

###  Listeners

Ƭ **Listeners**: *`Record<string, ListenerFunction>`*

Defined in index.ts:10

## Variables

### `Const` instance

• **instance**: *[Listener](../classes/_index_.listener.md)* =  new Listener()

Defined in index.ts:256

___

### `Const` listen

• **listen**: *any* =  instance.listen.bind(instance)

Defined in index.ts:258

___

### `Const` listener

• **listener**: *any* =  instance.listener.bind(instance)

Defined in index.ts:259

___

### `Const` listenerIdRegex

• **listenerIdRegex**: *`RegExp`* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:21

___

### `Const` reset

• **reset**: *any* =  instance.reset.bind(instance)

Defined in index.ts:260