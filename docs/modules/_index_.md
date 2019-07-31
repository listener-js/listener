> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](_index_.md) /

# External module: "index"

## Index

### Classes

* [Listener](../classes/_index_.listener.md)

### Type aliases

* [ListenerBindingsType](_index_.md#listenerbindingstype)
* [ListenerInstancesType](_index_.md#listenerinstancestype)
* [ListenerType](_index_.md#listenertype)
* [ListenersAnyType](_index_.md#listenersanytype)
* [ListenersType](_index_.md#listenerstype)

### Variables

* [instance](_index_.md#const-instance)
* [listen](_index_.md#const-listen)
* [listener](_index_.md#const-listener)
* [reset](_index_.md#const-reset)

## Type aliases

###  ListenerBindingsType

Ƭ **ListenerBindingsType**: *`Record<string, string[]>`*

Defined in index.ts:6

___

###  ListenerInstancesType

Ƭ **ListenerInstancesType**: *`Record<string, any>`*

Defined in index.ts:7

___

###  ListenerType

Ƭ **ListenerType**: *function*

Defined in index.ts:1

#### Type declaration:

▸ (`id`: string[], ...`arg`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`...arg` | any[] |

___

###  ListenersAnyType

Ƭ **ListenersAnyType**: *`Record<string, any[]>`*

Defined in index.ts:5

___

###  ListenersType

Ƭ **ListenersType**: *`Record<string, ListenerType[]>`*

Defined in index.ts:4

## Variables

### `Const` instance

• **instance**: *[Listener](../classes/_index_.listener.md)* =  new Listener()

Defined in index.ts:191

___

### `Const` listen

• **listen**: *any* =  instance.listen.bind(instance)

Defined in index.ts:193

___

### `Const` listener

• **listener**: *any* =  instance.listener.bind(instance)

Defined in index.ts:194

___

### `Const` reset

• **reset**: *any* =  instance.reset.bind(instance)

Defined in index.ts:195