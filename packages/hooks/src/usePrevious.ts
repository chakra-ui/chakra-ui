import * as React from "react"

/**
 * React hook that tracks previous value
 *
 * @param value the value to track
 */
export function usePrevious<T>(value: T) {
  const valueRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef.current as T
}
