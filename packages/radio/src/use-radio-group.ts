import { useControllableProp, useId } from "@chakra-ui/hooks"
import { StringOrNumber, isInputEvent } from "@chakra-ui/utils"
import * as React from "react"
import { mergeRefs, PropGetter } from "@chakra-ui/react-utils"

type EventOrValue = React.ChangeEvent<HTMLInputElement> | StringOrNumber

export interface UseRadioGroupProps {
  /**
   * The value of the radio to be `checked`
   * (in controlled mode)
   */
  value?: StringOrNumber
  /**
   * The value of the radio to be `checked`
   * initially (in uncontrolled mode)
   */
  defaultValue?: StringOrNumber
  /**
   * Function called once a radio is checked
   * @param nextValue the value of the checked radio
   */
  onChange?(nextValue: string): void
  /**
   * If `true`, all wrapped radio inputs will be disabled
   */
  isDisabled?: boolean

  /**
   * If `true` and `isDisabled` is true, all wrapped radio inputs will remain
   * focusable but not interactive.
   */
  isFocusable?: boolean
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
}

type RadioPropGetter = PropGetter<
  HTMLInputElement,
  {
    onChange?: (e: EventOrValue) => void
    value?: StringOrNumber
    /**
     * checked is defined if isNative=true
     */
    checked?: boolean
    /**
     * isChecked is defined if isNative=false
     */
    isChecked?: boolean
  } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "size" | "value"
  >
>

/**
 * React hook to manage a group of radio inputs
 */
export function useRadioGroup(props: UseRadioGroupProps = {}) {
  const {
    onChange: onChangeProp,
    value: valueProp,
    defaultValue,
    name: nameProp,
    isDisabled,
    isFocusable,
    isNative,
    ...htmlProps
  } = props

  const [valueState, setValue] = React.useState<StringOrNumber>(
    defaultValue || "",
  )
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  const ref = React.useRef<any>(null)

  const focus = React.useCallback(() => {
    const rootNode = ref.current
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
  const fallbackName = useId(undefined, `radio`)
  const name = nameProp || fallbackName

  const onChange = React.useCallback(
    (eventOrValue: EventOrValue) => {
      const nextValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue

      if (!isControlled) {
        setValue(nextValue)
      }

      onChangeProp?.(String(nextValue))
    },
    [onChangeProp, isControlled],
  )

  const getRootProps: PropGetter = React.useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: mergeRefs(forwardedRef, ref),
      role: "radiogroup",
    }),
    [],
  )

  const getRadioProps: RadioPropGetter = React.useCallback(
    (props = {}, ref = null) => {
      const checkedKey = isNative ? "checked" : "isChecked"
      return {
        ...props,
        ref,
        name,
        [checkedKey]: value != null ? props.value === value : undefined,
        onChange,
        "data-radiogroup": true,
      }
    },
    [isNative, name, onChange, value],
  )

  return {
    getRootProps,
    getRadioProps,
    name,
    ref,
    focus,
    setValue,
    value,
    onChange,
    isDisabled,
    isFocusable,
    htmlProps,
  }
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>
