import {
  omit,
  pick,
  split,
  get,
  memoize,
  getWithDefault,
  filterUndefined,
} from "../src/object"

const obj = { a: 1, b: 2, c: { d: 3 } }

test("should return object with omitted property", () => {
  expect(omit(obj, ["a"])).toStrictEqual({ b: 2, c: { d: 3 } })
})

test("should return property in object with specified key", () => {
  expect(pick(obj, ["a"])).toStrictEqual({ a: 1 })
})

test("should split object by key and return array of split objects", () => {
  expect(split(obj, ["a"])).toStrictEqual([{ a: 1 }, { b: 2, c: { d: 3 } }])
})

test("should get value of specified path in object", () => {
  expect(get(obj, "c.d")).toStrictEqual(3)
})

test("should get value of specified path in object or return path as default if value not found", () => {
  expect(getWithDefault("c.d", obj)).toStrictEqual(3)
  expect(getWithDefault("c.e", obj)).toStrictEqual("c.e")
})

test("should filter undefined values in object", () => {
  const result = filterUndefined({
    size: null,
    variant: undefined,
    colorScheme: "red",
  })
  expect(result).toStrictEqual({ colorScheme: "red" })
})

test("should get memoized value on successive calls", () => {
  const mockGet = jest.fn(() => true)
  const memoizedMockGet = memoize(mockGet)

  // run the memoized get twice
  expect(memoizedMockGet(obj, "path")).toStrictEqual(true)
  expect(memoizedMockGet(obj, "path")).toStrictEqual(true)
  // make sure get was only called once
  expect(mockGet).toHaveBeenCalledTimes(1)
})
