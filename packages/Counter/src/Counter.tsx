import { useControllableProp } from "@chakra-ui/hooks"
import {
  calculatePrecision,
  constrainValue,
  maxSafeInteger,
  minSafeInteger,
  roundToPrecision,
} from "@chakra-ui/utils"
import * as React from "react"

type Value = number | string

export interface CounterOptions {
  /**
   * The callback fired when the value changes
   */
  onChange?: (value?: Value, valueAsNumber?: number) => void
  /**
   * The number of decimal points used to round the value
   */
  precision?: number
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   */
  defaultValue?: number
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   */
  value?: number | string
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step?: number
  /**
   * The minimum value of the counter
   * @default -Infinity
   */
  min?: number
  /**
   * The maximum value of the counter
   * @default Infinity
   */
  max?: number
  /**
   * This controls the value update behavior in general.
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   * - Else, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange?: boolean
}

export function useCounter(props: CounterOptions) {
  const {
    onChange,
    precision: precisionProp,
    defaultValue,
    value: valueProp,
    step: stepProp = 1,
    min = minSafeInteger,
    max = maxSafeInteger,
    keepWithinRange,
  } = props

  const [valueState, setValue] = React.useState<Value>(defaultValue || 0)

  const [isControlled, value] = useControllableProp(valueProp, valueState)
  const [valueAsNumber, setValueAsNumber] = React.useState<number>(+value)

  const fallbackPrecision = Math.max(
    calculatePrecision(stepProp || 1),
    calculatePrecision(+value || 0),
  )

  const precision = precisionProp || fallbackPrecision

  const prevValue = React.useRef<Value>()

  const update = React.useCallback(
    (nextValue: Value) => {
      if (prevValue.current == nextValue) return

      if (!isControlled) {
        setValue(nextValue)
        // Update number state if it's not the same
        // "3.", "3.0" and "3" are considered the same
        const isSameValue = !isNaN(+nextValue) && +nextValue === valueAsNumber
        if (!isSameValue) {
          setValueAsNumber(+nextValue)
        }
      }
      if (onChange) {
        onChange(nextValue, Number(nextValue))
      }

      prevValue.current = nextValue
    },
    [onChange, isControlled, valueAsNumber],
  )

  const clamp = React.useCallback(
    (value: number) => {
      let nextValue = value
      if (keepWithinRange) {
        nextValue = constrainValue(nextValue, min, max)
      }
      return roundToPrecision(nextValue, precision)
    },
    [precision, keepWithinRange, max, min],
  )

  const increment = React.useCallback(
    (step: number = stepProp) => {
      let nextValue: string | number = +value + step
      nextValue = clamp(nextValue)
      update(nextValue)
    },
    [clamp, stepProp, update, value],
  )

  const decrement = React.useCallback(
    (step: number = stepProp) => {
      const nextValue = clamp(+value - step)
      update(nextValue)
    },
    [clamp, stepProp, update, value],
  )

  const reset = React.useCallback(() => update(defaultValue || 0), [
    defaultValue,
    update,
  ])

  const isOutOfRange = value > max || value < min
  const isAtMax = value == max
  const isAtMin = value == min

  return {
    // range checks
    isOutOfRange,
    isAtMax,
    isAtMin,
    precision,
    // state
    value,
    valueAsNumber,
    // actions
    update,
    clamp,
    reset,
    increment,
    decrement,
  }
}
