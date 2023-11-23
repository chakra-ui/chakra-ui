import { useCallback, useRef } from "react"

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
  deps: React.DependencyList = [],
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  return useCallback(((...args) => callbackRef.current?.(...args)) as T, [])
}
