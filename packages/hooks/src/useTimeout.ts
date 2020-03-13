import * as React from "react"
import useLatestRef from "./useLatestRef"

export function useTimeout(callback: Function, delay: number | null) {
  const savedCallback = useLatestRef(callback)

  React.useEffect(() => {
    if (delay == null) return

    const timeoutId = setTimeout(() => {
      savedCallback.current?.()
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [delay, savedCallback])
}
