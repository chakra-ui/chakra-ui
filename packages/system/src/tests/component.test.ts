import {
  getBaseStyle,
  getModifierStyles,
  getComponentStyles,
} from "../component"
import theme from "./theme"

test("should get the base styles", () => {
  const result = getBaseStyle({ theme }, { themeKey: "Button" })
  expect(result).toEqual({
    padding: 20,
    fontSize: 14,
    background: "white",
  })
})

test("should get functional base styles", () => {
  const result = getBaseStyle({ theme }, { themeKey: "Badge" })
  expect(result).toEqual({
    padding: 40,
  })
})

test("should get the base styles for sub-components", () => {
  const result = getBaseStyle({ theme }, { themeKey: "Tabs.Tab" })
  expect(result).toEqual({ fontSize: 14, color: "pink" })
})

test("should use default props", () => {
  const result = getModifierStyles({ theme }, { themeKey: "Button" })
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
  const result = getModifierStyles(
    { theme, variant: "outline" },
    { themeKey: "Button" },
  )
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
    { themeKey: "Button" },
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
    { themeKey: "Button" },
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
