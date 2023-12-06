import { useRef, useEffect } from "react"

export function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current as T
}
