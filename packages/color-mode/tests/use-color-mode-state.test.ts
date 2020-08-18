import { renderHook } from "@chakra-ui/test-utils"
import { useColorModeState } from "../src/use-color-mode-state"

test("should warn instead of throwing when localStorage is disabled", () => {
  console.warn = jest.fn()
  Object.defineProperty(window, "localStorage", {
    get: jest.fn(() => {
      throw "SecurityError: The operation is insecure."
    }),
  })

  const { result } = renderHook(() =>
    useColorModeState({ initialColorMode: "light" }),
  )
  const [mode, setMode] = result.current
  expect(mode).toBe("light")
  expect(console.warn).toHaveBeenCalled()
})
