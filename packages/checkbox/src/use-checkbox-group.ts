import * as React from "react"
import { useControllableProp } from "@chakra-ui/hooks"
import {
  isInputEvent,
  addItem,
  removeItem,
  StringOrNumber,
  Dict,
} from "@chakra-ui/utils"
import { useState, useCallback } from "react"

type EventOrValue = React.ChangeEvent<HTMLInputElement> | StringOrNumber

export interface UseCheckboxGroupProps {
  /**
   * The value of the checkbox group
   */
  value?: StringOrNumber[]
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: StringOrNumber[]
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: StringOrNumber[]): void
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`.
   *
   * This assumes, you're using native radio inputs
   */
  isNative?: boolean
}

/**
 * React hook that provides all the state management logic
 * for a group of checkboxes.
 *
 * It is consumed by the `CheckboxGroup` component
 */
export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const {
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
    isNative,
  } = props

  const [valueState, setValue] = useState(defaultValue || [])
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  const updateValue = useCallback(
    (nextState: StringOrNumber[]) => {
      if (!isControlled) {
        setValue(nextState)
      }

      onChangeProp?.(nextState)
    },
    [isControlled, onChangeProp],
  )

  const onChange = useCallback(
    (eventOrValue: EventOrValue) => {
      if (!value) return

      const isChecked = isInputEvent(eventOrValue)
        ? eventOrValue.target.checked
        : !value.includes(eventOrValue)

      const selectedValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue

      const nextValue = isChecked
        ? addItem(value, selectedValue)
        : removeItem(value, selectedValue)

      updateValue(nextValue)
    },
    [updateValue, value],
  )

  return {
    value,
    onChange,
    setValue: updateValue,
    getCheckboxProps: (props: Dict = {}) => {
      const checkedKey = isNative ? "checked" : "isChecked"
      return {
        ...props,
        [checkedKey]: value.includes(props.value),
        onChange,
      }
    },
  }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useCheckboxGroup>
