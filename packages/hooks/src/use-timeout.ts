import { useEffect } from "react"
import { useLatestRef } from "./use-latest-ref"

/**
 * React hook that provides a declarative `setTimeout`
 *
 * @param callback the callback to run after specified delay
 * @param delay the delay (in ms)
 */
export function useTimeout(callback: Function, delay: number | null) {
  const savedCallback = useLatestRef(callback)

  useEffect(() => {
    if (delay == null) return

    const timeoutId = setTimeout(() => {
      savedCallback.current?.()
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [delay, savedCallback])
}
