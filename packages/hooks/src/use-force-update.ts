import * as React from "react"

/**
 * React hook for force a component to re-render
 */
export function useForceUpdate() {
  const [count, setCount] = React.useState(0)
  const forceUpdate = React.useCallback(() => setCount(count + 1), [count])
  return forceUpdate
}
