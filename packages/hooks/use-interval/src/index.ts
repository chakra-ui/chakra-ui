import { useEffect } from "react"
import { useCallbackRef } from "@chakra-ui/react-use-callback-ref"

/**
 * React Hook that provides a declarative `setInterval`
 *
 * @param callback the callback to execute at interval
 * @param delay the `setInterval` delay (in ms)
 */
export function useInterval(callback: () => void, delay = 0) {
  const fn = useCallbackRef(callback)

  useEffect(() => {
    const tick = () => fn()
    const intervalId = window.setInterval(tick, delay)

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [delay, fn])
}
