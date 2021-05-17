import { useCallbackRef, useControllableProp } from "@chakra-ui/hooks"
import {
  clampValue,
  countDecimalPlaces,
  maxSafeInteger,
  minSafeInteger,
  StringOrNumber,
  toPrecision,
} from "@chakra-ui/utils"
import { useCallback, useState } from "react"

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
   *
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   *
   * - If `false`, the value will be allowed to go out of range.
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

  const onChangeProp = useCallbackRef(onChange)

  const [valueState, setValue] = useState<StringOrNumber>(() => {
    if (defaultValue == null) return ""
    return cast(defaultValue, stepProp, precisionProp) ?? ""
  })

  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  const decimalPlaces = getDecimalPlaces(parse(value), stepProp)

  const precision = precisionProp ?? decimalPlaces

  const update = useCallback(
    (next: StringOrNumber) => {
      if (next === value) return
      if (!isControlled) {
        setValue(next.toString())
      }
      onChangeProp?.(next.toString(), parse(next))
    },
    [onChangeProp, isControlled, value],
  )

  // Function to clamp the value and round it to the precision
  const clamp = useCallback(
    (value: number) => {
      let nextValue = value

      if (keepWithinRange) {
        nextValue = clampValue(nextValue, min, max)
      }

      return toPrecision(nextValue, precision)
    },
    [precision, keepWithinRange, max, min],
  )

  const increment = useCallback(
    (step = stepProp) => {
      let next: StringOrNumber

      /**
       * Let's follow the native browser behavior for
       * scenarios where the input starts empty ("")
       */
      if (value === "") {
        /**
         * If `min` is set, native input, starts at the `min`.
         * Else, it starts at `step`
         */
        next = parse(step)
      } else {
        next = parse(value) + step
      }

      next = clamp(next as number)
      update(next)
    },
    [clamp, stepProp, update, value],
  )

  const decrement = useCallback(
    (step = stepProp) => {
      let next: StringOrNumber

      // Same thing here. We'll follow native implementation
      if (value === "") {
        next = parse(-step)
      } else {
        next = parse(value) - step
      }

      next = clamp(next as number)
      update(next)
    },
    [clamp, stepProp, update, value],
  )

  const reset = useCallback(() => {
    let next: StringOrNumber
    if (defaultValue == null) {
      next = ""
    } else {
      next = cast(defaultValue, stepProp, precisionProp) ?? min
    }
    update(next)
  }, [defaultValue, precisionProp, stepProp, update, min])

  const castValue = useCallback(
    (value: StringOrNumber) => {
      const nextValue = cast(value, stepProp, precision) ?? min
      update(nextValue)
    },
    [precision, stepProp, update, min],
  )

  const valueAsNumber = parse(value)

  /**
   * Common range checks
   */
  const isOutOfRange = valueAsNumber > max || valueAsNumber < min
  const isAtMax = valueAsNumber === max
  const isAtMin = valueAsNumber === min

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
    setValue,
  }
}

export type UseCounterReturn = ReturnType<typeof useCounter>

function parse(value: StringOrNumber) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""))
}

function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value))
}

function cast(value: StringOrNumber, step: number, precision?: number) {
  const parsedValue = parse(value)
  if (Number.isNaN(parsedValue)) return undefined
  const decimalPlaces = getDecimalPlaces(parsedValue, step)
  return toPrecision(parsedValue, precision ?? decimalPlaces)
}
