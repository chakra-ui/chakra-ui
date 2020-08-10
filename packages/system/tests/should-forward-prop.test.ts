import { propNames } from "@chakra-ui/styled-system"
import { shouldForwardProp } from "../src/should-forward-prop"

describe("does not forward styled-system props", () => {
  test.each(propNames)("%s", (propName) => {
    expect(shouldForwardProp(propName)).toBe(false)
  })
})

describe("does not forward reserved internal props", () => {
  const internalPropNames = [
    "htmlWidth",
    "htmlHeight",
    "htmlSize",
    "__css",
    "sx",
  ]

  test.each(internalPropNames)("%s", (propName) => {
    expect(shouldForwardProp(propName)).toBe(false)
  })
})

test('forwards "children" prop', () => {
  expect(shouldForwardProp("children")).toBe(true)
})

describe("forwards other random props", () => {
  const randomPropNames = [
    "0hello",
    "1goodbye",
    "upside-down",
    "inside-out",
    "liberty",
    "equality",
    "fraternity",
  ]

  test.each(randomPropNames)("%s", (propName) => {
    expect(shouldForwardProp(propName)).toBe(true)
  })
})
