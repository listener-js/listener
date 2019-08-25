# listener

Type-friendly awesome event emitter

![listener](media/listener.gif)

## Low-level goals

Prescribe a simple API for turning normal class instance functions into event listeners, with minimal changes to call or implementation.

Each listener receives an array of strings as its first argument. This array contains a listener id call stack from newest to oldest (e.g. `["callee.listener", "caller.listener"]`), in addition to any identifiers appended programmatically.

Listener class libraries never explicitly depend on each other outside of `devDependencies` for types.

## High-level goals

Leverage listener identifiers for enhanced logging, debugging, and programmatic context.

Make it easy for listener libraries to use each other's functionality, if present, without depending on it.

Create an ecosystem of libraries that empower the end user to listen to any event, modify its input or return value, swap one listener for another, and see coding in a different way.

## The ecosystem

- [Listener cli](https://github.com/listener-js/cli) calls listeners from the command line
- [Listener component](https://github.com/listener-js/component) builds lightweight JSX web components without virtualdom
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

You only need to do this once, and if the end-user imports `hello` later on, it will return the correct "extended version" of the listener instance.

Passing listener class instances into the `listener` function should be the responsibility of the end-user, as it provides them control over composition, versioning, and configuration.

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
import { listen, listener } from "@listener-js/listener"
import { bye } from "./bye"
import { hello } from "./hello"

listener({ bye, hello })

listen(["hello.hello"], ["bye.bye"])

hello.hello() // Calls hello.hello, then bye.bye
```

The first argument to `listen` is the full identifier to match on, while the second argument is a list of individual identifiers to call once there is a match:

```ts
import { listen, listener } from "@listener-js/listener"
import { bye } from "./bye"
import { hello } from "./hello"

listener({ bye, hello })

listen(["hello.hello"], ["bye.bye"])
listen(["bye.bye", "hello.hello"], ["miss.you"])

hello.hello() // Calls hello.hello, then bye.bye, then miss.you
```

Technically the above example could also be achieved with a single `listen` call:

```ts
listen(["hello.hello"], ["bye.bye", "miss.you"])
```

### Async scenarios

- `listen(["async.fn"], ["async.fn2"])` — calling `async.fn` returns a promise that waits for `async.fn2` before resolving, but returns the original output of `async.fn`.
- `listen(["sync.fn"], ["async.fn"])` — calling `sync.fn` returns its original output and runs `async.fn` "untethered".
- `listen(["async.fn"], ["sync.fn"])`, calling `async.fn` returns a promise that waits for all sync/async listeners.

## Accessing other listeners

Use the `instances` property to define listener instance accessors:

```ts
import { bye } from "./bye"

export class Hello {
  private bye: typeof bye.bye = (): void => {}

  public instances = ["bye.bye"]

  public listeners = ["hello"]

  public hello(id: string[]): string {
    this.bye(id)
    return "hi"
  }
}

export const hello = new Hello()
```

First we import `bye` solely for its types (not a "hard" dependency) and add `bye.bye` to the `instances` array.

Now, when the end-user calls `listen({ hello, bye })`, you can call `bye.bye` via `hello.bye`.

This pattern allows access to listener instances **without introducing any hard dependencies to it**, and leaves implementation control in the end-user's hands.

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

## Listener execution order

Listeners always run in succession, based on a sort index (prepend: -1, main: 0, append: 1). The default strategy is `{ append: 1 }` when no sort option is provided.

In some cases you might want to make sure your listener runs before all calls, or conversely make sure it runs last:

```ts
import { listen } from "@listener-js/listener"

listen(["**"], ["hello.hello"], { prepend: true }) // boolean
listen(["**"], ["hello.hello"], { prepend: 1000 }) // index

listen(["**"], ["bye.bye"], { append: true }) // boolean
listen(["**"], ["bye.bye"], { append: 1000 }) // index
```

The sort index defaults to `1` with a boolean (`true`) sort value. Using an integer value can be a way to ensure your listener absolutely runs first or last.

## Overwriting the return value

When defining a connection, the `return` option allows the connection to overwrite the return value:

```ts
listen(["**"], ["hello.hello"], { return: true })
```

The [last listener connection](#listener-execution-order) has precedence for overwriting return values.

With great power comes great responsibility. Make sure your return types match the original listener call.
