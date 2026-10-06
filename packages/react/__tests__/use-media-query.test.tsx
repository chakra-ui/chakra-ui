import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { useMediaQuery } from "../src"

function mockMatchMedia(matches: Record<string, boolean>) {
  const listeners = new Map<string, Set<() => void>>()

  const impl = vi.fn().mockImplementation((query: string) => ({
    get matches() {
      return matches[query] ?? false
    },
    media: query,
    addEventListener: (_: string, cb: () => void) => {
      if (!listeners.has(query)) listeners.set(query, new Set())
      listeners.get(query)!.add(cb)
    },
    removeEventListener: (_: string, cb: () => void) => {
      listeners.get(query)?.delete(cb)
    },
  }))

  const fire = (query: string, next: boolean) => {
    matches[query] = next
    listeners.get(query)?.forEach((cb) => cb())
  }

  return { impl, fire }
}

describe("useMediaQuery", () => {
  let original: typeof window.matchMedia

  beforeEach(() => {
    original = window.matchMedia
  })

  afterEach(() => {
    window.matchMedia = original
  })

  test("evaluates the queries it is given", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 0px)": true,
      "(min-width: 768px)": false,
    })
    window.matchMedia = impl

    const { result } = renderHook(() =>
      useMediaQuery(["(min-width: 0px)", "(min-width: 768px)"]),
    )
    expect(result.current).toEqual([true, false])
  })

  test("fallback does not override client matchMedia values", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 0px)": false,
      "(min-width: 768px)": false,
    })
    window.matchMedia = impl

    const { result } = renderHook(() =>
      useMediaQuery(["(min-width: 0px)", "(min-width: 768px)"], {
        fallback: [true, true],
      }),
    )
    expect(result.current).toEqual([false, false])
  })

  test("updates when a media query match changes", () => {
    const { impl, fire } = mockMatchMedia({ "(min-width: 768px)": false })
    window.matchMedia = impl

    const { result } = renderHook(() => useMediaQuery(["(min-width: 768px)"]))
    expect(result.current).toEqual([false])

    act(() => fire("(min-width: 768px)", true))
    expect(result.current).toEqual([true])
  })

  test("returns a stable array reference when nothing changes", () => {
    const { impl } = mockMatchMedia({ "(min-width: 768px)": true })
    window.matchMedia = impl

    const { result, rerender } = renderHook(() =>
      useMediaQuery(["(min-width: 768px)"]),
    )
    const first = result.current

    rerender()
    expect(result.current).toBe(first)
  })

  test("re-evaluates when a query changes", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 30rem)": true,
      "(min-width: 90rem)": false,
    })
    window.matchMedia = impl

    const { result, rerender } = renderHook(
      ({ query }: { query: string }) => useMediaQuery([query]),
      { initialProps: { query: "(min-width: 90rem)" } },
    )
    expect(result.current).toEqual([false])

    rerender({ query: "(min-width: 30rem)" })
    expect(result.current).toEqual([true])
  })

  test("re-evaluates when a query is removed", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 0px)": true,
      "(min-width: 48rem)": true,
      "(min-width: 90rem)": false,
    })
    window.matchMedia = impl

    const { result, rerender } = renderHook(
      ({ queries }: { queries: string[] }) => useMediaQuery(queries),
      { initialProps: { queries: ["(min-width: 0px)", "(min-width: 48rem)"] } },
    )
    expect(result.current).toEqual([true, true])

    rerender({ queries: ["(min-width: 90rem)"] })
    expect(result.current).toEqual([false])
  })

  test("re-evaluates when a comma splits one query into two", () => {
    const { impl } = mockMatchMedia({
      "(min-width: 0px),(min-width: 48rem)": false,
      "(min-width: 0px)": true,
      "(min-width: 48rem)": true,
    })
    window.matchMedia = impl

    const { result, rerender } = renderHook(
      ({ queries }: { queries: string[] }) => useMediaQuery(queries),
      { initialProps: { queries: ["(min-width: 0px),(min-width: 48rem)"] } },
    )
    expect(result.current).toEqual([false])

    rerender({ queries: ["(min-width: 0px)", "(min-width: 48rem)"] })
    expect(result.current).toEqual([true, true])
  })
})
