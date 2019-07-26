# listener

Type-safe event emitter with a simple & unobtrusive API

![listener](media/listener.gif)

## Goal

Design an event emitter that can turn existing class functions into event listeners.

Call listener class functions in the same way (with the same types).

Make it easy to connect listener functions to each other.

Incorporate an identifier system that makes it easy to get a glimpse of the event's call stack.

## Install

```bash
npm install @listener-js/listener
```

## Class API

Listener classes have a `listeners` array that describes which functions are listener functions:

```ts
class MyClass {
  public static listeners = ["hello", "helloAgain"]

  public static hello(id: string[]): string {
    return "hi"
  }

  public static helloAgain(id: string[]): string {
    return "hi again"
  }
}
```

The listener function takes any number of arguments, but the first argument is always a `string[]` [identifier](#identifier-argument).

Listener functions return whatever they like and are **synchronous or asynchronous**.

## Make it a listener

Mutate the class using the `listener` function before using it:

```ts
import { listener } from "@listener-js/listener"

listener({ MyClass })
```

## Call the listener

```ts
MyClass.hello([]) // "hi"
```

## Connect listeners

Use the `listen` function to connect listeners:

```ts
import { listen } from "@listener-js/listener"

listen(["MyClass.hello"], ["MyClass.helloAgain"])
```

Now every time you call `MyClass.hello`, `MyClass.helloAgain` is also called:

```ts
MyClass.hello([]) // "hi again"
```

Because the return value of `MyClass.helloAgain` is not falsey, it becomes the final return value.

## Identifier argument

The first argument to the listener is always an identifier argument (`string[]`). The identifier allows you to get a glimpse of the call stack, but can be useful in other contexts.

When you call a listener, its name is pushed onto the identifier array. In the [above example](#connect-listeners), the identifier argument for the `MyClass.helloAgain` function would look like:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    console.log(id) // ["MyClass.hello", "MyClass.helloAgain"]
    return "hi again"
  }
}
```

## Extend the identifier

If you pass an initial identifier to the listener call (e.g. `MyClass.hello(["initialId"])`), the identifier argument for the `MyClass.helloAgain` function would look like:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    console.log(id) // ["initialId", "MyClass.hello", "MyClass.helloAgain"]
    return "hi again"
  }
}
```

Identifier passing is handled automatically for ["connected" listeners](#connect-listeners). If you manually call another listener within a listener function, you should pass the current `id` down to it:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    OtherClass.otherListener(id)
    return "hi again"
  }
}
```

This also introduces an opportunity to extend the identifier:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    OtherClass.otherListener([...id, "customId"])
    return "hi again"
  }
}
```
