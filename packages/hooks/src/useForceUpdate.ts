import { useState, useCallback } from "react"

/**
 * React hook for force a component to re-render
 */
export function useForceUpdate() {
  const [count, setCount] = useState(0)
  const forceUpdate = useCallback(() => setCount(count + 1), [count])
  return forceUpdate
}
