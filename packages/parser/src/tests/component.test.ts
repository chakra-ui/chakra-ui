import {
  getBaseStyle,
  isSubcomponent,
  getModifierStyles,
  getComponentStyles,
} from "../component"
import theme from "./theme"

test("should eval subcomponents", () => {
  const result = isSubcomponent("Tab.TabList")
  expect(result).toBeTruthy()
})

test("should get the base styles", () => {
  const result = getBaseStyle({ theme }, "Button")
  expect(result).toEqual({
    padding: 20,
    fontSize: 14,
    background: "white",
  })
})

test("should get functional base styles", () => {
  const result = getBaseStyle({ theme }, "Badge")
  expect(result).toEqual({
    padding: 40,
  })
})

test("should get the base styles for sub-components", () => {
  const result = getBaseStyle({ theme }, "Tabs.Tab")
  expect(result).toEqual({ fontSize: 14, color: "pink" })
})

test("should use default props", () => {
  const result = getModifierStyles({ theme }, "Button")
  expect(result).toEqual({
    padding: 10,
    fontSize: 12,
    background: "pink",
    color: "white",
    "&:hover": {
      background: "darkpink",
    },
  })
})

test("variant: should use correct modifier style", () => {
  const result = getModifierStyles({ theme, variant: "outline" }, "Button")
  expect(result).toEqual({
    padding: 10,
    fontSize: 12,
    border: "2px solid red",
    color: "red",
    "&:hover": {
      background: "darkpink",
    },
  })
})

test("size: should use correct modifier style", () => {
  const result = getModifierStyles(
    { theme, variant: "solid", size: "large" },
    "Button",
  )
  expect(result).toEqual({
    padding: 16,
    fontSize: 20,
    background: "pink",
    color: "white",
    "&:hover": {
      background: "darkpink",
    },
  })
})

test("should get component style", () => {
  const result = getComponentStyles(
    { theme, variant: "solid", size: "large" },
    "Button",
  )
  expect(result).toEqual({
    padding: 16,
    fontSize: 20,
    background: "pink",
    color: "white",
    "&:hover": {
      background: "darkpink",
    },
  })
})
