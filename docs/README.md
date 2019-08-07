> **[@listener-js/listener](README.md)**

[Globals](globals.md) /

# listener

Type-friendly awesome event emitter

![listener](media/listener.gif)

## Goals

Turn existing class functions into event listeners with minimal changes.

No extra type definitions outside of usual function definitions.

Extra "boilerplate" functions only necessary on setup, not during usage.

Provide a listener identifier based on the call stack (for debugging and programmatic context).

## The ecosystem

- [Listener cli](https://github.com/listener-js/cli) emits events from the command line
- [Listener http](https://github.com/listener-js/http) makes http requests on client or server
- [Listener log](https://github.com/listener-js/log) adds event logging with log levels and filtering
- [Listener store](https://github.com/listener-js/store) adds immutable identifier-based storage
- [Listener spawn](https://github.com/listener-js/spawn) executes shell commands using [node-pty](https://github.com/microsoft/node-pty)

## Install

```bash
npm install @listener-js/listener
```

## Define a listener class

Define a class with a listener function:

```ts
export class Hello {
  public listeners = ["hello"]

  public hello(): string {
    return "hi"
  }
}

// As a convenience, also export an instance
export const hello = new Hello()
```

## Add listener functionality

```ts
import { listener } from "@listener-js/listener"
import { hello } from "./hello"

listener({ hello })
```

## Call the listener

```ts
import { hello } from "./hello"
hello.hello() // "hi"
```

## Add logging

```ts
import { listener } from "@listener-js/listener"
import { log } from "@listener-js/log"
import { hello } from "./hello"

listener({ hello, log })
```

## Connect listeners

Use the `listen` function to connect listeners:

```ts
import { listen } from "@listener-js/listener"
import { bye } from "./bye"
import { hello } from "./hello"

listener({ bye, hello })

listen(["hello.hello"], ["bye.bye"])
```

Now a call to `hello.hello` also calls `bye.bye` (if it exists).

## Identifier argument

The first argument to the listener is always an identifier argument (`string[]`).

When you call a listener, its function id is added to the front of the identifier array.

Using the [previous example](#connect-listeners), let's see what the identifier argument looks like:

```ts
class Bye {
  public static bye(id: string[]): string {
    console.log(id) // ["bye.bye", "hello.hello"]
    return "bye"
  }
}
```

## Connect listeners by identifier

The `listen` function also accepts identifiers.

Let's listen to the exact identifier from the [previous examples](#identifier-argument):

```ts
import { listen } from "@listener-js/listener"

listen(["bye.bye", "hello.hello"], ["miss.you"])
```

In this case, the listener `miss.you` is only called when `bye.bye` receives `["hello.hello"]` as its identifier.

## Extend the identifier

In some cases you need to add additional context to the identifier, such as a record id.

Pass an initial identifier to the listener call:

```ts
hello.hello(["knock.kock"])
```

Now `initialId` is at the beginning of the `bye.bye` identifier argument:

```ts
class Bye {
  public bye(id: string[]): string {
    console.log(id) // ["bye.bye", "hello.hello", "knock.kock"]
    return "bye"
  }
}
```

If you manually call another listener, you should pass the current `id` down to it:

```ts
import { miss } from "./miss"

class Bye {
  public bye(id: string[]): string {
    miss.you(id)
    return "bye"
  }
}
```

This also introduces an opportunity to extend the identifier mid-flight:

```ts
import { miss } from "./miss"

class Bye {
  public bye(id: string[]): string {
    miss.you(["travel:Antarctica", ...id])
    return "bye"
  }
}
```

## Wildcard listeners

You may provide wildcard parameters to the [first argument of `listen`](#connect-listeners).

Wildcards may only appear at the beginning or end of the identifier array.

A single asterisk matches only the first or last identifier. Double asterisks match recursively.

```ts
import { listen } from "@listener-js/listener"

listen(["**"], ["bye.bye"]) // match all listeners
listen(["*"], ["bye.bye"])
listen(["**", "hello.hello"], ["bye.bye"])
listen(["*", "hello.hello"], ["bye.bye"])
listen(["hello.hello", "**"], ["bye.bye"])
listen(["hello.hello", "*"], ["bye.bye"])
```