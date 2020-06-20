import * as React from "react"
import { useLatestRef } from "./use-latest-ref"

/**
 * React Hook that provides a declarative `setInterval`
 *
 * @param callback the callback to execute at interval
 * @param delay the `setInterval` delay (in ms)
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useLatestRef(callback)

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current?.()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, savedCallback])
}
