import { hooks } from "@chakra-ui/test-utils"
import { useCounter } from "../src/use-counter"

test("should increment", () => {
  const { result } = hooks.render(() => useCounter({ defaultValue: 0 }))
  hooks.act(result.current.increment)
  expect(result.current.valueAsNumber).toBe(1)
})

test("should decrement", () => {
  const { result } = hooks.render(() => useCounter({ defaultValue: 0 }))
  hooks.act(result.current.decrement)
  expect(result.current.valueAsNumber).toBe(-1)
})

test("should increment with step", () => {
  const { result } = hooks.render(() =>
    useCounter({ defaultValue: 0, step: 5 }),
  )
  hooks.act(result.current.decrement)
  expect(result.current.valueAsNumber).toBe(-5)
})

test("should not exceed max", () => {
  const { result } = hooks.render(() =>
    useCounter({ defaultValue: 0, step: 5, max: 4 }),
  )
  hooks.act(result.current.increment)
  expect(result.current.valueAsNumber).toBe(4)
})

test("should exceed max but be out-of-range", () => {
  const { result } = hooks.render(() =>
    useCounter({ defaultValue: 0, step: 5, max: 4, keepWithinRange: false }),
  )
  hooks.act(result.current.increment)
  expect(result.current.valueAsNumber).toBe(5)
  expect(result.current.isOutOfRange).toBeTruthy()
})

test("should increment with small step", () => {
  const { result } = hooks.render(() =>
    useCounter({ defaultValue: 0.2, step: 0.1, max: 4 }),
  )
  hooks.act(result.current.increment)
  expect(result.current.valueAsNumber).toBe(0.3)
})

// https://github.com/wKovacs64/use-stepper/blob/master/src/__tests__/use-stepper.test.tsx
