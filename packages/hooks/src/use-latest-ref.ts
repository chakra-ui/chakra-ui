import * as React from "react"

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 * @deprecated `useLatestRef` will be removed in a future version.
 */
export function useLatestRef<T>(value: T) {
  const ref = React.useRef(value)

  React.useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
