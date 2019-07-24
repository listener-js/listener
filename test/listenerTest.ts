import { EventId, listener, listen, reset } from "../"

class MyClass {
  public static fn(id: EventId, someArg: boolean) {
    return { fn: true, id, someArg }
  }
}

class MyClass2 {
  public static fn2(id: EventId, someArg: boolean) {
    return { fn2: true, id, someArg }
  }
}

listener(MyClass, "MyClass", "fn")
listener(MyClass2, "MyClass2", "fn2")

beforeEach(reset)

test("defined", (): void => {
  expect(listener).not.toBeUndefined()
  expect(listen).not.toBeUndefined()
})

test("listener calls", (): void => {
  expect(MyClass.fn("id", true)).toEqual(
    { "fn": true, "id": ["id", "MyClass.fn"], "someArg": true }
  )
  expect(MyClass2.fn2("id", true)).toEqual(
    { "fn2": true, "id": ["id", "MyClass2.fn2"], "someArg": true }
  )
})

test("listener listens", (): void => {
  listen("MyClass.fn", "MyClass2.fn2")
  
  expect(MyClass.fn("id", true)).toEqual(
    { "fn2": true, "id": ["id", "MyClass.fn", "MyClass2.fn2"], "someArg": true }
  )
  
  expect(MyClass2.fn2("id", true)).toEqual(
    { "fn2": true, "id": ["id", "MyClass2.fn2"], "someArg": true }
  )
})
