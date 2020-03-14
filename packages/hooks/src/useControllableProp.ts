import * as React from "react"

export function useControllableProp<T>(
  propValue: T | undefined,
  stateValue: T,
) {
  const { current: isControlled } = React.useRef(propValue !== undefined)
  const value =
    isControlled && typeof propValue !== "undefined" ? propValue : stateValue
  return [isControlled, value] as const
}

interface ControllableStateHookProps<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  shouldUpdate?: boolean
}

export function useControllableState<T>(props: ControllableStateHookProps<T>) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = true,
  } = props

  const [valueState, setValue] = React.useState(defaultValue as T)

  const { current: isControlled } = React.useRef(valueProp !== undefined)

  const value =
    isControlled && typeof valueProp !== "undefined" ? valueProp : valueState

  const updateValue = React.useCallback(
    (nextValue: T) => {
      if (!shouldUpdate) return

      if (!isControlled) {
        setValue(nextValue)
      }

      onChange?.(nextValue)
    },
    [onChange, shouldUpdate, isControlled],
  )

  return [value, updateValue] as const
}
