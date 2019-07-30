import {
  ReactElement,
  RefAttributes,
  InputHTMLAttributes,
  ForwardRefExoticComponent,
  ElementType,
  SyntheticEvent,
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  AriaAttributes
} from "react";
import { PseudoBoxProps } from "../PseudoBox";

type InputElemType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface IProps {
  /**
   * The standard HTML input autocomplete attribute.
   *
   * This prop helps users to fill forms faster, especially on mobile devices.
   * [See the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus?: boolean;
  /**
   * Standard HTML input form attribute.
   * This is useful if the input cannot be included directly inside a form.
   */
  form?: boolean;
  /**
   * Standard HTML `input` pattern attribute, used for validating using a regular expression.
   */
  pattern?: boolean;
  /**
   * The CSS class name of the `input` element.
   */
  className?: string;
  /**
   * The type attribute of the `input` element
   */
  type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
  /**
   * Standard `input` min attribute, to be used with `type="number"`
   */
  min?: number;
  /**
   * Standard `input` max attribute, to be used with `type="number"`
   */
  max?: number;
  /**
   * Standard `input` step attribute, to be used with `type="number"`
   */
  step?: number;
  /**
   * Set the maximum length that the entered text can be.
   */
  maxLength?: number;
  /**
   * Text to display in the input if the `input` is empty.
   */
  placeholder?: string;
  /**
   * Initial value of the input, for uncontrolled usage.
   */
  defaultValue?: string | number;
  /**
   * The value of the input, for controlled usage.
   */
  value?: string | number;
  /**
   * If `true`, the input will be disabled.
   * This sets `aria-disabled=true` and you can style this state by passing `_disabled` prop
   */
  isDisabled?: boolean;
  /**
   * If `true`, the `input` will indicate an error. @
   * This sets `aria-invalid=true` and you can style this state by passing `_invalid` prop
   *
   */
  isInvalid?: boolean;
  /**
   * If `true`, the input element will be required.
   */
  isRequired?: boolean;
  /**
   * If `true`, spell checking will be applied.
   */
  isSpellCheckEnabled?: boolean;
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean;
  /**
   * If `true`, prevents the value of the input from being edited.
   */
  isReadOnly?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The name attribute of the `input` element.
   */
  name?: string;
  /**
   * The visual size of the `input` element.
   */
  size?: "sm" | "md" | "lg";
  /**
   * The variant of the input style to use.
   */
  variant?: "outline" | "unstyled" | "flushed" | "filled";
  /**
   * The component to use in place of `input`
   */
  as?: ElementType;
  /**
   * Accessibility label to use, in scenarios where the input as no visible label
   * A11y: It's useful for screen readers
   */
  "aria-label"?: AriaAttributes["aria-label"];

  /**
   * The border color when the input is focused.
   * Use color keys in `theme.colors`
   * @example
   * _focusBorderColor = "blue"
   */
  _focusBorderColor?: string;
}

export type InputProps = IProps & PseudoBoxProps & RefAttributes<ElementType>;

declare const Input: ForwardRefExoticComponent<InputProps>;

export default Input;
