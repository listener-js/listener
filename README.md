# listener

Type-safe event emitter with a simple & unobtrusive API

![listener](media/listener.gif)

## Goal

Design an event emitter that can turn existing class functions into event listeners.

Call listener class functions in the same way (with the same types).

Make it easy to connect listener functions to each other.

Incorporate a readable identifier system for programmatic context and debugging.

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

The first argument to the listener is always an identifier argument (`string[]`).

The identifier adds programmatic context to all listeners. The most immediate way you'll see its usefulness is around logging and debugging.

When you call a listener, its name is pushed onto the identifier array. In the [above example](#connect-listeners), the identifier argument for the `MyClass.helloAgain` function would look like:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    console.log(id) // ["MyClass.hello", "MyClass.helloAgain"]
    return "hi again"
  }
}
```

As you can see, the last element of the identifier array contains the function identifier of the current function, preceeded by the identifier of the function that called it, and so on.

## Extend the identifier

Sometimes you need to add some additional context to the identifier, such as a record id, if you want to attach listeners to changes on specific records.

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

This also introduces an opportunity to extend the identifier mid-flight:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    OtherClass.otherListener([...id, "customId"])
    return "hi again"
  }
}
```
