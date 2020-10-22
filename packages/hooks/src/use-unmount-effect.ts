import * as React from "react"

export function useUnmountEffect(fn: () => void) {
  return React.useEffect(() => () => fn(), [])
}
