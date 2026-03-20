import { act, renderHook } from "@testing-library/react"
import { useMediaQuery } from "../src"

function mockMatchMedia(matches: Record<string, boolean>) {
  const listeners = new Map<string, Set<() => void>>()

  const impl = vi.fn().mockImplementation((query: string) => ({
    matches: matches[query] ?? false,
    media: query,
    addEventListener: (_: string, cb: () => void) => {
      if (!listeners.has(query)) listeners.set(query, new Set())
      listeners.get(query)!.add(cb)
    },
    removeEventListener: (_: string, cb: () => void) => {
      listeners.get(query)?.delete(cb)
    },
  }))

  const fire = (query: string, newMatches: boolean) => {
    matches[query] = newMatches
    listeners.get(query)?.forEach((cb) => cb())
  }

  return { impl, fire }
}

describe("useMediaQuery", () => {
  test("returns correct matches for multiple queries", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 0px)": true,
      "(min-width: 768px)": false,
    })
    const original = window.matchMedia
    window.matchMedia = impl

    try {
      const { result } = renderHook(() =>
        useMediaQuery(["(min-width: 0px)", "(min-width: 768px)"]),
      )
      expect(result.current).toEqual([true, false])
    } finally {
      window.matchMedia = original
    }
  })

  test("fallback option does not override client matchMedia values", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 0px)": false,
      "(min-width: 768px)": false,
    })
    const original = window.matchMedia
    window.matchMedia = impl

    try {
      const { result } = renderHook(() =>
        useMediaQuery(["(min-width: 0px)", "(min-width: 768px)"], {
          fallback: [true, true],
        }),
      )
      expect(result.current).toEqual([false, false])
    } finally {
      window.matchMedia = original
    }
  })

  test("updates when a media query match changes", async () => {
    const { impl, fire } = mockMatchMedia({ "(min-width: 768px)": false })
    const original = window.matchMedia
    window.matchMedia = impl

    try {
      const { result } = renderHook(() => useMediaQuery(["(min-width: 768px)"]))
      expect(result.current).toEqual([false])

      act(() => fire("(min-width: 768px)", true))
      expect(result.current).toEqual([true])
    } finally {
      window.matchMedia = original
    }
  })

  test("returns same array reference when values unchanged", () => {
    const { impl, fire } = mockMatchMedia({ "(min-width: 768px)": true })
    const original = window.matchMedia
    window.matchMedia = impl

    try {
      const { result, rerender } = renderHook(() =>
        useMediaQuery(["(min-width: 768px)"]),
      )
      const first = result.current

      rerender()
      expect(result.current).toBe(first)

      act(() => fire("(min-width: 768px)", true))
      expect(result.current).toBe(first)
    } finally {
      window.matchMedia = original
    }
  })

  test("resubscribes to new queries when query array changes", () => {
    const { impl, fire } = mockMatchMedia({
      "(min-width: 768px)": false,
      "(min-width: 1024px)": true,
    })
    const original = window.matchMedia
    window.matchMedia = impl

    try {
      const { result, rerender } = renderHook(
        ({ queries }: { queries: string[] }) => useMediaQuery(queries),
        { initialProps: { queries: ["(min-width: 768px)"] } },
      )
      expect(result.current).toEqual([false])

      rerender({ queries: ["(min-width: 1024px)"] })
      expect(result.current).toEqual([true])

      act(() => fire("(min-width: 1024px)", false))
      expect(result.current).toEqual([false])

      act(() => fire("(min-width: 768px)", true))
      expect(result.current).toEqual([false])
    } finally {
      window.matchMedia = original
    }
  })

  test("works with custom getWindow", () => {
    const customWindow = {
      matchMedia: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(min-width: 0px)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    } as unknown as typeof window

    const { result } = renderHook(() =>
      useMediaQuery(["(min-width: 0px)", "(min-width: 768px)"], {
        getWindow: () => customWindow,
      }),
    )

    expect(customWindow.matchMedia).toHaveBeenCalledWith("(min-width: 0px)")
    expect(customWindow.matchMedia).toHaveBeenCalledWith("(min-width: 768px)")
    expect(result.current).toEqual([true, false])
  })
})
