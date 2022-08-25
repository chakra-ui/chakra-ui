import { useCallback, useRef, useState } from "react"
import { useUnmountEffect } from "./use-unmount-effect"

export function useForceUpdate() {
  const unloadingRef = useRef(false)
  const [count, setCount] = useState(0)

  useUnmountEffect(() => {
    unloadingRef.current = true
  })

  return useCallback(() => {
    if (!unloadingRef.current) {
      setCount(count + 1)
    }
  }, [count])
}
