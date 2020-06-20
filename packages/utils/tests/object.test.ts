import { omit, pick, split, get, getWithDefault, filterUndefined } from "../src"

const object = { a: 1, b: 2, c: { d: 3 } }

test("should return object with omitted property", () => {
  expect(omit(object, ["a"])).toStrictEqual({ b: 2, c: { d: 3 } })
})

test("should return property in object with specified key", () => {
  expect(pick(object, ["a"])).toStrictEqual({ a: 1 })
})

test("should split object by key and return array of split objects", () => {
  expect(split(object, ["a"])).toStrictEqual([{ a: 1 }, { b: 2, c: { d: 3 } }])
})

test("should get value of specified path in object", () => {
  expect(get(object, "c.d")).toStrictEqual(3)
})

test("should get value of specified path in object or return path as default if value not found", () => {
  expect(getWithDefault("c.d", object)).toStrictEqual(3)
  expect(getWithDefault("c.e", object)).toStrictEqual("c.e")
})

test("should filter undefined values in object", () => {
  const result = filterUndefined({ variant: undefined, colorScheme: "red" })
  expect(result).toMatchObject({ colorScheme: "red" })
})
