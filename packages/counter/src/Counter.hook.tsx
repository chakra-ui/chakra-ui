import { useControllableProp } from "@chakra-ui/hooks"
import {
  countDecimalPlaces,
  clampValue,
  maxSafeInteger,
  minSafeInteger,
  toPrecision,
} from "@chakra-ui/utils"
import * as React from "react"

type StringOrNumber = string | number

export interface UseCounterProps {
  /**
   * The callback fired when the value changes
   */
  onChange?: (valueAsNumber: number, valueAsString: string) => void
  /**
   * The number of decimal points used to round the value
   */
  precision?: number
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   */
  defaultValue?: StringOrNumber
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   */
  value?: StringOrNumber
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

export function useCounter(props: UseCounterProps = {}) {
  const {
    onChange,
    precision: precisionProp,
    defaultValue,
    value: valueProp,
    step: stepProp = 1,
    min = minSafeInteger,
    max = maxSafeInteger,
    keepWithinRange = true,
  } = props

  // Let's keep the current here and initialize it with the defaultValue
  const [valueState, setValue] = React.useState<StringOrNumber>(
    defaultValue || 0,
  )

  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  /**
   * While the state can be a number/string (due to precision logic)
   * We'll create a state to store only the number value
   */
  const [valueAsNumber, setValueAsNumber] = React.useState<number>(+value)

  /**
   * Get the decimal places from the value or step
   *
   * @example If no precision prop was passed and
   * value = 4, step = 0.01
   *
   * Then precision (or decimal places) is 2
   */
  const decimalPlaces = Math.max(
    countDecimalPlaces(stepProp || 1),
    countDecimalPlaces(+value || 0),
  )

  const precision = precisionProp || decimalPlaces

  // If we've reached the max and `keepWithinRange` is true
  // We don't want to fired unnecessary updates, let's store the prev value here
  const prevValue = React.useRef<StringOrNumber>()

  // Function to update value in state and invoke the `onChange` callback
  const update = React.useCallback(
    (nextValue: number | string) => {
      if (prevValue.current == nextValue) return

      if (!isControlled) {
        setValue(nextValue)
        // Update number state if it's not the same
        // "3.", "3.0" and "3" are considered the same
        const isSameValue = !isNaN(+nextValue) && +nextValue === valueAsNumber
        if (!isSameValue) setValueAsNumber(+nextValue)
      }
      onChange?.(+nextValue, nextValue.toString())
      prevValue.current = nextValue
    },
    [onChange, valueAsNumber, isControlled],
  )

  // Function to clamp the value and round it to the precision
  const clamp = React.useCallback(
    (value: number) => {
      let nextValue = value
      if (keepWithinRange) {
        nextValue = clampValue(nextValue, min, max)
      }
      return toPrecision(nextValue, precision)
    },
    [precision, keepWithinRange, max, min],
  )

  // Function to increment the value based on specified step
  const increment = React.useCallback(
    (step: number = stepProp) => {
      let nextValue: string | number = +value + step
      nextValue = clamp(nextValue)
      update(nextValue)
    },
    [clamp, stepProp, update, value],
  )

  // Function to decrement the value based on specified step
  const decrement = React.useCallback(
    (step: number = stepProp) => {
      const nextValue = clamp(+value - step)
      update(nextValue)
    },
    [clamp, stepProp, update, value],
  )

  // Function to reset the state to the initial value or 0
  const reset = React.useCallback(() => update(defaultValue || 0), [
    defaultValue,
    update,
  ])

  // Common range checks
  const isOutOfRange = value > max || value < min
  const isAtMax = value == max
  const isAtMin = value == min

  return {
    isOutOfRange,
    isAtMax,
    isAtMin,
    precision,
    value,
    valueAsNumber,
    update,
    reset,
    increment,
    decrement,
    clamp,
  }
}

export type UseCounterReturn = ReturnType<typeof useCounter>
