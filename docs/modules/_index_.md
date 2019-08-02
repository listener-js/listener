> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](_index_.md) /

# External module: "index"

## Index

### Classes

* [Listener](../classes/_index_.listener.md)

### Type aliases

* [ListenerBindings](_index_.md#listenerbindings)
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

###  ListenerBindings

Ƭ **ListenerBindings**: *`Record<string, string[]>`*

Defined in index.ts:5

___

###  ListenerFunction

Ƭ **ListenerFunction**: *function*

Defined in index.ts:1

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

Defined in index.ts:6

___

###  Listeners

Ƭ **Listeners**: *`Record<string, ListenerFunction>`*

Defined in index.ts:4

## Variables

### `Const` instance

• **instance**: *[Listener](../classes/_index_.listener.md)* =  new Listener()

Defined in index.ts:208

___

### `Const` listen

• **listen**: *any* =  instance.listen.bind(instance)

Defined in index.ts:210

___

### `Const` listener

• **listener**: *any* =  instance.listener.bind(instance)

Defined in index.ts:211

___

### `Const` listenerIdRegex

• **listenerIdRegex**: *`RegExp`* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in index.ts:8

___

### `Const` reset

• **reset**: *any* =  instance.reset.bind(instance)

Defined in index.ts:212