# listener

Type-safe event emitter with a simple & unobtrusive API

![listener](media/listener.gif)

## Goals

Easily turn existing class functions into event listeners.

Call listener functions like normal (and preserve original types).

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

Now a call to `MyClass.hello` also calls `MyClass.helloAgain`:

```ts
MyClass.hello([]) // "hi again"
```

Because the return value of `MyClass.helloAgain` is not falsey, it becomes the final return value.

## Identifier argument

The first argument to the listener is always an identifier argument (`string[]`).

When you call a listener, its function id is added to the front of the identifier array.

Using the [previous example](#connect-listeners), let's see what the identifier argument looks like:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    console.log(id) // ["MyClass.helloAgain", "MyClass.hello"]
    return "hi again"
  }
}
```

## Connect listeners by identifier

The `listen` function also accepts identifiers.

Let's listen to the exact identifier from the [previous examples](#identifier-argument):

```ts
import { listen } from "@listener-js/listener"

listen(
  ["MyClass.helloAgain", "MyClass.hello"],
  ["MyClass.helloAgainAndAgain"]
)
```

In this case, the listener connection only emits when `MyClass.hello` calls `MyClass.helloAgain`.

## Extend the identifier

In some cases you need to add additional context to the identifier, such as a record id.

Pass an initial identifier to the listener call:

```ts
MyClass.hello(["initialId"])
```

Now `initialId` is at the beginning of the `MyClass.helloAgain` identifier argument:

```ts
class MyClass {
  public static helloAgain(id: string[]): string {
    console.log(id) // ["MyClass.helloAgain", "MyClass.hello", "initialId"]
    return "hi again"
  }
}
```

If you manually call another listener, you should pass the current `id` down to it:

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
    OtherClass.otherListener(["customId", ...id])
    return "hi again"
  }
}
```

## Wildcard listeners

You may provide wildcard parameters to the [first argument of `listen`](#connect-listeners).

Wildcards may only appear at the beginning of the identifier array.

### Double asterisk (\*\*)

Double asterisks match identifiers recursively.

Use double asterisks to listen to **all listeners**:

```ts
import { listen } from "@listener-js/listener"

listen(["**"], ["MyClass.helloAgain"])
```

Or listen to **any event originating from `MyClass.hello`**:

```ts
import { listen } from "@listener-js/listener"

listen(["**", "MyClass.hello"], ["MyClass.helloAgain"])
```

### Single asterisk (\*)

A single asterisk matches identifiers only one level deep.

The following listens to **any listener call with no identifiers**:

```ts
import { listen } from "@listener-js/listener"

listen(["*"], ["MyClass.helloAgain"])
```

And this listens to **any event directly called by or connected to `MyClass.hello`**:

```ts
import { listen } from "@listener-js/listener"

listen(["*", "MyClass.hello"], ["MyClass.helloAgain"])
```
