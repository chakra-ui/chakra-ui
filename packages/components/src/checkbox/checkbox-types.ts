import { SystemProps, ThemingProps } from "@chakra-ui/system"
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
  isDisabled?: boolean
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

export type EventOrValue = React.ChangeEvent<HTMLInputElement> | string | number

export interface UseCheckboxProps {
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update its value (since it is now controlled)
   *
   * @default false
   */
  isChecked?: boolean
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   *
   * @default false
   */
  isIndeterminate?: boolean
  /**
   * If `true`, the checkbox will be disabled
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true` and `isDisabled` is passed, the checkbox will
   * remain tabbable but not interactive
   *
   * @default false
   */
  isFocusable?: boolean
  /**
   * If `true`, the checkbox will be readonly
   *
   * @default false
   */
  isReadOnly?: boolean
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   *
   * @default false
   */
  isInvalid?: boolean
  /**
   * If `true`, the checkbox input is marked as required,
   * and `required` attribute will be added
   *
   * @default false
   */
  isRequired?: boolean
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

export type CheckboxOptions = {
  /**
   * The spacing between the checkbox and its label text
   * @default 0.5rem
   * @type SystemProps["marginLeft"]
   */
  spacing?: SystemProps["marginLeft"]
  /**
   * The color of the checkbox icon when checked or indeterminate
   */
  iconColor?: string
  /**
   * The size of the checkbox icon when checked or indeterminate
   */
  iconSize?: string | number
  /**
   * The checked icon to use
   *
   * @type React.ReactElement
   * @default CheckboxIcon
   */
  icon?: React.ReactElement
  /**
   * Additional props to be forwarded to the `input` element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export interface CheckboxGroupContext
  extends Pick<UseCheckboxGroupReturn, "onChange" | "value" | "isDisabled">,
    Omit<ThemingProps<"Checkbox">, "orientation"> {}

export interface CheckboxState {
  isInvalid?: boolean
  isFocused: boolean
  isChecked: boolean
  isActive: boolean
  isHovered: boolean
  isIndeterminate?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isRequired?: boolean
}
