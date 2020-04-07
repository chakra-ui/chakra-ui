import { omit, pick, split, get, getWithDefault } from "../object"

test("omit - 'object: { a: 1, b: 2 }, keys: ['a']' should equal { b: 2 }", () => {
  expect(omit({ a: 1, b: 2 }, ["a"])).toStrictEqual({ b: 2 })
})

test("pick - 'object: { a: 1, b: 2 }, keys: ['a']' should equal { a: 1 }", () => {
  expect(pick({ a: 1, b: 2 }, ["a"])).toStrictEqual({ a: 1 })
})

test("split - 'object: { a: 1, b: 2 }, keys: ['a']' should equal [{ a: 1 }, { b: 2 }]", () => {
  expect(split({ a: 1, b: 2 }, ["a"])).toStrictEqual([{ a: 1 }, { b: 2 }])
})

test("get - 'object: { a: { b: 1 } }, path:'a.b'' should equal 1", () => {
  expect(get({ a: { b: 1 } }, "a.b")).toStrictEqual(1)
})

test("getWithDefault - 'path: 'a.b', scale: { a: { b: 1 } }' should equal 1", () => {
  expect(getWithDefault("a.b", { a: { b: 1 } })).toStrictEqual(1)
})

test("getWithDefault - 'path: 'a.b', scale: { a: {} }' should equal 'a.b'", () => {
  expect(getWithDefault("a.b", { a: {} })).toStrictEqual("a.b")
})
