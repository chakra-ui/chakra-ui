"use client"

import { mergeRefs } from "@chakra-ui/hooks"
import { PropGetter, isObject } from "@chakra-ui/utils"
import { useCallback, useId, useRef, useState } from "react"

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
  disabled?: boolean

  /**
   * If `true` and `disabled` is true, all wrapped radio inputs will remain
   * focusable but not interactive.
   *
   * @default false
   */
  focusable?: boolean
  /**
   * The `name` attribute forwarded to each `radio` element
   */
  name?: string
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
    disabled,
    focusable,
  } = props

  const [valueState, setValue] = useState<string | number>(defaultValue || "")

  const isControlled = typeof valueProp !== "undefined"
  const value = isControlled ? valueProp : valueState

  const ref = useRef<any>(null)

  const focus = useCallback(() => {
    const rootNode = ref.current
    if (!rootNode) return

    let query = `input:not(:disabled):checked`

    const firstEnabledAndCheckedInput = rootNode.querySelector(query)

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

  //@ts-expect-error
  const getItemProps: PropGetter = useCallback(
    (props = {}, ref = null) => {
      return {
        ...props,
        ref,
        name,
        checked: value != null ? props.value === value : undefined,
        onChange: onChange,
        "data-radiogroup": true,
      }
    },
    [name, onChange, value],
  )

  return {
    getRootProps,
    getItemProps,
    name,
    ref,
    focus,
    setValue,
    value,
    onChange,
    disabled,
    focusable,
  }
}

export type UseRadioGroupReturn = ReturnType<typeof useRadioGroup>
