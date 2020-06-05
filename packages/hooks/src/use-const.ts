import { useState } from "react"

type InitialValue<T> = T | (() => T)

/**
 * React hook that returns a constant value.
 * It always returns the very first value passed to `initialState`,
 * even if it changes between re-renders.
 *
 * @param initialValue the initial value
 */
export function useConst<T>(initialValue: InitialValue<T>): T {
  const [value] = useState(initialValue)
  return value
}
