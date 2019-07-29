import {
  ReactElement,
  RefAttributes,
  InputHTMLAttributes,
  ForwardRefExoticComponent,
  ElementType
} from "react";
import { PseudoBoxProps } from "../PseudoBox";

interface IProps {
  /**
   * If `true`, the input will be disabled.
   * This sets `aria-disabled=true` and you can style this state by passing `_disabled` prop
   */
  isDisabled: boolean;
  /**
   * If `true`, the `input` will indicate an error. @
   * This sets `aria-invalid=true` and you can style this state by passing `_invalid` prop
   *
   */
  isInvalid: boolean;
  /**
   * If `true`, the input element will be required.
   */
  isRequired: boolean;
  /**
   * The id of the `input` element.
   */
  id: string;
  /**
   * The name attribute of the `input` element.
   */
  name: string;
  /**
   * The visual size of the `input` element.
   */
  size: "sm" | "md" | "lg";
  /**
   * The variant of the input style to use.
   */
  variant: "outline" | "unstyled" | "flushed" | "filled";
  /**
   * The component to use in place of `input`
   */
  as: ElementType;
  /**
   * Accessibility label to use, in scenarios where the input as no visible label
   * A11y: It's useful for screen readers
   */
  "aria-label": ariaLabel;
  /**
   * If `true`, the input is perceivable but it's value can't be changes.
   */
  isReadOnly: boolean;
  /**
   * The border color when the input is focused.
   * Use color keys in `theme.colors`
   * @example
   * _focusBorderColor = "blue"
   */
  _focusBorderColor: string;
}

export type InputProps = IProps &
  PseudoBoxProps &
  RefAttributes<HTMLInputElement>;

declare const Input: ForwardRefExoticComponent<InputProps>;

export default Input;
