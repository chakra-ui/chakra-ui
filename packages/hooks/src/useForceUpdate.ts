import * as React from "react"

export function useForceUpdate() {
  const [count, setCount] = React.useState(0)
  return React.useCallback(() => setCount(count + 1), [count])
}
