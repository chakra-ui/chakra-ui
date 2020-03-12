import * as React from "react"

export function useTimeout(callback: Function, delay: number | null) {
  const savedCallback = React.useRef<Function>()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    if (delay == null) return

    const timeoutId = setTimeout(() => {
      savedCallback.current?.()
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [delay])
}
