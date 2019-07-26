> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](_index_.md) /

# External module: "index"

## Index

### Classes

* [Listener](../classes/_index_.listener.md)

### Type aliases

* [EventId](_index_.md#eventid)
* [ListenerBindingsType](_index_.md#listenerbindingstype)
* [ListenerType](_index_.md#listenertype)
* [ListenersType](_index_.md#listenerstype)

### Variables

* [instance](_index_.md#const-instance)
* [listen](_index_.md#const-listen)
* [listener](_index_.md#const-listener)
* [reset](_index_.md#const-reset)

## Type aliases

###  EventId

Ƭ **EventId**: *string | string | string[][]*

Defined in index.ts:4

___

###  ListenerBindingsType

Ƭ **ListenerBindingsType**: *`Record<string, string[]>`*

Defined in index.ts:12

___

###  ListenerType

Ƭ **ListenerType**: *function*

Defined in index.ts:8

#### Type declaration:

▸ (`id`: [EventId](_index_.md#eventid), ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | [EventId](_index_.md#eventid) |
`...arg` | any[] |

___

###  ListenersType

Ƭ **ListenersType**: *`Record<string, ListenerType[]>`*

Defined in index.ts:11

## Variables

### `Const` instance

• **instance**: *[Listener](../classes/_index_.listener.md)* =  new Listener()

Defined in index.ts:138

___

### `Const` listen

• **listen**: *any* =  instance.listen.bind(instance)

Defined in index.ts:140

___

### `Const` listener

• **listener**: *any* =  instance.listener.bind(instance)

Defined in index.ts:141

___

### `Const` reset

• **reset**: *any* =  instance.reset.bind(instance)

Defined in index.ts:142