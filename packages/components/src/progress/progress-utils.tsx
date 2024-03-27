import { valueToPercent } from "@chakra-ui/utils"
import { keyframes } from "@emotion/react"

export const spinAnim = keyframes({
  "0%": {
    strokeDasharray: "1, 400",
    strokeDashoffset: "0",
  },
  "50%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-100",
  },
  "100%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-260",
  },
})

export const rotateAnim = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

export const progressAnim = keyframes({
  "0%": { left: "-40%" },
  "100%": { left: "100%" },
})

export const stripeAnim = keyframes({
  from: { backgroundPosition: "1rem 0" },
  to: { backgroundPosition: "0 0" },
})

export interface ProgressPropsOptions {
  value?: number
  min?: number
  max?: number
  valueText?: string
  getValueText?(value: number, percent: number): string
}

export function getProgressProps(options: ProgressPropsOptions) {
  const { value = 0, min = 0, max = 100, valueText, getValueText } = options

  const percent = valueToPercent(value, min, max)

  function getAriaValueText() {
    if (value == null) return
    return getValueText?.(value, percent) ?? valueText
  }

  return {
    min,
    max,
    percent,
    value,
    valueText: getAriaValueText(),
  }
}

export type ProgressPropsReturn = ReturnType<typeof getProgressProps>
