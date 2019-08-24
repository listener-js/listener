import { listener, listen, reset } from "../"
import { log } from "@listener-js/log"

function delay(t: number, v?: any): Promise<any> {
  return new Promise((resolve): void => {
    setTimeout(resolve.bind(null, v), t)
  })
}

class MyClass {
  public static listeners = ["fn", "asyncFn"]

  public static fn(
    id: string[], someArg: boolean
  ): object {
    return { fn: true, id, someArg }
  }

  public static async asyncFn(
    id: string[], someArg: boolean
  ): Promise<object> {
    return delay(2, { asyncFn: true, id, someArg })
  }
}

class MyClass2 {
  public static listeners =
    ["fn2", "fn3", "asyncFn2", "asyncFn3"]

  public static fn2(
    id: string[], someArg: boolean
  ): object {
    return { fn2: true, id, someArg }
  }

  public static fn3(
    id: string[], someArg: boolean
  ): object {
    return { fn3: true, id, someArg }
  }

  public static async asyncFn2(
    id: string[], someArg: boolean
  ): Promise<object> {
    return delay(1, { asyncFn2: true, id, someArg })
  }

  public static async asyncFn3(): Promise<null> {
    return null
  }
}


beforeEach((): void => {
  reset()
  listener({ MyClass, MyClass2, log })
})

test("defined", (): void => {
  expect(listener).not.toBeUndefined()
  expect(listen).not.toBeUndefined()
})

test("listener", (): void => {
  expect(MyClass.fn(["id"], true)).toEqual({
    "fn": true, "id": ["MyClass.fn", "id"], "someArg": true
  })

  expect(MyClass2.fn2(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "id"],
    "someArg": true
  })
})

test("listener no arg", (): void => {
  expect.assertions(2)

  const test = {
    fn: (): number => {
      expect(1).toBe(1)
      return 1
    },
    listeners: ["fn"]
  }

  listener({ test })
  expect(test.fn()).toBe(1)
})

test("listener bad arg", (): void => {
  listener({ hi: {} })
})

test("listen return", (): void => {
  listen(["MyClass.fn"], ["MyClass2.fn2"], { return: true})
  
  expect(MyClass.fn([], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn"],
    "someArg": true
  })
  
  expect(MyClass2.fn2(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "id"],
    "someArg": true
  })
})

test("listen", (): void => {
  expect.assertions(1)

  const Test = {
    fn: (): void => { expect(1).toBe(1) },
    listeners: ["fn"]
  }

  listener({ Test })
  listen(["MyClass.fn"], ["Test.fn"])

  MyClass.fn([], true)
})

test("async listener", async (): Promise<void> => {
  expect(await MyClass.asyncFn(["id"], true)).toEqual({
    "asyncFn": true,
    "id": ["MyClass.asyncFn", "id"],
    "someArg": true
  })

  expect(await MyClass2.asyncFn2(["id"], true)).toEqual({
    "asyncFn2": true,
    "id": ["MyClass2.asyncFn2", "id"],
    "someArg": true
  })
})

test("async listen return", async (): Promise<void> => {
  listen(
    ["MyClass.asyncFn"],
    ["MyClass2.asyncFn2"],
    { return: true }
  )

  expect(await MyClass.asyncFn([], true)).toEqual({
    "asyncFn2": true,
    "id": ["MyClass2.asyncFn2", "MyClass.asyncFn"],
    "someArg": true
  })

  expect(await MyClass2.asyncFn2(["id"], true)).toEqual({
    "asyncFn2": true,
    "id": ["MyClass2.asyncFn2", "id"],
    "someArg": true
  })
})

test("async listen", async (): Promise<void> => {
  expect.assertions(1)

  const Test = {
    fn: async (): Promise<void> => {
      await delay(1)
      expect(1).toBe(1)
    },
    listeners: ["fn"]
  }

  listener({ Test })
  listen(["MyClass.asyncFn"], ["Test.fn"])

  await MyClass.asyncFn([], true)
})

test(
  "async listen null return",
  async (): Promise<void> => {
    listen(
      ["MyClass.asyncFn"],
      ["MyClass2.asyncFn3"],
      { return: true }
    )

    expect(await MyClass.asyncFn([], true)).toBe(null)
  }
)

test("listen id", (): void => {
  listen(
    ["MyClass.fn", "id"],
    ["MyClass2.fn2"],
    { return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn": true, "id": ["MyClass.fn"], "someArg": true
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id"],
    "someArg": true
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    "fn": true,
    "id": ["MyClass.fn", "id", "id2"],
    "someArg": true
  })
})

test("listen *", (): void => {
  listen(["*"], ["MyClass2.fn2"], { return: true })

  expect(MyClass.fn([], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn"],
    "someArg": true
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn": true, "id": ["MyClass.fn", "id"], "someArg": true
  })
})

test("listen **", (): void => {
  listen(["**"], ["MyClass2.fn2"], { return: true })

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id"],
    "someArg": true
  })
})

test("listen * and id", (): void => {
  listen(["*", "id"], ["MyClass2.fn2"], { return: true })

  expect(MyClass.fn([], true)).toEqual({
    "fn": true, "id": ["MyClass.fn"], "someArg": true
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id"],
    "someArg": true
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    "fn": true, "id": ["MyClass.fn", "id", "id2"], "someArg": true
  })
})

test("listen id and *", (): void => {
  listen(
    ["MyClass.fn", "*"],
    ["MyClass2.fn2"],
    { return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn": true, "id": ["MyClass.fn"], "someArg": true
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id"],
    "someArg": true
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    "fn": true, "id": ["MyClass.fn", "id", "id2"], "someArg": true
  })
})

test("listen ** and id", (): void => {
  listen(
    ["**", "id2"],
    ["MyClass2.fn2"],
    { return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn": true, "id": ["MyClass.fn"], "someArg": true
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id", "id2"],
    "someArg": true
  })

  expect(MyClass.fn(["id", "id2", "id3"], true)).toEqual({
    "fn": true,
    "id": ["MyClass.fn", "id", "id2", "id3"],
    "someArg": true
  })
})

test("listen id and **", (): void => {
  listen(
    ["MyClass.fn", "**"],
    ["MyClass2.fn2"],
    { return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn": true, "id": ["MyClass.fn"], "someArg": true
  })

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id"],
    "someArg": true
  })

  expect(MyClass.fn(["id", "id2"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id", "id2"],
    "someArg": true
  })
})

test("prepend option", (): void => {
  listen(
    ["MyClass.fn"],
    ["MyClass2.fn2"],
    { return: true }
  )
  
  listen(
    ["MyClass.fn"],
    ["MyClass2.fn3"],
    { prepend: true, return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn3": true,
    "id": ["MyClass2.fn3", "MyClass.fn"],
    "someArg": true
  })
})

test("append option", (): void => {
  listen(
    ["MyClass.fn"],
    ["MyClass2.fn3"],
    { append: 2, return: true }
  )

  listen(
    ["MyClass.fn"],
    ["MyClass2.fn2"],
    { return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn3": true,
    "id": ["MyClass2.fn3", "MyClass.fn"],
    "someArg": true
  })
})

test("numeric prepend option", (): void => {
  listen(
    ["MyClass.fn"],
    ["MyClass2.fn2"],
    { prepend: 1, return: true }
  )

  listen(
    ["MyClass.fn"],
    ["MyClass2.fn3"],
    { prepend: 2, return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn"],
    "someArg": true
  })
})

test("numeric append option", (): void => {
  listen(
    ["MyClass.fn"],
    ["MyClass2.fn3"],
    { append: 2, return: true }
  )

  listen(
    ["MyClass.fn"],
    ["MyClass2.fn2"],
    { append: 1, return: true }
  )

  expect(MyClass.fn([], true)).toEqual({
    "fn3": true,
    "id": ["MyClass2.fn3", "MyClass.fn"],
    "someArg": true
  })
})

test("instance listener function", (): void => {
  expect.assertions(3)

  const test = {
    fn: undefined,
    instances: ["test2.fn"]
  }

  const test2 = {
    fn: (id: string[]): void => {
      expect(id).toEqual(["test2.fn", "hi"])
    },
    join: (instanceId, instance): void => {
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    },
    listeners: ["fn"]
  }

  listener({ test, test2 })

  test.fn(["hi"])
})

test("instance listener", (): void => {
  expect.assertions(3)

  class Test {
    public instances = ["test2"]
    public test2: Test2
  }

  const test = new Test()

  class Test2 {
    public listeners = ["fn"]
    
    public fn(id: string[]): void {
      expect(id).toEqual(["test2.fn", "hi"])
    }
    
    public join(instanceId, instance): void {
      expect(instanceId).toEqual("test")
      expect(instance).toEqual(test)
    }
    
  }

  const test2 = new Test2()

  listener({ test, test2 })

  test.test2.fn(["hi"])
})

test("intercept", (): void => {
  expect.assertions(2)

  class Test {
    public listeners = ["test"]
    
    public test(): boolean {
      return true
    }
  }

  const test = new Test()

  class Test2 {
    public listeners = ["test"]

    public test(id: string[], value: boolean): void {
      expect(id).toEqual(["test2.test", "test.test"])
      expect(value).toBe(true)
    }
  }

  const test2 = new Test2()

  listener({ test, test2 })
  listen(["test.test"], ["test2.test"], { intercept: true })

  test.test()
})
