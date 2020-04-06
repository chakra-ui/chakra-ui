import {
  isNumber,
  isNumeric,
  isObject,
  isEmpty,
  isEmptyObject,
} from "../assertion"

test("is number", () => {
  expect(isNumber(1.2)).toBeTruthy()
  expect(isNumber("20")).toBeFalsy()
})

test("is integer", () => {
  expect(isNumeric("1.3")).toBeTruthy()
  expect(isNumeric("2.03")).toBeTruthy()

  expect(isNumeric("2.03.34")).toBeFalsy()
  expect(isNumeric("dfd")).toBeFalsy()
})

test("is object", () => {
  expect(isObject([])).toBeFalsy()
  expect(isObject({})).toBeTruthy()
})

test("is empty", () => {
  expect(isEmpty([])).toBeTruthy()
  expect(isEmpty({})).toBeTruthy()
  expect(isEmpty("")).toBeTruthy()
  expect(isEmpty(null)).toBeTruthy()

  expect(isEmpty([1, 2])).toBeFalsy()
  expect(isEmpty({ a: 2 })).toBeFalsy()
  expect(isEmpty("df")).toBeFalsy()
})

test("is empty object", () => {
  expect(isEmptyObject({})).toBeTruthy()
  expect(isEmptyObject({ a: 3 })).toBeFalsy()
})
