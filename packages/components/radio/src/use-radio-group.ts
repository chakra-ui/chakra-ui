import { isObject } from "@chakra-ui/shared-utils"
import { mergeRefs } from "@chakra-ui/react-use-merge-refs"
import { useCallback, useRef, useState, useId } from "react"
import { InputDOMAttributes, PropGetter } from "@chakra-ui/react-types"

type EventOrValue = React.ChangeEvent<HTMLInputElement> | string | number

function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target)
}

export interface UseRadioGroupProps {
  /**
   * The value of the radio to be `checked`
   * (in controlled mode)
   */
  value?: string
  /**
   * The value of the radio to be `checked`
   * initially (in uncontrolled mode)
   */
  defaultValue?: string
  /**
   * Function called once a radio is checked
   * @param nextValue the value of the checked radio
   */
  onChange?(nextValue: string): void
  /**
   * If `true`, all wrapped radio inputs will be disabled
   *
   * @default false
   */
  isDisabled?: boolean

  /**
   * If `true` and `isDisabled` is true, all wrapped radio inputs will remain
   * focusable but not interactive.
   *
   * @default false
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
   *
   * @default false
   */
  isNative?: boolean
}

/**
 * `useRadioGroup` is a custom hook that provides all the state management logic for a group of radios.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-radio-group
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

  const [valueState, setValue] = useState<string | number>(defaultValue || "")
  const isControlled = typeof valueProp !== "undefined"
  const value = isControlled ? valueProp : valueState

  const ref = useRef<any>(null)

  const focus = useCallback(() => {
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
  const uuid = useId()
  const fallbackName = `radio-${uuid}`
  const name = nameProp || fallbackName

  const onChange = useCallback(
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

  const getRootProps: PropGetter = useCallback(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: mergeRefs(forwardedRef, ref),
      role: "radiogroup",
    }),
    [],
  )

  const getRadioProps: PropGetter<
    InputDOMAttributes & { isChecked?: boolean },
    InputDOMAttributes
  > = useCallback(
    (props = {}, ref = null) => {
      const checkedKey = isNative ? "checked" : "isChecked"
      return {
        ...props,
        ref,
        name,
        [checkedKey]: value != null ? props.value === value : undefined,
        onChange(event) {
          onChange(event as any)
        },
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
