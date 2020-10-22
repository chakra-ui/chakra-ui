import * as React from "react"
import { useUnmountEffect } from "./use-unmount-effect"

export function useForceUpdate() {
  const unloadingRef = React.useRef(false)
  const [count, setCount] = React.useState(0)

  useUnmountEffect(() => {
    unloadingRef.current = true
  })

  return React.useCallback(() => {
    if (!unloadingRef.current) {
      setCount(count + 1)
    }
  }, [count])
}
