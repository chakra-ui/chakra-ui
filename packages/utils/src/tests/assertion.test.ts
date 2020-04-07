// yarn utils test
import {
  isNumber,
  isNotNumber,
  isInteger,
  isNumeric,
  isArray,
  isEmptyArray,
  isFunction,
  isDefined,
  isUndefined,
  isObject,
  isEmptyObject,
  isNull,
  isString,
  isInputEvent,
  isEmpty,
} from "../assertion"

test("isNumber - '1' should equal false", () => {
  expect(isNumber("1")).toStrictEqual(false)
})

test("isNotNumber - '1' should equal true", () => {
  expect(isNotNumber("1")).toStrictEqual(true)
})

test("isInteger - 1.2 should equal false", () => {
  expect(isInteger(1.2)).toStrictEqual(false)
})

test("isNumeric - '1.2' should equal true", () => {
  expect(isNumeric("1.2")).toStrictEqual(true)
})

test("isArray - [1] should equal true", () => {
  expect(isArray([1])).toStrictEqual(true)
})

test("isEmptyArray - [] should equal true", () => {
  expect(isEmptyArray([])).toStrictEqual(true)
})

test("isFunction - () => {} should equal true", () => {
  expect(isFunction(() => {})).toStrictEqual(true)
})

test("isDefined - '1' should equal true", () => {
  expect(isDefined("1")).toStrictEqual(true)
})

test("isUndefined - undefined should equal true", () => {
  expect(isUndefined(undefined)).toStrictEqual(true)
})

test("isObject - {} should equal true", () => {
  expect(isObject({})).toStrictEqual(true)
})

test("isEmptyObject - {} should equal true", () => {
  expect(isEmptyObject({})).toStrictEqual(true)
})

test("isNull - null should equal true", () => {
  expect(isNull(null)).toStrictEqual(true)
})

test("isString - '1' should equal true", () => {
  expect(isString("1")).toStrictEqual(true)
})

test("isInputEvent - { target: {} } should equal true", () => {
  expect(isInputEvent({ target: {} })).toStrictEqual(true)
})

test("isEmpty - [] should equal true", () => {
  expect(isEmpty([])).toStrictEqual(true)
})
