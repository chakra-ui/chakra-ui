"use client"

import { useState } from "react"

/**
 * @see https://react.dev/reference/react/useState#storing-information-from-previous-renders
 */
export function usePrevious<Value>(value: Value) {
  const [prevTrackedVal, setPrevTrackedVal] = useState<Value | undefined>()
  const [prevVal, setPrevVal] = useState<Value | undefined>()

  if (value !== prevTrackedVal) {
    setPrevTrackedVal(value)
    setPrevVal(prevTrackedVal)
  }

  return prevVal
}
