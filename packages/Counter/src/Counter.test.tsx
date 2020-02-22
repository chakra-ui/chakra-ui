import "@testing-library/jest-dom/extend-expect"
import { act, renderHook } from "@testing-library/react-hooks"
import { useCounter } from "./Counter"

test("should increment", () => {
  const { result } = renderHook(() => useCounter({ defaultValue: 0 }))
  act(result.current.increment)
  expect(result.current.value).toBe(1)
})

test("should decrement", () => {
  const { result } = renderHook(() => useCounter({ defaultValue: 0 }))
  act(result.current.decrement)
  expect(result.current.value).toBe(-1)
})

test("should increment with step", () => {
  const { result } = renderHook(() => useCounter({ defaultValue: 0, step: 5 }))
  act(result.current.decrement)
  expect(result.current.value).toBe(-5)
})

test("should not exceed max", () => {
  const { result } = renderHook(() =>
    useCounter({ defaultValue: 0, step: 5, max: 4 }),
  )
  act(result.current.increment)
  expect(result.current.value).toBe(4)
})

test("should exceed max but be out-of-range", () => {
  const { result } = renderHook(() =>
    useCounter({ defaultValue: 0, step: 5, max: 4, keepWithinRange: false }),
  )
  act(result.current.increment)
  expect(result.current.value).toBe(5)
  expect(result.current.isOutOfRange).toBeTruthy()
})

test("should increment with small step", () => {
  const { result } = renderHook(() =>
    useCounter({ defaultValue: 0.2, step: 0.1, max: 4 }),
  )
  act(result.current.increment)
  expect(result.current.value).toBe(0.3)
})
