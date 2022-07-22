import { hooks } from "@chakra-ui/test-utils"
import { toCSSVar, useToken } from "../src"

const mockRed = {
  100: "mockRed.100",
  200: "mockRed.200",
  300: "mockRed.300",
  400: "mockRed.400",
  500: "mockRed.500",
}

const mockBlue = {
  100: "mockBlue.100",
  200: "mockBlue.200",
  300: "mockBlue.300",
  400: "mockBlue.400",
  500: "mockBlue.500",
}

const mockSpace = {
  "1.5": "0.375rem",
}

const mockBreakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
}

const mockValue = toCSSVar({
  colors: {
    red: mockRed,
    blue: mockBlue,
  },
  space: mockSpace,
  breakpoints: mockBreakpoints,
})

jest.mock("../src/use-theme", () => ({
  useTheme: () => mockValue,
}))

describe("useToken", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("resolves a single value", () => {
    const { result } = hooks.render(() => useToken("colors", "red.100"))

    expect(result.current).not.toBeInstanceOf(Array)
    expect(result.current).toStrictEqual(mockRed[100])
  })

  test("resolves a value which contains a dot", () => {
    const { result } = hooks.render(() => useToken("space", "1.5"))

    expect(result.current).not.toBeInstanceOf(Array)
    expect(result.current).toStrictEqual(mockSpace["1.5"])
  })

  test("resolves multiple values", () => {
    const { result } = hooks.render(() =>
      useToken("colors", ["red.100", "blue.300"]),
    )

    expect(result.current).toHaveLength(2)
    expect(result.current).toStrictEqual([mockRed[100], mockBlue[300]])
  })

  test("unknown values resolve as fallbacks", () => {
    const input = ["foo", "bar", "baz"]

    const { result } = hooks.render(() => useToken("colors", input))

    expect(result.current).toHaveLength(input.length)
    expect(result.current).toStrictEqual(input)
  })

  test("known and unknown values mixed", () => {
    const { result } = hooks.render(() =>
      useToken("colors", ["red.100", "blue.300", "foo", "bar", "baz"]),
    )

    expect(result.current).toHaveLength(5)
    expect(result.current).toStrictEqual([
      mockRed[100],
      mockBlue[300],
      "foo",
      "bar",
      "baz",
    ])
  })

  test("resolves a single breakpoint string value", () => {
    const { result } = hooks.render(() => useToken("breakpoints", "md"))

    expect(result.current).not.toBeInstanceOf(Array)
    expect(result.current).toStrictEqual(mockBreakpoints["md"])
  })

  test("resolves multiple breakpoint string values", () => {
    const { result } = hooks.render(() => useToken("breakpoints", ["sm", "lg"]))

    expect(result.current).toHaveLength(2)
    expect(result.current).toStrictEqual([
      mockBreakpoints["sm"],
      mockBreakpoints["lg"],
    ])
  })
})
