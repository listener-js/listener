import { listener, listen, reset } from "../"
import { Log } from "@listener-js/log"

function delay(t, v): Promise<any> {
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
  public static listeners = ["fn2", "asyncFn2", "asyncFn3"]

  public static fn2(
    id: string[], someArg: boolean
  ): object {
    return { fn2: true, id, someArg }
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

listener({ Log, MyClass, MyClass2 })

beforeEach((): void => {
  reset()
  // listen(["**"], ["Log.all"])
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

test("listen", (): void => {
  listen(["MyClass.fn"], ["MyClass2.fn2"])
  
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

test("async listen", async (): Promise<void> => {
  listen(["MyClass.asyncFn"], ["MyClass2.asyncFn2"])

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

test(
  "async listen with no return on bound listener",
  async (): Promise<void> => {
    listen(["MyClass.asyncFn"], ["MyClass2.asyncFn3"])

    expect(await MyClass.asyncFn(["id"], true))
      .toEqual({
        "asyncFn": true,
        "id": ["MyClass.asyncFn", "id"],
        "someArg": true
      })
  }
)

test("listen id", (): void => {
  listen(["MyClass.fn", "id"], ["MyClass2.fn2"])

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
  listen(["*"], ["MyClass2.fn2"])

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
  listen(["**"], ["MyClass2.fn2"])

  expect(MyClass.fn(["id"], true)).toEqual({
    "fn2": true,
    "id": ["MyClass2.fn2", "MyClass.fn", "id"],
    "someArg": true
  })
})

test("listen * and id", (): void => {
  listen(["*", "id"], ["MyClass2.fn2"])

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
  listen(["**", "id2"], ["MyClass2.fn2"])

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
