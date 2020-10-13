import { renderHook } from "@chakra-ui/test-utils"
import { useColors } from "../src"
import * as system from "@chakra-ui/system"

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

describe("useColors", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test("resolves a single theme color", () => {
    setupMock()

    const { result } = renderHook(() => useColors("red.100"))

    expect(result.current).toHaveLength(1)
    expect(result.current).toStrictEqual([mockRed[100]])
  })

  test("resolves multiple colors", () => {
    setupMock()

    const { result } = renderHook(() => useColors("red.100", "blue.300"))

    expect(result.current).toHaveLength(2)
    expect(result.current).toStrictEqual([mockRed[100], mockBlue[300]])
  })

  test("unknown colors resolve as undefined", () => {
    setupMock()

    const { result } = renderHook(() => useColors("foo", "bar", "baz"))

    expect(result.current).toHaveLength(3)

    expect(
      result.current.every((color) => typeof color === "undefined"),
    ).toBeTruthy()
  })
})
