> **[@listener-js/listener](README.md)**

[Globals](globals.md) /

# listener

Type-safe event emitter with a simple & unobtrusive API

![listener](media/listener.gif)

## Goal

Design an event emitter that can turn existing class functions into event listeners.

Call listener class functions in the same way (with the same types).

Make it easy to attach listener functions to each other.

Incorporate an ID system that makes it easy to get a glimpse of the event's call stack.

## Install

```bash
npm install @listener-js/listener
```

## Class API

Listener classes have a `listeners` array that describes which functions are listener functions:

```js
class MyClass {
  public static listeners = ["hello", "helloAgain"]

  public static hello(id: string[]): boolean {
    return "hi"
  }

  public static helloAgain(id: string[]): boolean {
    return "hi again"
  }
}
```

The listener function takes any number of arguments, but the first argument is always a `string[]` id.

Listener functions return whatever they like and are **synchronous or asynchronous**.

## Make it a listener

Mutate the class using the `listener` function before using it:

```js
import { listener } from "@listener-js/listener"
listener({ MyClass })
```

## Call the listener

```js
MyClass.hello([]) // "hi"
```

## Connect listeners

Use the `listen` function to connect listeners:

```js
import { listen } from "@listener-js/listener"
listen(["MyClass.hello"], ["MyClass.helloAgain"])
```

Now every time you call `MyClass.hello`, `MyClass.helloAgain` is also called:

```js
MyClass.hello([]) // "hi again"
```

Since `MyClass.helloAgain` returns a value, that is the end value that is returned.

## ID argument

The first argument to the listener is always an ID argument (`string[]`). The id allows you to easily get a glimpse of the call stack (especially useful when logging) and also acts as a unique ID that describes the code that created it.

When you call a listener, its name is pushed onto the `id` array. In the [above example](#connect-listeners), the `id` argument for the `MyClass.helloAgain` function would look like:

```js
;["MyClass.hello", "MyClass.helloAgain"]
```

If you called `MyClass.hello(["initialId"])`, the `id` argument for the `MyClass.helloAgain` function would look like:

```js
;["initialId", "MyClass.hello", "MyClass.helloAgain"]
```

ID passing is handled automatically for ["connected" listeners](#connect-listeners). If you manually call another listener within a listener function, you should pass the current `id` down to it.