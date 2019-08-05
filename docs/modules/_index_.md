> **[@listener-js/listener](../README.md)**

[Globals](../globals.md) / ["index"](_index_.md) /

# External module: "index"

## Index

### Classes

* [Listener](../classes/_index_.listener.md)

### Type aliases

* [logEvent](_index_.md#logevent)

### Variables

* [instance](_index_.md#const-instance)
* [listen](_index_.md#const-listen)
* [listener](_index_.md#const-listener)
* [listenerIdRegex](_index_.md#const-listeneridregex)
* [reset](_index_.md#const-reset)

### Functions

* [log](_index_.md#let-log)

## Type aliases

###  logEvent

Ƭ **logEvent**: *function*

*Defined in [index.ts:12](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L12)*

#### Type declaration:

▸ (`id`: string[], `level`: string, ...`value`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string[] |
`level` | string |
`...value` | any[] |

## Variables

### `Const` instance

• **instance**: *[Listener](../classes/_index_.listener.md)* =  new Listener()

*Defined in [index.ts:294](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L294)*

___

### `Const` listen

• **listen**: *any* =  instance.listen.bind(instance)

*Defined in [index.ts:296](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L296)*

___

### `Const` listener

• **listener**: *any* =  instance.listener.bind(instance)

*Defined in [index.ts:297](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L297)*

___

### `Const` listenerIdRegex

• **listenerIdRegex**: *`RegExp`* =  /(\*{1,2})|([^\.]+)\.(.+)/i

*Defined in [index.ts:10](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L10)*

___

### `Const` reset

• **reset**: *any* =  instance.reset.bind(instance)

*Defined in [index.ts:298](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L298)*

## Functions

### `Let` log

▸ **log**(): *void*

*Defined in [index.ts:15](https://github.com/listener-js/listener/blob/34983e2/src/index.ts#L15)*

**Returns:** *void*