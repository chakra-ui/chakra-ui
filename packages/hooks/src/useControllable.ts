import * as React from "react"
import { usePrevious } from "./usePrevious"
import { warn, runIfFn, isDefined } from "@chakra-ui/utils"

export function useControllableProp<T>(
  propValue: T | undefined,
  stateValue: T,
) {
  const { current: isControlled } = React.useRef(propValue !== undefined)
  const value =
    isControlled && typeof propValue !== "undefined" ? propValue : stateValue
  return [isControlled, value] as const
}

export interface ControllableStateHookProps<T> {
  /**
   * The value to used in controlled mode
   */
  value?: T
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue: T | (() => T)
  /**
   * The callback fired when the value changes
   */
  onChange?: (nextValue: T) => void
  /**
   * The condition to update the state
   */
  shouldUpdate?: boolean
  /**
   * The component name (for warnings)
   */
  name?: string
  /**
   * A mapping for the props to give more contextual warning messages.
   *
   * In some components `value` might be called `index`, and defaultValue
   * might be called `defaultIndex`, so this map helps us generate
   * contextual warning messages
   */
  propsMap?: {
    value?: string
    defaultValue?: string
    onChange?: string
  }
}

const defaultPropsMap = {
  value: "value",
  defaultValue: "defaultValue",
  onChange: "onChange",
}

/**
 * React hook for using controlling component state.
 * @param props
 */
export function useControllableState<T>(props: ControllableStateHookProps<T>) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = true,
    name = "Component",
    propsMap = defaultPropsMap,
  } = props

  const [valueState, setValue] = React.useState(defaultValue as T)

  const isControlled = isDefined(valueProp)
  const wasControlled = usePrevious(isControlled)

  const prevMode = wasControlled ? "a controlled" : "an uncontrolled"
  const mode = isControlled ? "uncontrolled" : "controlled"

  // don't switch from controlled to uncontrolled
  warn({
    condition: Boolean(isControlled) !== Boolean(wasControlled),
    message:
      `Warning: ${name} is changing from ${prevMode} to ${mode} component. ` +
      `Components should not switch from controlled to uncontrolled (or vice versa). ` +
      `Decide between using controlled or uncontrolled for the lifetime of the component. ` +
      `More info: https://fb.me/react-controlled-components`,
  })

  // value and defaultValue are mutually exclusive, use one or the other
  warn({
    condition: isDefined(defaultValue) && isDefined(valueProp),
    message:
      `Warning: You provided both '${propsMap["value"]}' and '${propsMap["defaultValue"]}' to ${name}. ` +
      `components must be either controlled or uncontrolled. If you want a controlled component, ` +
      `use the '${propsMap["value"]}' with an '${propsMap["onChange"]}' handler. ` +
      `If you want an uncontrolled component, remove the ${propsMap["value"]} prop and use '${propsMap["defaultValue"]}' instead. "` +
      `More info: https://fb.me/react-controlled-components`,
  })

  const value = isControlled ? (valueProp as T) : valueState

  const updateValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      if (!shouldUpdate) return

      if (!isControlled) setValue(next)

      const nextValue = runIfFn(next, value)

      onChange?.(nextValue)
    },
    [onChange, shouldUpdate, isControlled, value],
  )

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}
