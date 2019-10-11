import { Bindings } from "../dist/bindings"

test("bindings (basic)", (): void => {
  const { bindings } = new Bindings(["test"])
  expect(bindings).toEqual([{ targetId: "test" }])
})

test("bindings (multiple basic)", (): void => {
  const { bindings } = new Bindings("test", "test2")
  expect(bindings).toEqual([
    {
      targetId: "test",
    },
    {
      targetId: "test2",
    },
  ])
})

test("bindings (multiple basic with option)", (): void => {
  const { bindings } = new Bindings([
    "test",
    "test2",
    { prepend: true },
  ])
  expect(bindings).toEqual([
    { options: { prepend: true }, targetId: "test" },
    { options: { prepend: true }, targetId: "test2" },
  ])
})

test("bindings (nested)", (): void => {
  const { bindings } = new Bindings(["test"])
  expect(bindings).toEqual([{ targetId: "test" }])
})

test("bindings (multiple nested)", (): void => {
  const { bindings } = new Bindings(["test"], ["test2"])
  expect(bindings).toEqual([
    { targetId: "test" },
    { targetId: "test2" },
  ])
})

test("bindings (nested with option)", (): void => {
  const { bindings } = new Bindings([
    ["test"],
    { prepend: true },
  ])
  expect(bindings).toEqual([
    { options: { prepend: true }, targetId: "test" },
  ])
})

test("bindings (multiple nested with option)", (): void => {
  const { bindings } = new Bindings([
    ["test"],
    ["test2"],
    { prepend: true },
  ])
  expect(bindings).toEqual([
    { options: { prepend: true }, targetId: "test" },
    { options: { prepend: true }, targetId: "test2" },
  ])
})

test("bindings (nested with custom id)", (): void => {
  const { bindings } = new Bindings([
    ["test", "customId"],
    { prepend: true },
  ])
  expect(bindings).toEqual([
    {
      customIds: ["customId"],
      options: { prepend: true },
      targetId: "test",
    },
  ])
})

test("bindings (multiple nested with custom id)", (): void => {
  const { bindings } = new Bindings([
    ["test", "customId"],
    ["test2", "customId"],
    { prepend: true },
  ])
  expect(bindings).toEqual([
    {
      customIds: ["customId"],
      options: { prepend: true },
      targetId: "test",
    },
    {
      customIds: ["customId"],
      options: { prepend: true },
      targetId: "test2",
    },
  ])
})
