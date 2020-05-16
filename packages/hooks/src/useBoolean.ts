import { useCallback, useState } from "react"

type InitialState = boolean | (() => boolean)

/**
 * Reack hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState)

  const on = useCallback(() => {
    setValue(true)
  }, [])

  const off = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, { on, off, toggle }] as const
}
