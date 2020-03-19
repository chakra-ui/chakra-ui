import * as React from "react"

type InitialState = boolean | (() => boolean)

/**
 * Reack hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export function useBooleanState(initialState: InitialState = false) {
  const [value, setValue] = React.useState(initialState)

  const on = React.useCallback(() => {
    setValue(true)
  }, [])

  const off = React.useCallback(() => {
    setValue(false)
  }, [])

  const toggle = React.useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, { on, off, toggle, set: setValue }] as const
}
