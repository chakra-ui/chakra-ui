"use client"

import { useCallbackRef, useControllableState } from "@chakra-ui/hooks"
import { callAll, isObject } from "@chakra-ui/utils"
import { useCallback } from "react"
import { EventOrValue, UseCheckboxGroupProps } from "./checkbox-types"

function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target)
}

/**
 * React hook that provides all the state management logic
 * for a group of checkboxes.
 *
 * It is consumed by the `CheckboxGroup` component
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-checkbox-group
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
 */
export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const { defaultValue, value: valueProp, onChange, disabled } = props

  const onChangeProp = useCallbackRef(onChange)

  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue || [],
    onChange: onChangeProp,
  })

  const handleChange = useCallback(
    (eventOrValue: EventOrValue) => {
      if (!value) return

      const checked = isInputEvent(eventOrValue)
        ? eventOrValue.target.checked
        : !value.includes(eventOrValue)

      const selectedValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue

      const nextValue = checked
        ? [...value, selectedValue]
        : value.filter((v) => String(v) !== String(selectedValue))

      setValue(nextValue)
    },
    [setValue, value],
  )

  const getInputProps = useCallback(
    (props: Record<string, any> = {}) => {
      return {
        ...props,
        checked: value.some((val) => String(props.value) === String(val)),
        onChange: callAll(handleChange, props.onChange),
      }
    },
    [handleChange, value],
  )

  return {
    value,
    setValue,
    disabled,
    onChange: handleChange,
    getInputProps,
  }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>
