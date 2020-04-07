import { useControllableProp, useId } from "@chakra-ui/hooks"
import { Dict, isInputEvent, mergeRefs } from "@chakra-ui/utils"
import * as React from "react"

type Value = string | number

type EventOrValue = React.ChangeEvent<HTMLInputElement> | Value

export interface UseRadioGroupProps {
  /**
   * The value of the radio to be `checked`
   * (in controlled mode)
   */
  value?: Value
  /**
   * The value of the radio to be `checked`
   * initially (in uncontrolled mode)
   */
  defaultValue?: Value
  /**
   * Function called once a radio is checked
   * @param nextValue the value of the checked radio
   */
  onChange?(nextValue: Value): void
  /**
   * The `name` attribute forwarded to each `radio` element
   */
  name?: string
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`.
   *
   * This assumes, you're using native radio inputs
   */
  isNative?: boolean
  /**
   * The `ref` of the wrapper element of the radio group
   */
  ref?: React.Ref<any>
}

/**
 * useRadioGroup
 *
 * React hook to manage a group of radio inputs
 */
export function useRadioGroup(props: UseRadioGroupProps = {}) {
  const {
    onChange: onChangeProp,
    value: valueProp,
    defaultValue,
    isNative,
  } = props

  const [valueState, setValue] = React.useState<Value>(defaultValue || "")

  const [isControlled, derivedValue] = useControllableProp(
    valueProp,
    valueState,
  )

  const rootRef = React.useRef<any>(null)

  const focus = React.useCallback(() => {
    const rootNode = rootRef.current
    if (!rootNode) return

    let query = `input:not(:disabled):checked`

    const firstEnabledAndCheckedInput = rootNode.querySelector(
      query,
    ) as HTMLElement

    if (firstEnabledAndCheckedInput) {
      firstEnabledAndCheckedInput.focus()
      return
    }

    query = `input:not(:disabled)`

    const firstEnabledInput = rootNode.querySelector(query) as HTMLElement
    firstEnabledInput?.focus()
  }, [])

  /**
   * All radio options must use the same name
   */
  const name = useId(props.name, `radio`)

  const onChange = React.useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue

      if (!isControlled) {
        setValue(nextValue)
      }

      onChangeProp?.(nextValue)
    },
    [onChangeProp, isControlled],
  )

  return {
    actions: {
      focus,
      setValue,
    },
    state: { value: derivedValue },
    getRadioProps: (props: Dict = {}) => ({
      ...props,
      name,
      onChange,
      value: props.value,
      ...(isNative
        ? { checked: props.value === derivedValue }
        : { isChecked: props.value === derivedValue }),
    }),
    getRootProps: (props: Dict = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, rootRef),
      role: "radiogroup",
    }),
  }
}
