"use client"

import { useState } from "react"

/**
 * @see https://react.dev/reference/react/useState#storing-information-from-previous-renders
 */
export function usePrevious<TValue>(value: TValue) {
  const [prevTrackedVal, setPrevTrackedVal] = useState<TValue | undefined>()
  const [prevVal, setPrevVal] = useState<TValue | undefined>()

  if (value !== prevTrackedVal) {
    setPrevTrackedVal(value)
    setPrevVal(prevTrackedVal)
  }

  return prevVal
}
