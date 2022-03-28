import { useMemo, useState } from "react"

type InitialState = boolean | (() => boolean)

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState)
  const callbacks = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    [],
  )
  return [value, callbacks] as const
}
