import { useEffect } from "react"
import { useUpdateEffect } from "./useUpdateEffect"

/**
 * React hook to console-log a value when it mounts
 * and as it updates.
 *
 * @param label a label for the component
 * @param values parameters to log
 */
export function useLogger(label: string, ...values: any[]) {
  useEffect(() => {
    console.log(`${label} mounted:`, ...values)
    return () => {
      console.log(`${label} unmounted`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useUpdateEffect(() => {
    console.log(`${label} updated:`, ...values)
  })
}
