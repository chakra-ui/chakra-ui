"use client"

import { useState } from "react"

/**
 * @see https://react.dev/reference/react/useState#storing-information-from-previous-renders
 */
export function usePrevious<T>(value: T) {
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState<T | undefined>()

  if (!Object.is(value, current)) {
    setPrevious(current)
    setCurrent(value)
  }

  return previous
}
