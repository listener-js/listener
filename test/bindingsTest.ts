import { Bindings } from "../dist/bindings"

test("bindings (basic)", (): void => {
  const { bindings } = new Bindings("test")
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
  const { bindings } = new Bindings(
    ["test", { prepend: true }],
    ["test2", { append: true }]
  )
  expect(bindings).toEqual([
    { options: { prepend: true }, targetId: "test" },
    { options: { append: true }, targetId: "test2" },
  ])
})

test("bindings (custom id)", (): void => {
  const { bindings } = new Bindings(["test", "customId"])
  expect(bindings).toEqual([
    {
      customIds: ["customId"],
      targetId: "test",
    },
  ])
})

test("bindings (custom id with option)", (): void => {
  const { bindings } = new Bindings([
    "test",
    "customId",
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

test("bindings (multiple custom id)", (): void => {
  const { bindings } = new Bindings(
    ["test", "customId"],
    ["test2", "customId"]
  )
  expect(bindings).toEqual([
    {
      customIds: ["customId"],
      targetId: "test",
    },
    {
      customIds: ["customId"],
      targetId: "test2",
    },
  ])
})
