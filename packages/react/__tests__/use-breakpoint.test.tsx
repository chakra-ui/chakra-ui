import { renderHook } from "@testing-library/react"
import { ChakraProvider, defaultSystem, useBreakpoint } from "../src"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

// the viewport is wide enough for `base`, `sm` and `md`, but not `lg` and up
const matching = [
  "(min-width: 0px)",
  "(min-width: 30rem)",
  "(min-width: 48rem)",
]

const mockMatchMedia = () =>
  vi.fn().mockImplementation((query: string) => ({
    matches: matching.includes(query),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))

describe("useBreakpoint", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    window.matchMedia = mockMatchMedia() as any
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  test("should return the highest matching breakpoint when no breakpoints are listed", () => {
    const { result } = renderHook(() => useBreakpoint({ ssr: false }), {
      wrapper,
    })

    expect(result.current).toBe("md")
  })

  test("should return the highest matching breakpoint from the listed breakpoints", () => {
    const { result } = renderHook(
      () => useBreakpoint({ ssr: false, breakpoints: ["base", "sm", "md"] }),
      { wrapper },
    )

    expect(result.current).toBe("md")
  })

  test("should not return a listed breakpoint that does not match", () => {
    const { result } = renderHook(
      () => useBreakpoint({ ssr: false, breakpoints: ["base", "lg"] }),
      { wrapper },
    )

    expect(result.current).toBe("base")
  })

  test("should return the fallback when no breakpoint matches", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as any

    const { result } = renderHook(
      () => useBreakpoint({ ssr: false, fallback: "sm" }),
      { wrapper },
    )

    expect(result.current).toBe("sm")
  })
})
