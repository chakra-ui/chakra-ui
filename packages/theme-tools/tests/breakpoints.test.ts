import { createBreakpoints, BaseBreakpointConfig } from "../src"

const defaultBreakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
}

describe("createBreakpoints", () => {
  test("returns an array", () => {
    expect(createBreakpoints(defaultBreakpoints)).toBeInstanceOf(Array)
  })

  test("sorts by value size", () => {
    const reversedDefaults = Object.fromEntries(
      Object.entries(defaultBreakpoints).reverse(),
    ) as BaseBreakpointConfig

    const expectedResult = createBreakpoints(defaultBreakpoints)

    const result = createBreakpoints(reversedDefaults)

    expect(result).toEqual(expect.arrayContaining(expectedResult))

    Object.entries(result).forEach(([key, value]) => {
      expect(result[key]).toBe(value)
    })
  })

  test("accepts further breakpoints", () => {
    const xxl = "116em"

    const extendedBreakpoints = {
      ...defaultBreakpoints,
      xxl,
    }

    const expectedResult = [
      extendedBreakpoints.sm,
      extendedBreakpoints.md,
      extendedBreakpoints.lg,
      extendedBreakpoints.xl,
      xxl,
    ]

    const result = createBreakpoints(extendedBreakpoints)

    expect(result).toEqual(expect.arrayContaining(expectedResult))

    Object.entries(extendedBreakpoints).forEach(([key, value]) => {
      expect(result[key]).toBe(value)
    })
  })

  test("works with px", () => {
    const breakpoints = {
      sm: "300px",
      md: "480px",
      lg: "620px",
      xl: "800px",
    }

    const expectedResult = [
      breakpoints.sm,
      breakpoints.md,
      breakpoints.lg,
      breakpoints.xl,
    ]

    const result = createBreakpoints(breakpoints)

    expect(result).toEqual(expect.arrayContaining(expectedResult))

    Object.entries(breakpoints).forEach(([key, value]) => {
      expect(result[key]).toBe(value)
    })
  })

  test("works with rem", () => {
    const breakpoints = {
      sm: "30rem",
      md: "48rem",
      lg: "62rem",
      xl: "80rem",
    }

    const expectedResult = [
      breakpoints.sm,
      breakpoints.md,
      breakpoints.lg,
      breakpoints.xl,
    ]

    const result = createBreakpoints(breakpoints)

    expect(result).toEqual(expect.arrayContaining(expectedResult))

    Object.entries(breakpoints).forEach(([key, value]) => {
      expect(result[key]).toBe(value)
    })
  })
})
