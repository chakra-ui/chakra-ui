import * as React from "react"
import { useCallbackRef } from "./use-callback-ref"

/**
 * React Hook that provides a declarative `setInterval`
 *
 * @param callback the callback to execute at interval
 * @param delay the `setInterval` delay (in ms)
 */
export function useInterval(callback: () => void, delay: number | null) {
  const fn = useCallbackRef(callback)

  React.useEffect(() => {
    let intervalId: number | null = null
    const tick = () => fn()
    if (delay !== null) {
      intervalId = window.setInterval(tick, delay)
    }
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [delay, fn])
}
