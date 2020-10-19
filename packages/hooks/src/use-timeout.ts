import * as React from "react"
import { useLatestRef } from "./use-latest-ref"

/**
 * React hook that provides a declarative `setTimeout`
 *
 * @param callback the callback to run after specified delay
 * @param delay the delay (in ms)
 */
export function useTimeout(callback: Function, delay: number | null) {
  const savedCallback = useLatestRef(callback)

  React.useEffect(() => {
    if (delay == null) return undefined

    let timeoutId: number | null = null

    timeoutId = window.setTimeout(() => {
      savedCallback.current?.()
    }, delay)

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [delay, savedCallback])
}
