import { useEffect, useMemo, useRef } from "react"

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  return useMemo<T>((...args) => callbackRef.current?.(...args), [])
}
