import { renderHook } from "@testing-library/react"
import { usePrevious } from "../src/hooks/use-previous"

describe("usePrevious", () => {
  test("should return undefined on initial render", () => {
    const { result } = renderHook(() => usePrevious("a"))

    expect(result.current).toBeUndefined()
  })

  test("should track previous value across updates", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "a" },
    })

    expect(result.current).toBeUndefined()

    rerender({ value: "b" })
    expect(result.current).toBe("a")

    rerender({ value: "c" })
    expect(result.current).toBe("b")
  })

  test("should not treat NaN as changed when value is stable", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: Number.NaN },
    })

    expect(result.current).toBeUndefined()

    rerender({ value: Number.NaN })
    expect(result.current).toBeUndefined()
  })

  test("should treat -0 and 0 as different values", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: -0 },
    })

    expect(result.current).toBeUndefined()

    rerender({ value: 0 })
    expect(Object.is(result.current, -0)).toBe(true)
  })
})
