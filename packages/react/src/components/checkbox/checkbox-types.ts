import { SlotRecipeProps } from "../../styled-system"
import { UseCheckboxReturn } from "./use-checkbox"
import { UseCheckboxGroupReturn } from "./use-checkbox-group"

export interface UseCheckboxGroupProps {
  /**
   * The value of the checkbox group
   */
  value?: Array<string | number>
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: Array<string | number>
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: Array<string | number>): void
  /**
   * If `true`, all wrapped checkbox inputs will be disabled
   *
   * @default false
   */
  disabled?: boolean
}

export type EventOrValue = React.ChangeEvent<HTMLInputElement> | string | number

export interface UseCheckboxProps {
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update its value (since it is now controlled)
   *
   * @default false
   */
  checked?: boolean
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the checked property.
   *
   * @default false
   */
  indeterminate?: boolean
  /**
   * If `true`, the checkbox will be disabled
   *
   * @default false
   */
  disabled?: boolean
  /**
   * If `true` and `disabled` is passed, the checkbox will
   * remain tabbable but not interactive
   *
   * @default false
   */
  focusable?: boolean
  /**
   * If `true`, the checkbox will be readonly
   *
   * @default false
   */
  readOnly?: boolean
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   *
   * @default false
   */
  invalid?: boolean
  /**
   * If `true`, the checkbox input is marked as required,
   * and `required` attribute will be added
   *
   * @default false
   */
  required?: boolean
  /**
   * If `true`, the checkbox will be initially checked.
   *
   * @default false
   */
  defaultChecked?: boolean
  /**
   * The callback invoked when the checked state of the `Checkbox` changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The callback invoked when the checkbox is blurred (loses focus)
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * The callback invoked when the checkbox is focused
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number
  /**
   * id assigned to input
   */
  id?: string
  /**
   * Defines the string that labels the checkbox element.
   */
  "aria-label"?: string
  /**
   * Refers to the `id` of the element that labels the checkbox element.
   */
  "aria-labelledby"?: string
  "aria-invalid"?: true | undefined
  "aria-describedby"?: string
  /**
   * The tab-index property of the underlying input element.
   */
  tabIndex?: number
}

export interface CheckboxGroupContext
  extends Pick<UseCheckboxGroupReturn, "onChange" | "value" | "disabled">,
    Omit<SlotRecipeProps<"Checkbox">, "orientation"> {}

export interface CheckboxState {
  invalid?: boolean
  focused: boolean
  checked: boolean
  active: boolean
  hovered: boolean
  indeterminate?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

export interface CheckboxContext extends UseCheckboxReturn {}
