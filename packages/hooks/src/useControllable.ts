/* eslint-disable react-hooks/exhaustive-deps */
import { runIfFn, warn } from "@chakra-ui/utils"
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

export interface ControllableStateHookProps<T> {
  /**
   * The value to used in controlled mode
   */
  value?: T
  /**
   * The initial value to be used, in uncontrolled mode
   */
  defaultValue?: T | (() => T)
  /**
   * The callback fired when the value changes
   */
  onChange?: (nextValue: T) => void
  /**
   * The condition to update the state
   */
  shouldUpdate?: (prevState: T, state: T) => boolean
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
    shouldUpdate = () => true,
    name = "Component",
    propsMap = defaultPropsMap,
  } = props

  const [valueState, setValue] = React.useState(defaultValue as T)
  const { current: isControlled } = React.useRef(valueProp !== undefined)

  // don't switch from controlled to uncontrolled
  React.useEffect(() => {
    const nextIsControlled = valueProp !== undefined

    const nextMode = nextIsControlled ? "a controlled" : "an uncontrolled"
    const mode = isControlled ? "a controlled" : "an uncontrolled"

    warn({
      condition: isControlled !== nextIsControlled,
      message:
        `Warning: ${name} is changing from ${mode} to ${nextMode} component. ` +
        `Components should not switch from controlled to uncontrolled (or vice versa). ` +
        `Use the '${propsMap["value"]}' with an '${propsMap["onChange"]}' handler. ` +
        `If you want an uncontrolled component, remove the ${propsMap["value"]} prop and use '${propsMap["defaultValue"]}' instead. "` +
        `More info: https://fb.me/react-controlled-components`,
    })
  }, [valueProp, isControlled, name])

  const { current: _defaultValue } = React.useRef(defaultValue)

  React.useEffect(() => {
    warn({
      condition: _defaultValue !== defaultValue,
      message:
        `Warning: A component is changing the default value of an uncontrolled ${name} after being initialized. ` +
        `To suppress this warning opt to use a controlled ${name}.`,
    })
  }, [JSON.stringify(defaultValue)])

  const value = isControlled ? (valueProp as T) : valueState

  const updateValue = React.useCallback(
    (next: React.SetStateAction<T>) => {
      const nextValue = runIfFn(next, value)
      const shouldUpdateState = shouldUpdate(value, nextValue)

      if (!shouldUpdateState) return

      if (!isControlled) {
        setValue(next)
      }

      onChange?.(nextValue)
    },
    [onChange, shouldUpdate, isControlled, value],
  )

  return [value, updateValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}
