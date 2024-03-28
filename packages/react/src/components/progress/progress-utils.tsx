"use client"

import { valueToPercent } from "@chakra-ui/utils"

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
