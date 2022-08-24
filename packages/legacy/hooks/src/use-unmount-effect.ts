import { useEffect } from "react"

export function useUnmountEffect(fn: () => void, deps: any[] = []) {
  return useEffect(
    () => () => fn(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}
