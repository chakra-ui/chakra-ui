export interface InputOptions {
  /**
   * If `true`, the input will be disabled.
   * This sets `aria-disabled=true` and you can style this state by passing `_disabled` prop
   */
  isDisabled?: boolean;
  /**
   * If `true`, the `input` will indicate an error.
   * This sets `aria-invalid=true` and you can style this state by passing `_invalid` prop
   *
   */
  isInvalid?: boolean;
  /**
   * If `true`, the input element will be required.
   */
  isRequired?: boolean;
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean;
  /**
   * If `true`, prevents the value of the input from being edited.
   */
  isReadOnly?: boolean;
  /**
   * The visual size of the `input` element.
   */
  variantSize?: string;
  /**
   * The variant of the input style to use.
   */
  variant?: string;
  /**
   * The element or component to use in place of `input`
   */
  as?: React.ElementType;
  /**
   * [ARIA] The accessible label to use, in scenarios where the input as no visible label
   */
  "aria-label"?: string;
  /**
   * [ARIA] The id of the element that describes the input.
   */
  "aria-describedby"?: string;

  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string;

  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string;
}
