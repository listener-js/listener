import { bind, instance, Listener, load, reset } from "../"

// import { log } from "@listener-js/log"

function delay(t: number, v?: any): Promise<any> {
  return new Promise((resolve): void => {
    setTimeout(resolve.bind(null, v), t)
  })
}

class MyClass {
  public static listeners = ["fn", "asyncFn"]
  public static listener: Listener
  public static instanceId: string

  public static fn(id: string[], someArg: boolean): object {
    return { fn: true, id, someArg }
  }

  public static async asyncFn(
    id: string[],
    someArg: boolean
  ): Promise<object> {
    return delay(2, { asyncFn: true, id, someArg })
  }
}

class MyClass2 {
  public static listeners = [
    "fn2",
    "fn3",
    "asyncFn2",
    "asyncFn3",
  ]

  public static fn2(
    id: string[],
    someArg: boolean
  ): object {
    return { fn2: true, id, someArg }
  }

  public static fn3(
    id: string[],
    someArg: boolean
  ): object {
    return { fn3: true, id, someArg }
  }

  public static async asyncFn2(
    id: string[],
    someArg: boolean
  ): Promise<object> {
    return delay(1, { asyncFn2: true, id, someArg })
  }

  public static async asyncFn3(): Promise<null> {
    return null
  }
}

beforeEach((): void => {
  reset([])
  // load([], { log })
  load([], { MyClass, MyClass2 })
})

test("defined", (): void => {
  expect(bind).not.toBeUndefined()
  expect(load).not.toBeUndefined()
})

test("listener", (): void => {
  expect(MyClass.fn(["id"], true)).toEqual({
    fn: true,
    id: ["MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass2.fn2(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "id"],
    someArg: true,
  })
})

test("listener no arg", (): void => {
  expect.assertions(2)

  const test = {
    fn: (): number => {
      expect(1).toBe(1)
      return 1
    },
    listeners: ["fn"],
  }

  load([], { test })
  expect(test.fn()).toBe(1)
})

test("listener bad arg", (): void => {
  load([], { hi: {} })
})

test("listen return", (): void => {
  bind([], ["MyClass.fn"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })

  expect(MyClass2.fn2(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "id"],
    someArg: true,
  })
})

test("listen", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (): void => {
      expect(1).toBe(1)
    },
    listeners: ["fn"],
  }

  load([], { Test })
  bind([], ["MyClass.fn"], "Test.fn")

  MyClass.fn([], true)
})

test("async listener", async (): Promise<void> => {
  expect(await MyClass.asyncFn(["id"], true)).toEqual({
    asyncFn: true,
    id: ["MyClass.asyncFn", "id"],
    someArg: true,
  })

  expect(await MyClass2.asyncFn2(["id"], true)).toEqual({
    asyncFn2: true,
    id: ["MyClass2.asyncFn2", "id"],
    someArg: true,
  })
})

test("async listen return", async (): Promise<void> => {
  bind([], ["MyClass.asyncFn"], "MyClass2.asyncFn2", {
    return: true,
  })

  expect(await MyClass.asyncFn([], true)).toEqual({
    asyncFn2: true,
    id: ["MyClass2.asyncFn2", "MyClass.asyncFn"],
    someArg: true,
  })

  expect(await MyClass2.asyncFn2(["id"], true)).toEqual({
    asyncFn2: true,
    id: ["MyClass2.asyncFn2", "id"],
    someArg: true,
  })
})

test("async listen", async (): Promise<void> => {
  expect.assertions(1)

  const Test = {
    fn: async (): Promise<void> => {
      await delay(1)
      expect(1).toBe(1)
    },
    listeners: ["fn"],
  }

  load([], { Test })
  bind([], ["MyClass.asyncFn"], "Test.fn")

  await MyClass.asyncFn([], true)
})

test("async listen null return", async (): Promise<
  void
> => {
  bind([], ["MyClass.asyncFn"], "MyClass2.asyncFn3", {
    return: true,
  })

  expect(await MyClass.asyncFn([], true)).toBe(null)
})

test("listen id", (): void => {
  bind([], ["MyClass.fn", "id"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    id: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn: true,
    id: ["MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

test("listen *", (): void => {
  bind([], ["*"], "MyClass2.fn2", { return: true })

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn: true,
    id: ["MyClass.fn", "id"],
    someArg: true,
  })
})

test("listen **", (): void => {
  bind([], ["**"], "MyClass2.fn2", { return: true })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })
})

test("listen * and id", (): void => {
  bind([], ["*", "id"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    id: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn: true,
    id: ["MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

test("listen id and *", (): void => {
  bind([], ["MyClass.fn", "*"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    id: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn: true,
    id: ["MyClass.fn", "id", "id2"],
    someArg: true,
  })
})

test("listen ** and id", (): void => {
  bind([], ["**", "id2"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn: true,
    id: ["MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id", "id2"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2", "id3"], true)).toEqual({
    fn: true,
    id: ["MyClass.fn", "id", "id2", "id3"],
    someArg: true,
  })
})

test("listen id and **", (): void => {
  bind([], ["MyClass.fn", "**"], "MyClass2.fn2", {
    return: true,
  })

  expect(MyClass.fn([], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn"],
    someArg: true,
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id"],
    someArg: true,
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    fn2: true,
    id: ["MyClass2.fn2", "MyClass.fn", "id", "id2"],
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
    id: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

test("prepend async to sync", async (): Promise<void> => {
  expect.assertions(3)

  const order = []

  const Test = {
    fn: async (id: string[]): Promise<void> => {
      order.push(1)
      expect(id).toEqual(["Test.fn", "Test2.fn"])
      await delay(1)
      order.push(2)
    },
    listeners: ["fn"],
  }

  const Test2 = {
    fn: (id: string[]): Promise<void> | void => {
      expect(id).toEqual(["Test2.fn"])
      order.push(3)
    },
    listeners: ["fn"],
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
    fn: async (id: string[]): Promise<void> => {
      order.push(1)
      expect(id).toEqual(["Test.fn", "Test2.fn"])
      await delay(1)
      order.push(2)
    },
    listeners: ["fn"],
  }

  const Test2 = {
    fn: async (id: string[]): Promise<void> => {
      expect(id).toEqual(["Test2.fn"])
      order.push(3)
    },
    listeners: ["fn"],
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
    fn: async (id: string[]): Promise<boolean> => {
      order.push(1)
      expect(id).toEqual(["Test.fn", "Test2.fn"])
      await delay(1)
      order.push(2)
      return true
    },
    listeners: ["fn"],
  }

  const Test2 = {
    fn: async (id: string[]): Promise<void | boolean> => {
      expect(id).toEqual(["Test2.fn"])
      order.push(3)
    },
    listeners: ["fn"],
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
    id: ["MyClass2.fn3", "MyClass.fn"],
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
    id: ["MyClass2.fn2", "MyClass.fn"],
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
    id: ["MyClass2.fn3", "MyClass.fn"],
    someArg: true,
  })
})

test("intercept", (): void => {
  expect.assertions(6)

  class Test {
    public listeners = ["test"]

    public test(id: string[], arg: string): boolean {
      expect(id).toEqual(["test.test"])
      expect(arg).toBe("hi")
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      id: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(id).toEqual(["test2.test", "test.test"])
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

    public test(id: string[], arg: string): boolean {
      expect(id).toEqual(["test.test"])
      expect(arg).toBe("hi")
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      id: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(id).toEqual(["test2.test", "test.test"])
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

    public test(id: string[], arg: string): boolean {
      expect(id).toEqual(["test.test"])
      expect(arg).toBe("hi")
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(
      id: string[],
      value: boolean,
      arg: string
    ): boolean {
      expect(id).toEqual(["test2.test", "test.test"])
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

test("async return value", async (): Promise<any> => {
  expect.assertions(1)

  const test = {}

  return load([], { test }).then(instances =>
    expect(instances).toBe(instance.instances)
  )
})

test("async listenerLoad callback", async (): Promise<
  any
> => {
  expect.assertions(1)

  const test = {
    listenerLoad: async (id: string[]): Promise<any> => {
      return delay(1).then((): void => {
        expect(id).toEqual([
          "test.listenerLoad",
          "listener.listenerLoad",
          "listener.load",
        ])
      })
    },
  }

  return load([], { test })
})
