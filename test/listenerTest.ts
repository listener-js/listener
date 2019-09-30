import { bind, instance, load, reset } from "../"
import log from "@listener-js/log"

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

test("defined", (): void => {
  expect(bind).not.toBeUndefined()
  expect(load).not.toBeUndefined()
})

test("load", (): void => {
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

test("load no arg", (): void => {
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

test("load bad arg", (): void => {
  load([], { hi: {} })
})

test("bind return", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn2", {
    return: true,
  })

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

test("bind", (): void => {
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

test("listenerBindings", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn", "MyClass.fn"])
    },
    listenerBindings: (
      lid: string[],
      instanceId: string
    ): any[] => [[["MyClass.fn"], `${instanceId}.fn`]],
  }

  load([], { Test })

  MyClass.fn([], true)
})

test("listenerBindings self", (): void => {
  expect.assertions(2)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn"])
    },
    fn2: (lid: string[]): void => {
      expect(lid).toEqual(["Test.fn2", "Test.fn"])
    },
    listenerBindings: (
      lid: string[],
      instanceId: string
    ): any[] => [
      [[`${instanceId}.fn`], `${instanceId}.fn2`],
    ],
  }

  load([], { Test })

  Test.fn([])
})

test("listenerBindings with listener.load", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual([
        "Test.fn",
        "listener.load",
        "listener.load",
      ])
    },
    listenerBindings: (
      lid: string[],
      instanceId: string
    ): any[] => [
      [["listener.load", "**"], `${instanceId}.fn`],
    ],
  }

  load([], { Test })
})

test("listenerBindings with listener.listenerLoaded", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (lid: string[]): void => {
      expect(lid).toEqual([
        "Test.fn",
        "listener.listenerLoaded",
        "Test",
        "listener.listenersLoaded",
        "listener.load",
      ])
    },
    listenerBindings: (
      lid: string[],
      instanceId: string
    ): any[] => [
      [
        ["listener.listenerLoaded", instanceId, "**"],
        `${instanceId}.fn`,
      ],
    ],
  }

  load([], { Test })
})

test("async listener", async (): Promise<void> => {
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

test("async bind return", async (): Promise<void> => {
  bind([], ["MyClass.asyncFn"], "MyClass2.asyncFn2", {
    return: true,
  })

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

test("async bind", async (): Promise<void> => {
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

test("async bind null return", async (): Promise<void> => {
  bind([], ["MyClass.asyncFn"], "MyClass2.asyncFn3", {
    return: true,
  })

  expect(await MyClass.asyncFn([], true)).toBe(null)
})

test("bind id", (): void => {
  bind([], ["MyClass.fn", "id"], "MyClass2.fn2", {
    return: true,
  })

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

test("bind *", (): void => {
  bind([], ["*"], "MyClass2.fn2", { return: true })

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

test("bind **", (): void => {
  bind([], ["**"], "MyClass2.fn2", { return: true })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })
})

test("bind * and id", (): void => {
  bind([], ["*", "id"], "MyClass2.fn2", {
    return: true,
  })

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

test("bind id and *", (): void => {
  bind([], ["MyClass.fn", "*"], "MyClass2.fn2", {
    return: true,
  })

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

test("bind ** and id", (): void => {
  bind([], ["**", "id2"], "MyClass2.fn2", {
    return: true,
  })

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

test("bind id and **", (): void => {
  bind([], ["MyClass.fn", "**"], "MyClass2.fn2", {
    return: true,
  })

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

test("prepend option", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn2")

  bind([], ["MyClass.fn"], "MyClass2.fn3", {
    prepend: true,
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn3: true,
    lid: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

test("prepend async to sync", async (): Promise<void> => {
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

  bind([], ["Test2.fn"], "Test.fn", { prepend: true })

  await Test2.fn([])

  expect(order).toEqual([1, 2, 3])
})

test("prepend async to async", async (): Promise<void> => {
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

  bind([], ["Test2.fn"], "Test.fn", { prepend: true })

  await Test2.fn([])

  expect(order).toEqual([1, 2, 3])
})

test("prepend async overwrite", async (): Promise<void> => {
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

  bind([], ["Test2.fn"], "Test.fn", {
    prepend: true,
    return: true,
  })

  expect(await Test2.fn([])).toBe(true)

  expect(order).toEqual([1, 2])
})

test("append option", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn3", {
    append: 2,
    return: true,
  })

  bind([], ["MyClass.fn"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn3: true,
    lid: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

test("numeric prepend option", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn2", {
    prepend: 1,
    return: true,
  })

  bind([], ["MyClass.fn"], "MyClass2.fn3", {
    prepend: 2,
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    lid: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })
})

test("numeric append option", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn3", {
    append: 2,
    return: true,
  })

  bind([], ["MyClass.fn"], "MyClass2.fn2", {
    append: 1,
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn3: true,
    lid: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

test("intercept", (): void => {
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
  bind([], ["test.test"], "test2.test", {
    intercept: true,
  })

  expect(test.test([], "hi")).toBe(false)
})

test("intercept cancel", (): void => {
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
  bind([], ["test.test"], "test2.test", {
    intercept: true,
  })

  expect(test.test([], "hi")).toBe(true)
})

test("peek", (): void => {
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
  bind([], ["test.test"], "test2.test", { peek: true })

  expect(test.test([], "hi")).toBe(true)
})

test("load return value", () => {
  const test = {}
  expect(load([], { test })).toBe(instance.instances)
})

test("promise instance", async () => {
  expect.assertions(1)
  const promise = delay(1)
  load([], { test: promise })
  await promise
  expect(instance.instances.test).toBe(promise)
})

test("promise instance overwrite", async () => {
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
