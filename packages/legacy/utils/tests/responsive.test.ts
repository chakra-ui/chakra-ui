import {
  analyzeBreakpoints,
  arrayToObjectNotation,
  isResponsiveObjectLike,
  mapResponsive,
  objectToArrayNotation,
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

test("should convert array to object value", () => {
  expect(arrayToObjectNotation(["20px", null, null, "60px"])).toEqual({
    base: "20px",
    lg: "60px",
  })
  expect(arrayToObjectNotation(["30px"])).toEqual({ base: "30px" })
  expect(arrayToObjectNotation(["30px", "50px"])).toEqual({
    base: "30px",
    sm: "50px",
  })
  expect(arrayToObjectNotation([])).toEqual({})
})

test("should work correctly", () => {
  expect(
    analyzeBreakpoints({
      sm: "320px",
      md: "640px",
      lg: "1000px",
      xl: "4000px",
    })?.details,
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "_minW": "-0.02px",
        "breakpoint": "base",
        "maxW": "319.98px",
        "maxWQuery": "@media screen and (max-width: 319.98px)",
        "minMaxQuery": "@media screen and (min-width: 0px) and (max-width: 319.98px)",
        "minW": "0px",
        "minWQuery": "@media screen and (min-width: 0px)",
      },
      Object {
        "_minW": "319.98px",
        "breakpoint": "sm",
        "maxW": "639.98px",
        "maxWQuery": "@media screen and (max-width: 639.98px)",
        "minMaxQuery": "@media screen and (min-width: 320px) and (max-width: 639.98px)",
        "minW": "320px",
        "minWQuery": "@media screen and (min-width: 320px)",
      },
      Object {
        "_minW": "639.98px",
        "breakpoint": "md",
        "maxW": "999.98px",
        "maxWQuery": "@media screen and (max-width: 999.98px)",
        "minMaxQuery": "@media screen and (min-width: 640px) and (max-width: 999.98px)",
        "minW": "640px",
        "minWQuery": "@media screen and (min-width: 640px)",
      },
      Object {
        "_minW": "999.98px",
        "breakpoint": "lg",
        "maxW": "3999.98px",
        "maxWQuery": "@media screen and (max-width: 3999.98px)",
        "minMaxQuery": "@media screen and (min-width: 1000px) and (max-width: 3999.98px)",
        "minW": "1000px",
        "minWQuery": "@media screen and (min-width: 1000px)",
      },
      Object {
        "_minW": "3999.98px",
        "breakpoint": "xl",
        "maxW": undefined,
        "maxWQuery": "@media screen",
        "minMaxQuery": "@media screen and (min-width: 4000px)",
        "minW": "4000px",
        "minWQuery": "@media screen and (min-width: 4000px)",
      },
    ]
  `)
})

// Ensures no breaking change
test("should work with createBreakpoint output", () => {
  expect(
    analyzeBreakpoints({
      base: "0em",
      sm: "320px",
      md: "640px",
      lg: "1000px",
      xl: "4000px",
    })?.details,
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "_minW": "-0.01em",
        "breakpoint": "base",
        "maxW": "319.98px",
        "maxWQuery": "@media screen and (max-width: 319.98px)",
        "minMaxQuery": "@media screen and (min-width: 0em) and (max-width: 319.98px)",
        "minW": "0em",
        "minWQuery": "@media screen and (min-width: 0em)",
      },
      Object {
        "_minW": "319.98px",
        "breakpoint": "sm",
        "maxW": "639.98px",
        "maxWQuery": "@media screen and (max-width: 639.98px)",
        "minMaxQuery": "@media screen and (min-width: 320px) and (max-width: 639.98px)",
        "minW": "320px",
        "minWQuery": "@media screen and (min-width: 320px)",
      },
      Object {
        "_minW": "639.98px",
        "breakpoint": "md",
        "maxW": "999.98px",
        "maxWQuery": "@media screen and (max-width: 999.98px)",
        "minMaxQuery": "@media screen and (min-width: 640px) and (max-width: 999.98px)",
        "minW": "640px",
        "minWQuery": "@media screen and (min-width: 640px)",
      },
      Object {
        "_minW": "999.98px",
        "breakpoint": "lg",
        "maxW": "3999.98px",
        "maxWQuery": "@media screen and (max-width: 3999.98px)",
        "minMaxQuery": "@media screen and (min-width: 1000px) and (max-width: 3999.98px)",
        "minW": "1000px",
        "minWQuery": "@media screen and (min-width: 1000px)",
      },
      Object {
        "_minW": "3999.98px",
        "breakpoint": "xl",
        "maxW": undefined,
        "maxWQuery": "@media screen",
        "minMaxQuery": "@media screen and (min-width: 4000px)",
        "minW": "4000px",
        "minWQuery": "@media screen and (min-width: 4000px)",
      },
    ]
  `)
})
