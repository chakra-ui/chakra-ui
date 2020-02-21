import * as React from "react"

export function usePrevious<T>(value: T) {
  const valueRef = React.useRef<T | null>(null)

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  return valueRef.current as T
}

export default usePrevious
