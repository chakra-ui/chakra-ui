import { renderHook } from "@testing-library/react"
import { ChakraProvider, defaultSystem, useBreakpointValue } from "../src"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

describe("useBreakpointValue", () => {
  test("should return base value during SSR", () => {
    const { result } = renderHook(
      () => useBreakpointValue({ base: 1, sm: 2 }),
      { wrapper },
    )
    // In SSR mode (jsdom), the base value should be returned
    expect(result.current).toBe(1)
  })

  test("should return fallback breakpoint value when specified", () => {
    const { result } = renderHook(
      () => useBreakpointValue({ base: 1, sm: 2 }, { fallback: "sm" }),
      { wrapper },
    )
    // When fallback is "sm", it should return the sm value during SSR
    expect(result.current).toBe(2)
  })

  test("should return matched breakpoint value in CSR based on window size", () => {
    // Mock matchMedia to simulate a screen width >= 480px (sm breakpoint)
    const listeners: Array<(e: MediaQueryListEvent) => void> = []
    const mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(min-width: 0px)" || query === "(min-width: 30rem)",
      media: query,
      addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb)
      },
      removeEventListener: () => {},
    }))

    const originalMatchMedia = window.matchMedia
    window.matchMedia = mockMatchMedia

    try {
      const { result } = renderHook(
        () => useBreakpointValue({ base: 1, sm: 2, md: 3 }, { ssr: false }),
        { wrapper },
      )
      // With ssr: false, it should use matchMedia and return sm value (2)
      // since we mocked sm (30rem = 480px) to match
      expect(result.current).toBe(2)
    } finally {
      window.matchMedia = originalMatchMedia
    }
  })
})
