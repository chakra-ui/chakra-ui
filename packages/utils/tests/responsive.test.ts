import {
  mapResponsive,
  objectToArrayNotation,
  isResponsiveObjectLike,
} from "../src"

const arr = [2, 3]
const obj = { sm: 2, md: 3 }
const mapper = (val: number) => `grid-template-columns(${val}, 1fr )`

test("should run mapper on array or object and return mapped data", () => {
  expect(mapResponsive(arr, mapper)).toStrictEqual([
    "grid-template-columns(2, 1fr )",
    "grid-template-columns(3, 1fr )",
  ])
  expect(mapResponsive(obj, mapper)).toStrictEqual({
    sm: "grid-template-columns(2, 1fr )",
    md: "grid-template-columns(3, 1fr )",
  })
})

test("should convert object to array notation", () => {
  expect(objectToArrayNotation({ lg: 400, sm: 100, base: 40 })).toEqual([
    40,
    100,
    null,
    400,
  ])
  expect(objectToArrayNotation({ sm: 100 })).toEqual([null, 100])
  expect(objectToArrayNotation({ md: 100 })).toEqual([null, null, 100])
  expect(objectToArrayNotation({ base: 100 })).toEqual([100])
  expect(objectToArrayNotation({ base: 100, lg: 1300 })).toEqual([
    100,
    null,
    null,
    1300,
  ])
  expect(objectToArrayNotation({ base: 100, md: 400 })).toEqual([
    100,
    null,
    400,
  ])
  expect(objectToArrayNotation({})).toEqual([])
})

test("should tell if object is responsive-like", () => {
  expect(isResponsiveObjectLike({ lg: 400, sm: 100, base: 40 })).toBe(true)
  expect(isResponsiveObjectLike({ base: 40 })).toBe(true)
  expect(isResponsiveObjectLike({ sm: 100 })).toBe(true)
  expect(isResponsiveObjectLike({})).toBe(false)
  expect(isResponsiveObjectLike({ base: 40, paddingTop: 4 })).toBe(false)
  expect(isResponsiveObjectLike({ md: 40, paddingTop: 4 })).toBe(false)
  expect(isResponsiveObjectLike({ paddingTop: 4, paddingLeft: 4 })).toBe(false)
})
