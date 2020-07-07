import { isFunction, isUndefined, valueToPercent } from "@chakra-ui/utils/src"
import { keyframes } from "@chakra-ui/system/src"

/**
 * CSS Animation for progress spin effect
 */

export const spin = keyframes`
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100;
  }

  100% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -260;
  }
`
/**
 * CSS Animation for progress rotate effect
 */

export const rotate = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

/**
 * CSS Animation for progress indeterminate effect
 */

export const progress = keyframes`
  0% { left: -40% }
  100% { left: 100% }
`

/**
 * CSS Animation for progress stripe effect
 */

export const stripe = keyframes`
  from { background-position: 1rem 0}
  to { background-position: 0 0 }
`

export interface GetProgressPropsOptions {
  value?: number
  min: number
  max: number
  valueText?: string
  getValueText?(value?: number, percent?: number): string
}

/**
 * Get the common `aria-*` attributes for both the linear and circular
 * progress components.
 */
export function getProgressProps(options: GetProgressPropsOptions) {
  const percent = options.value
    ? valueToPercent(options.value, options.min, options.max)
    : undefined

  // A progressbar is indeterminate when the `value` is undefined
  const isIndeterminate = isUndefined(options.value)

  return {
    bind: {
      "data-indeterminate": isIndeterminate ? "" : undefined,
      "aria-valuemax": options.max,
      "aria-valuemin": options.min,
      "aria-valuenow": isIndeterminate ? undefined : options.value,
      "aria-valuetext": isFunction(options.getValueText)
        ? options.getValueText(options.value, percent)
        : options.valueText,
      role: "progressbar",
    },
    percent,
  }
}
