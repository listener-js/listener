[@listener-js/listener](../README.md) › [Globals](../globals.md) › ["constants"](_constants_.md)

# External module: "constants"

## Index

### Variables

* [ALPHABET](_constants_.md#const-alphabet)
* [ARROW](_constants_.md#const-arrow)
* [REGEX_COMMENT](_constants_.md#const-regex_comment)
* [REGEX_FN](_constants_.md#const-regex_fn)
* [REGEX_ID](_constants_.md#const-regex_id)

## Variables

### `Const` ALPHABET

• **ALPHABET**: *string[]* =  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
  ""
)

Defined in constants.ts:1

___

### `Const` ARROW

• **ARROW**: *" < "* = " < "

Defined in constants.ts:4

___

### `Const` REGEX_COMMENT

• **REGEX_COMMENT**: *RegExp* =  /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm

Defined in constants.ts:5

___

### `Const` REGEX_FN

• **REGEX_FN**: *RegExp* =  /^(\(|function \w*\()?\s*(lid_?)[\),\s]/

Defined in constants.ts:6

___

### `Const` REGEX_ID

• **REGEX_ID**: *RegExp* =  /(\*{1,2})|([^\.]+)\.(.+)/i

Defined in constants.ts:7
