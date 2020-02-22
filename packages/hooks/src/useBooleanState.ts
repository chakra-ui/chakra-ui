import * as React from "react"

export type InitialState = boolean | (() => boolean)

export function useBooleanState(initialState: InitialState) {
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

export default useBooleanState
