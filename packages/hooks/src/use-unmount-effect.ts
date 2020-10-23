import * as React from "react"

export function useUnmountEffect(fn: () => void, deps: any[] = []) {
  return React.useEffect(() => () => fn(), deps)
}
