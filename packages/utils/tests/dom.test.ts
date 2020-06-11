import {
  ariaAttr,
  dataAttr,
  getOwnerDocument,
  getWindow,
  normalizeEventKey,
} from "../src"

test("should get window object", () => {
  expect(getWindow()).toBe(window)
})

test("should normalize keyboard events", () => {
  const keyboardEvent: any = { key: "Left", keyCode: 38 }
  expect(normalizeEventKey(keyboardEvent)).toBe("ArrowLeft")
})

test("should return data attribute value from boolean", () => {
  const isActive = true
  expect(dataAttr(isActive)).toBe("")
})

test("should return aria attribute value from boolean", () => {
  const isDisabled = false
  expect(ariaAttr(isDisabled)).toBe(undefined)
})

test("should get document object", () => {
  expect(getOwnerDocument()).toBe(document)
})
