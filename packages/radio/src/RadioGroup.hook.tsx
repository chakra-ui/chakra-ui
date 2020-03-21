import * as React from "react"
import { useControllableProp, useId } from "@chakra-ui/hooks"
import { isInputEvent, mergeRefs } from "@chakra-ui/utils"

type Value = string | number
type EventOrValue = React.ChangeEvent<HTMLInputElement> | Value

export interface RadioGroupHookProps {
  value?: Value
  defaultValue?: Value
  onChange?(nextValue: Value): void
  name?: string
  /**
   * If `true`, input elements will receive
   * `checked` attribute rather than the
   * default `isChecked`
   */
  isNative?: boolean
}

export function useRadioGroup(props: RadioGroupHookProps) {
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

  const rootRef = React.useRef<HTMLElement>(null)

  const focus = React.useCallback(() => {
    const rootNode = rootRef.current
    if (!rootNode) return

    const { querySelector } = rootNode
    let query = `input:not(:disabled):checked`

    const firstEnabledAndCheckedInput = querySelector(query) as HTMLElement

    if (firstEnabledAndCheckedInput) {
      firstEnabledAndCheckedInput.focus()
      return
    }

    query = `input:not(:disabled)`

    const firstEnabledInput = querySelector(query) as HTMLElement
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
    getRadioProps: (props: any = {}) => ({
      ...props,
      name,
      onChange,
      value: props.value,
      ...(isNative
        ? { checked: props.value === derivedValue }
        : { isChecked: props.value === derivedValue }),
    }),
    getRootProps: (props: any = {}) => ({
      ...props,
      ref: mergeRefs(props.ref, rootRef),
      role: "radiogroup",
    }),
  }
}
