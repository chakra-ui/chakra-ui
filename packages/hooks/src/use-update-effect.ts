import { useRef, useEffect } from "react"

/**
 * React effect hook that invokes only on update.
 * It doesn't invoke on mount
 */
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) {
      return effect()
    }
    mounted.current = true
    return undefined
  }, deps)

  return mounted.current
}
