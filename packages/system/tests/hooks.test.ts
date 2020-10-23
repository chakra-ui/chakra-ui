import { renderHook } from "@chakra-ui/test-utils"
import { useToken } from "../src"
import * as system from "../src/providers"

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

const setupMock = () => {
  jest.spyOn(system, "useTheme").mockReturnValueOnce({
    colors: {
      red: mockRed,
      blue: mockBlue,
    },
  })
}

describe("useToken", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("resolves a single value", () => {
    setupMock()

    const { result } = renderHook(() => useToken("colors", "red.100"))

    expect(result.current).not.toBeInstanceOf(Array)
    expect(result.current).toStrictEqual(mockRed[100])
  })

  test("resolves multiple values", () => {
    setupMock()

    const { result } = renderHook(() =>
      useToken("colors", ["red.100", "blue.300"]),
    )

    expect(result.current).toHaveLength(2)
    expect(result.current).toStrictEqual([mockRed[100], mockBlue[300]])
  })

  test("unknown values resolve as fallbacks", () => {
    setupMock()

    const input = ["foo", "bar", "baz"]

    const { result } = renderHook(() => useToken("colors", input))

    expect(result.current).toHaveLength(input.length)
    expect(result.current).toStrictEqual(input)
  })

  test("known and unknown values mixed", () => {
    setupMock()

    const { result } = renderHook(() =>
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
})
