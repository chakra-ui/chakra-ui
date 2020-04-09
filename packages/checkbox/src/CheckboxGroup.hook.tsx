import * as React from "react"
import { useControllableProp } from "@chakra-ui/hooks"
import {
  isInputEvent,
  addItem,
  removeItem,
  StringOrNumber,
} from "@chakra-ui/utils"

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
  onChange?: (value: StringOrNumber[]) => void
}

/**
 * useCheckboxGroup
 *
 * React hook that provides all the state management logic
 * for a group of checkboxes.
 *
 * It is consumed by the `CheckboxGroup` component
 */

export function useCheckboxGroup(props: UseCheckboxGroupProps = {}) {
  const { defaultValue, value: valueProp, onChange: onChangeProp } = props
  const [valueState, setValue] = React.useState(defaultValue || [])
  const [isControlled, value] = useControllableProp(valueProp, valueState)

  const updateValue = React.useCallback(
    (nextState: StringOrNumber[]) => {
      if (!isControlled) {
        setValue(nextState)
      }

      if (onChangeProp) {
        onChangeProp(nextState)
      }
    },
    [isControlled, onChangeProp],
  )

  const onChange = React.useCallback(
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
  }
}
