> **[@listener-js/listener](README.md)**

[Globals](globals.md) /

# listener

Type-friendly awesome event emitter

![listener](media/listener.gif)

## Low-level goals

Prescribe a simple API for turning normal class instance functions into event listeners, with minimal changes to call or implementation.

Each listener receives an array of strings as its first argument. This array contains a listener id call stack from newest to oldest (e.g. `["callee.listener", "caller.listener"]`), in addition to any identifiers appended programmatically.

Listener class libraries never explicitly depend on each other outside of `devDependencies` for types.

## High-level goals

Leverage listener identifiers for enhanced logging, debugging, and programmatic context.

Make it easy for listeners to use each other's functionality, if present, without depending on it.

Create an ecosystem of libraries that empower the end user to listen to any event, modify its input or return value, swap one listener for another, and see coding in a different way.

## The ecosystem

- [Listener cli](https://github.com/listener-js/cli) calls listeners from the command line
- [Listener http](https://github.com/listener-js/http) makes universal http requests
- [Listener log](https://github.com/listener-js/log) adds listener logging with log levels and filtering
- [Listener store](https://github.com/listener-js/store) adds immutable identifier-based storage
- [Listener spawn](https://github.com/listener-js/spawn) executes shell commands using [node-pty](https://github.com/microsoft/node-pty)

## Install

```bash
npm install @listener-js/listener
```

## Define a listener class

Define a class with a listener function:

```ts
// hello.ts
//
export class Hello {
  public listeners = ["hello"]

  public hello(): string {
    return "hi"
  }
}

// As a convenience, also export an instance
export const hello = new Hello()
```

## Listener setup

Pass the listener class instance into the `listener` function to set it up:

```ts
import { listener } from "@listener-js/listener"
import { hello } from "./hello"

listener({ hello })
```

You only need to do this once, and any file that imports `hello` will have the extended version.

Passing listener class instances into the `listener` function should be the responsibility of the end-user, as it provides them control over the listener version and configuration options.

## Call a listener (with logging)

```ts
// sayHello.ts
//
import { listener } from "@listener-js/listener"
import { log } from "@listener-js/log"
import { hello } from "./hello"

listener({ hello, log })

hello.hello()
```

Execute the script with `LOG=debug`:

```bash
> LOG=debug ts-node ./sayHello.ts
>
> 🐛 hello.hello
```

## Identifier argument

The first argument to the listener is always an identifier argument (`string[]`). The rest can be whatever you like.

When you call a listener, its function id is added to the front of the identifier array:

```ts
export class Hello {
  public listeners = ["hello"]

  public hello(id: string[]): string {
    console.log(id) // ["hello.hello"]
    return "hi"
  }
}

export const hello = new Hello()
```

When listeners are connected or call each other, we pass the identifier down which gradually gets appended to as the call stack increases.

Feel free to pass an initial identifier array and/or programmatically append to the identifier array if it fits your use case.

## Connect listeners

Use the `listen` function to connect listeners:

```ts
import { listen } from "@listener-js/listener"
import { bye } from "./bye"
import { hello } from "./hello"

listener({ bye, hello })

listen(["hello.hello"], ["bye.bye"])

hello.hello() // Calls bye.bye after execution
```

The first argument to `listen` is the full identifier to match on, while the second argument is a list of individual identifiers to call once there is a match.

## Connect listeners by identifier

The `listen` function also accepts identifiers.

Let's listen to the exact identifier from the [previous examples](#identifier-argument):

```ts
import { listen } from "@listener-js/listener"
import { bye } from "./bye"
import { hello } from "./hello"

listener({ bye, hello })

listen(["hello.hello"], ["bye.bye"])
listen(["bye.bye", "hello.hello"], ["miss.you"])

hello.hello() // Calls hello.hello, then bye.bye, then miss.you
```

Technically the above example could also be achieved with a single `listen` call (e.g. `listen(["hello.hello"], ["bye.bye", "miss.you"])`)

## Listen callback

If a `listen` function is present on your listener class, it is called when your class instance is passed to the `listen` function:

```ts
import { Listener } from "@listener-js/listener"

export class Hello {
  public listeners = ["hello"]

  public listen(listener: Listener) {
    // Add listener connections, etc...
  }

  public hello(): string {
    return "hi"
  }
}

export const hello = new Hello()
```

If you were to make this class into a library, the `Listener` dependency should only be a soft `devDependency` for its types.

## Accessing other listeners

Using the `listen` callback, let's join our instance to other listeners:

```ts
import { Listener } from "@listener-js/listener"
import { bye } from "./bye"

export class Hello {
  public bye: typeof bye.bye = (): void => {}

  public listeners = ["hello"]

  public listen(listener: Listener) {
    listener.join(this, "bye.bye")
  }

  public hello(id: string[]): string {
    this.bye(id)
    return "hi"
  }
}

export const hello = new Hello()
```

First we import `Listener` and `bye` solely for their types (not a "hard" dependency).

When the `listen` callback fires, we assign the listener function to our class instance dynamically using the `listener.join` function.

We now have access to the `bye` listener function **without introducing any hard dependencies to it**.

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