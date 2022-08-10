import { useEffect, useRef } from "react"

export function useUpdateEffect(
  callback: React.EffectCallback,
  deps: React.DependencyList,
) {
  const renderCycleRef = useRef(false)
  const effectCycleRef = useRef(false)

  useEffect(() => {
    const mounted = renderCycleRef.current
    const run = mounted && effectCycleRef.current
    if (run) {
      return callback()
    }
    effectCycleRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    renderCycleRef.current = true
    return () => {
      renderCycleRef.current = false
    }
  }, [])
}
