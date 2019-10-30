import expect from "expect"
import log from "@listener-js/log"

import {
  bind,
  instance,
  load,
  reset,
  ListenerEvent,
} from "../src"

function delay(t: number, v?: any): Promise<any> {
  return new Promise((resolve): void => {
    setTimeout(resolve.bind(null, v), t)
  })
}

class MyClass {
  public static fn(
    lid: string[],
    someArg: boolean
  ): object {
    return { fn: true, lid, someArg }
  }

  public static async asyncFn(
    lid: string[],
    someArg: boolean
  ): Promise<object> {
    return delay(2, { asyncFn: true, lid, someArg })
  }
}

class MyClass2 {
  public static fn2(
    lid: string[],
    someArg: boolean
  ): object {
    return { fn2: true, lid, someArg }
  }

  public static fn3(
    lid: string[],
    someArg: boolean
  ): object {
    return { fn3: true, lid, someArg }
  }

  public static async asyncFn2(
    lid: string[],
    someArg: boolean
  ): Promise<object> {
    return delay(1, { asyncFn2: true, lid, someArg })
  }

  public static async asyncFn3(
    lid: string[]
  ): Promise<null> {
    return null
  }
}

beforeEach((): void => {
  reset([])
  load([], { MyClass, MyClass2, log })
})

it("defined", (): void => {
  expect(bind).not.toBeUndefined()
  expect(load).not.toBeUndefined()
})

it("load", (): void => {
  expect(MyClass.fn(["id"], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass2.fn2(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "id"],
    someArg: true,
  })
})

it("load no arg", (): void => {
  expect.assertions(2)

  const test = {
    fn: (lid: string[]): number => {
      expect(lid).toEqual(["test.fn"])
      return 1
    },
  }

  load([], { test })
  expect(test.fn([])).toBe(1)
})

it("lid uid", (): void => {
  expect.assertions(1)

  const test = {
    fn: (lid_: string[]): void => {
      expect(lid_).toEqual(["test.fn", "c"])
    },
  }

  load([], { test })
  test.fn([])
})

it("load bad arg", (): void => {
  load([], { hi: {} })
})

it("bind return", (): void => {
  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn2", { return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })

  expect(MyClass2.fn2(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "id"],
    someArg: true,
  })
})

it("bind", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "MyClass.fn"])
    },
  }

  load([], { Test })
  bind([], ["MyClass.fn"], "Test.fn")

  MyClass.fn([], true)
})

it("bind with custom id", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "hi", "MyClass.fn"])
    },
  }

  load([], { Test })
  bind([], ["MyClass.fn"], ["Test.fn", "hi"])

  MyClass.fn([], true)
})

it("bind with once", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "MyClass.fn"])
    },
  }

  load([], { Test })
  bind([], ["MyClass.fn"], ["Test.fn", { once: true }])

  MyClass.fn([], true)
  MyClass.fn([], true)
})

it("listenerBeforeLoaded bind", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "MyClass.fn"])
    },
    listenerBeforeLoaded: (
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void => {
      listener.bind(
        lid,
        ["MyClass.fn"],
        `${instance.id}.fn`
      )
    },
  }

  load([], { Test })

  MyClass.fn([], true)
})

it("listenerLoaded bind", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "MyClass.fn"])
    },
    listenerLoaded: (
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void => {
      listener.bind(
        lid,
        ["MyClass.fn"],
        `${instance.id}.fn`
      )
    },
  }

  load([], { Test })

  MyClass.fn([], true)
})

it("listenerLoaded bind self", (): void => {
  expect.assertions(2)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn"])
    },
    fn2: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn2", "Test.fn"])
    },
    listenerLoaded: (
      lid: string[],
      { instance, listener }: ListenerEvent
    ): void =>
      listener.bind(
        lid,
        [`${instance.id}.fn`],
        `${instance.id}.fn2`
      ),
  }

  load([], { Test })

  Test.fn([])
})

it("listenerLoaded existing", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "MyClass.fn"])
    },
    listenerLoaded: (
      lid: string[],
      { existing }: ListenerEvent
    ): void => {
      expect(existing).toEqual([
        "listener",
        "MyClass",
        "MyClass2",
        "log",
      ])
    },
  }

  load([], { Test })

  MyClass.fn([], true)
})

it("async listener", async (): Promise<void> => {
  expect(await MyClass.asyncFn(["id"], true)).toEqual({
    asyncFn: true,
    lid: ["MyClass.asyncFn", "id"],
    someArg: true,
  })

  expect(await MyClass2.asyncFn2(["id"], true)).toEqual({
    asyncFn2: true,
    lid: ["MyClass2.asyncFn2", "id"],
    someArg: true,
  })
})

it("async bind return", async (): Promise<void> => {
  bind(
    [],
    ["MyClass.asyncFn"],
    ["MyClass2.asyncFn2", { return: true }]
  )

  expect(await MyClass.asyncFn([], true)).toEqual({
    asyncFn2: true,
    lid: ["MyClass2.asyncFn2", "MyClass.asyncFn"],
    someArg: true,
  })

  expect(await MyClass2.asyncFn2(["id"], true)).toEqual({
    asyncFn2: true,
    lid: ["MyClass2.asyncFn2", "id"],
    someArg: true,
  })
})

it("async bind", async (): Promise<void> => {
  expect.assertions(1)

  const Test = {
    fn: async (lid: string[]): Promise<void> => {
      await delay(1)
      expect(lid).toEqual(["Test.fn", "MyClass.asyncFn"])
    },
  }

  load([], { Test })
  bind([], ["MyClass.asyncFn"], "Test.fn")

  await MyClass.asyncFn([], true)
})

it("async bind null return", async (): Promise<void> => {
  bind(
    [],
    ["MyClass.asyncFn"],
    ["MyClass2.asyncFn3", { return: true }]
  )

  expect(await MyClass.asyncFn([], true)).toBe(null)
})

it("bind id", (): void => {
  bind(
    [],
    ["MyClass.fn", "id"],
    ["MyClass2.fn2", { return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

it("bind *", (): void => {
  bind([], ["*"], ["MyClass2.fn2", { return: true }])

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn", "id"],
    someArg: true,
  })
})

it("bind **", (): void => {
  bind([], ["**"], ["MyClass2.fn2", { return: true }])

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })
})

it("bind * and id", (): void => {
  bind([], ["*", "id"], ["MyClass2.fn2", { return: true }])

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

it("bind id and *", (): void => {
  bind(
    [],
    ["MyClass.fn", "*"],
    ["MyClass2.fn2", { return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

it("bind ** and id", (): void => {
  bind(
    [],
    ["**", "id2"],
    ["MyClass2.fn2", { return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id", "id2"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2", "id3"], true)).toEqual({
    fn: true,
    lid: ["MyClass.fn", "id", "id2", "id3"],
    someArg: true,
  })
})

it("bind id and **", (): void => {
  bind(
    [],
    ["MyClass.fn", "**"],
    ["MyClass2.fn2", { return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

it("prepend option", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn2")

  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn3", { prepend: true, return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn3: true,
    lid: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

it("prepend async to sync", async (): Promise<void> => {
  expect.assertions(3)

  const order = []

  const Test = {
    fn: async (lid: string[]): Promise<void> => {
      order.push(1)
      expect(lid).toEqual(["Test.fn", "Test2.fn"])
      await delay(1)
      order.push(2)
    },
  }

  const Test2 = {
    fn: (lid: string[]): Promise<void> | void => {
      expect(lid).toEqual(["Test2.fn"])
      order.push(3)
    },
  }

  load([], { Test, Test2 })

  bind([], ["Test2.fn"], ["Test.fn", { prepend: true }])

  await Test2.fn([])

  expect(order).toEqual([1, 2, 3])
})

it("prepend async to async", async (): Promise<void> => {
  expect.assertions(3)

  const order = []

  const Test = {
    fn: async (lid: string[]): Promise<void> => {
      order.push(1)
      expect(lid).toEqual(["Test.fn", "Test2.fn"])
      await delay(1)
      order.push(2)
    },
  }

  const Test2 = {
    fn: async (lid: string[]): Promise<void> => {
      expect(lid).toEqual(["Test2.fn"])
      order.push(3)
    },
  }

  load([], { Test, Test2 })

  bind([], ["Test2.fn"], ["Test.fn", { prepend: true }])

  await Test2.fn([])

  expect(order).toEqual([1, 2, 3])
})

it("prepend async overwrite", async (): Promise<void> => {
  expect.assertions(3)

  const order = []

  const Test = {
    fn: async (lid: string[]): Promise<boolean> => {
      order.push(1)
      expect(lid).toEqual(["Test.fn", "Test2.fn"])
      await delay(1)
      order.push(2)
      return true
    },
  }

  const Test2 = {
    fn: async (lid: string[]): Promise<void | boolean> => {
      expect(lid).toEqual(["Test2.fn"])
      order.push(3)
    },
  }

  load([], { Test, Test2 })

  bind(
    [],
    ["Test2.fn"],
    ["Test.fn", { prepend: true, return: true }]
  )

  expect(await Test2.fn([])).toBe(true)

  expect(order).toEqual([1, 2])
})

it("append option", (): void => {
  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn3", { append: 2, return: true }]
  )

  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn2", { return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn3: true,
    lid: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

it("numeric prepend option", (): void => {
  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn2", { prepend: 1, return: true }]
  )

  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn3", { prepend: 2, return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })
})

it("numeric append option", (): void => {
  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn3", { append: 2, return: true }]
  )

  bind(
    [],
    ["MyClass.fn"],
    ["MyClass2.fn2", { append: 1, return: true }]
  )

  expect(MyClass.fn([], true)).toEqual({
    fn3: true,
    lid: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

it("intercept", (): void => {
  expect.assertions(6)

  class Test {
    public listeners = ["test"]

    public test(lid: string[], arg: string): boolean {
      expect(lid).toEqual(["test.test"])
      expect(arg).toBe("hi")
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      lid: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(lid).toEqual(["test2.test", "test.test"])
      expect(value).toBe(true)
      expect(arg).toBe("hi")
      return false
    }
  }

  const test2 = new Test2()

  load([], { test, test2 })
  bind(
    [],
    ["test.test"],
    ["test2.test", { intercept: true }]
  )

  expect(test.test([], "hi")).toBe(false)
})

it("async intercept", async (): Promise<any> => {
  expect.assertions(2)

  class Test {
    public listeners = ["test"]

    public test(
      lid: string[],
      arg: string
    ): Promise<boolean> {
      return delay(1, true)
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      lid: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(value).toBe(true)
      return false
    }
  }

  const test2 = new Test2()

  load([], { test, test2 })
  bind(
    [],
    ["test.test"],
    ["test2.test", { intercept: true }]
  )

  return test
    .test([], "hi")
    .then(out => expect(out).toBe(false))
})

it("intercept cancel", (): void => {
  expect.assertions(6)

  class Test {
    public listeners = ["test"]

    public test(lid: string[], arg: string): boolean {
      expect(lid).toEqual(["test.test"])
      expect(arg).toBe("hi")
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      lid: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(lid).toEqual(["test2.test", "test.test"])
      expect(value).toBe(true)
      expect(arg).toBe("hi")
      return
    }
  }

  const test2 = new Test2()

  load([], { test, test2 })
  bind(
    [],
    ["test.test"],
    ["test2.test", { intercept: true }]
  )

  expect(test.test([], "hi")).toBe(true)
})

it("peek", (): void => {
  expect.assertions(6)

  class Test {
    public listeners = ["test"]

    public test(lid: string[], arg: string): boolean {
      expect(lid).toEqual(["test.test"])
      expect(arg).toBe("hi")
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      lid: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(lid).toEqual(["test2.test", "test.test"])
      expect(value).toBe(true)
      expect(arg).toBe("hi")
      return false
    }
  }

  const test2 = new Test2()

  load([], { test, test2 })
  bind([], ["test.test"], ["test2.test", { peek: true }])

  expect(test.test([], "hi")).toBe(true)
})

it("load return value", () => {
  const test = {}
  expect(load([], { test })).toBe(instance.instances)
})

it("promise instance", async () => {
  expect.assertions(1)
  const promise = load([], { test: delay(1) })
  expect(instance.pending.b.length).toBe(1)
  await promise
  expect(instance.instances.test).toBeUndefined()
  expect(instance.pending.b).toBeUndefined()
})

it("promise instance overwrite", async () => {
  expect.assertions(1)
  const promise = delay(1)
  const test = {
    fn: (lid): void => {
      expect(lid).toEqual(["test.fn"])
    },
  }
  load([], { test: promise })
  load([], { test })
  test.fn([])
})
