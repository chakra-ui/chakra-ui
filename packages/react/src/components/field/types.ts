import { UseFieldProviderReturn } from "./use-field-provider"

export interface FieldOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true`
   *
   * @default false
   */
  isRequired?: boolean
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   *
   * @default false
   */
  isDisabled?: boolean
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   *
   * @default false
   */
  isInvalid?: boolean
  /**
   * If `true`, the form control will be readonly
   *
   * @default false
   */
  isReadOnly?: boolean
}

export interface UseFieldProps<T extends HTMLElement = HTMLElement>
  extends FieldOptions {
  id?: string
  onFocus?: React.FocusEventHandler<T>
  onBlur?: React.FocusEventHandler<T>
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  "aria-describedby"?: string
}

export interface FieldContext extends FieldOptions {
  /**
   * The label text used to inform users as to what information is
   * requested for a text field.
   */
  label?: string
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g. Input) gets the `id`
   * - The form label id: `form-label-${id}`
   * - The form error text id: `form-error-text-${id}`
   * - The form helper text id: `form-helper-text-${id}`
   */
  id?: string
}

export interface FieldProviderContext extends UseFieldProviderReturn {}
