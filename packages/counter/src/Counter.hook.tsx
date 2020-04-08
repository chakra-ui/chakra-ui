import { useControllableProp } from "@chakra-ui/hooks"
import {
  countDecimalPlaces,
  clampValue,
  maxSafeInteger,
  minSafeInteger,
  toPrecision,
  StringOrNumber,
} from "@chakra-ui/utils"
import * as React from "react"

export interface UseCounterProps {
  /**
   * The callback fired when the value changes
   */
  onChange?(valueAsString: string, valueAsNumber: number): void
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

  const [valueState, setValue] = React.useState<StringOrNumber>(() => {
    if (!defaultValue) return ""
    return cast(defaultValue, stepProp, precisionProp)
  })

  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  // let value: StringOrNumber = computedValue

  const decimalPlaces = getDecimalPlaces(parse(value), stepProp)

  const precision = precisionProp ?? decimalPlaces

  // value = toPrecision(value, precision)

  /**
   * While the state can be a number/string (due to precision logic)
   * We'll create a state to store only the number value
   */
  // const [valueAsNumber, setValueAsNumber] = React.useState<number>(parse(value))

  const update = React.useCallback(
    (next: StringOrNumber) => {
      if (!isControlled) {
        setValue(next.toString())
      }
      onChange?.(next.toString(), parse(next))
    },
    [onChange, isControlled],
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
    (step = stepProp) => {
      let nextValue: StringOrNumber = parse(value) + step
      nextValue = clamp(nextValue as number)
      update(nextValue)
    },
    [clamp, stepProp, update, value],
  )

  // Function to decrement the value based on specified step
  const decrement = React.useCallback(
    (step = stepProp) => {
      let nextValue: StringOrNumber = parse(value) - step
      nextValue = clamp(nextValue as number)
      update(nextValue)
    },
    [clamp, stepProp, update, value],
  )

  // Function to reset the state to the initial value or 0
  const reset = React.useCallback(() => {
    update(defaultValue ?? 0)
  }, [defaultValue, update])

  const castValue = React.useCallback(
    (value: StringOrNumber) => {
      update(cast(value, stepProp, precision))
    },
    [precision, stepProp, update],
  )

  const valueAsNumber = parse(value)

  // Common range checks
  const isOutOfRange = valueAsNumber > max || valueAsNumber < min
  const isAtMax = valueAsNumber == max
  const isAtMin = valueAsNumber == min

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
    cast: castValue,
  }
}

export type UseCounterReturn = ReturnType<typeof useCounter>

function parse(value: StringOrNumber) {
  return parseFloat(value.toString().replace(/[^\w\.-]+/g, ""))
}

function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value))
}

function cast(value: StringOrNumber, step: number, precision?: number) {
  const decimalPlaces = getDecimalPlaces(parse(value), step)
  return toPrecision(parse(value), precision ?? decimalPlaces)
}
