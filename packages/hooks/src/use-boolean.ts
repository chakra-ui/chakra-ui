import { useState } from "react"

type InitialState = boolean | (() => boolean)

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState)
  const [switches] = useState(() => ({
    on: () => setValue(true),
    off: () => setValue(false),
    toggle: () => setValue(prev => !prev),
  }))

  return [value, switches] as const
}
