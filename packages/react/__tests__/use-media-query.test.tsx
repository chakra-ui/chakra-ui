import { renderHook } from "@testing-library/react"
import { useMediaQuery } from "../src"

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

describe("useMediaQuery", () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    window.matchMedia = mockMatchMedia() as any
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  test("should evaluate the queries it is given", () => {
    const { result } = renderHook(() =>
      useMediaQuery(["(min-width: 30rem)", "(min-width: 90rem)"], {
        ssr: false,
      }),
    )

    expect(result.current).toEqual([true, false])
  })

  test("should re-evaluate when a query changes", () => {
    const { result, rerender } = renderHook(
      ({ query }: { query: string }) => useMediaQuery([query], { ssr: false }),
      { initialProps: { query: "(min-width: 90rem)" } },
    )

    expect(result.current).toEqual([false])

    rerender({ query: "(min-width: 30rem)" })

    expect(result.current).toEqual([true])
  })

  test("should re-evaluate when a query is removed", () => {
    const { result, rerender } = renderHook(
      ({ queries }: { queries: string[] }) =>
        useMediaQuery(queries, { ssr: false }),
      {
        initialProps: {
          queries: ["(min-width: 0px)", "(min-width: 48rem)"],
        },
      },
    )

    expect(result.current).toEqual([true, true])

    rerender({ queries: ["(min-width: 90rem)"] })

    expect(result.current).toEqual([false])
  })

  test("should re-evaluate when a comma splits one query into two", () => {
    const { result, rerender } = renderHook(
      ({ queries }: { queries: string[] }) =>
        useMediaQuery(queries, { ssr: false }),
      {
        initialProps: {
          queries: ["(min-width: 0px),(min-width: 48rem)"],
        },
      },
    )

    expect(result.current).toEqual([false])

    rerender({ queries: ["(min-width: 0px)", "(min-width: 48rem)"] })

    expect(result.current).toEqual([true, true])
  })
})
