import {
  isNumber,
  isNotNumber,
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
  isNotEmptyObject,
  isCssVar,
} from "../src"

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

test("is not number", () => {
  expect(isNotNumber("1")).toBeTruthy()
  expect(isNotNumber(1)).toBeFalsy()
})

test("is array", () => {
  expect(isArray([1])).toBeTruthy()
})

test("is empty array", () => {
  expect(isEmptyArray([])).toBeTruthy()
})

test("is function", () => {
  expect(isFunction(() => {})).toBeTruthy()
})

test("is defined", () => {
  expect(isDefined("1")).toBeTruthy()
})

test("is undefined", () => {
  expect(isUndefined(undefined)).toBeTruthy()
})

test("is null", () => {
  expect(isNull(null)).toBeTruthy()
})

test("is string", () => {
  expect(isString("1")).toBeTruthy()
})

test("is css var", () => {
  expect(isCssVar("var(--whatever-you-want)")).toBeTruthy()
  expect(isCssVar("4")).not.toBeTruthy()
})

test("is input event", () => {
  expect(isInputEvent({ target: {} })).toBeTruthy()
})

test("should check is object is not empty", () => {
  expect(isNotEmptyObject({})).toBeFalsy()
  expect(isNotEmptyObject({ size: "sm" })).toBeTruthy()
})
