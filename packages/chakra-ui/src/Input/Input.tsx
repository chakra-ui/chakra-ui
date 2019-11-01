/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef, useState } from "react";
import { useFormControl } from "../FormControl";
import { Box, BoxProps } from "../Box";
import useInputStyle from "./styles";
import { Omit } from "../utils";

type Variant = "outline" | "unstyled" | "flushed" | "filled";
type Size = "sm" | "md" | "lg";

export interface InputOptions<T = HTMLInputElement> {
  /**
   * If `true`, the input will be disabled.
   * This sets `aria-disabled=true` and you can style this state by passing `_disabled` prop
   */
  isDisabled?: React.InputHTMLAttributes<T>["disabled"];
  /**
   * If `true`, the `input` will indicate an error.
   * This sets `aria-invalid=true` and you can style this state by passing `_invalid` prop
   *
   */
  isInvalid?: boolean;
  /**
   * If `true`, the input element will be required.
   */
  isRequired?: React.InputHTMLAttributes<T>["required"];
  /**
   * If `true`, the input element will span the full width of it's parent
   */
  isFullWidth?: boolean;
  /**
   * If `true`, prevents the value of the input from being edited.
   */
  isReadOnly?: React.InputHTMLAttributes<T>["readOnly"];
  /**
   * The visual size of the `input` element.
   */
  size?: Size;
  /**
   * The variant of the input style to use.
   */
  variant?: Variant;
  /**
   * The element or component to use in place of `input`
   */
  as?: React.ElementType;
  /**
   * [ARIA] The accessible label to use, in scenarios where the input as no visible label
   */
  "aria-label"?: React.AriaAttributes["aria-label"];
  /**
   * [ARIA] The id of the element that describes the input.
   */
  "aria-describedby"?: React.AriaAttributes["aria-describedby"];

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

type OmittedTypes =
  | "size"
  | "disabled"
  | "required"
  | "checked"
  | "defaultChecked"
  | "readOnly";

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  OmittedTypes
>;

export type InputProps<P, T = HTMLInputElement> = InputOptions<T> &
  BoxProps<P, T> &
  InputHTMLAttributes &
  React.RefAttributes<T>;

const Input = forwardRef(function Input<P, T extends HTMLInputElement>(
  props: InputProps<P, T>,
  ref: React.Ref<T>,
) {
  const {
    size,
    variant,
    as,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    isReadOnly,
    isFullWidth,
    isDisabled,
    isInvalid,
    isRequired,
    focusBorderColor,
    errorBorderColor,
    ...rest
  } = props;

  const inputStyleProps = useInputStyle(props);
  const formControl = useFormControl(props);

  return (
    <Box
      as={as}
      ref={ref}
      readOnly={formControl.isReadOnly}
      aria-readonly={isReadOnly}
      disabled={formControl.isDisabled}
      aria-label={ariaLabel}
      aria-invalid={formControl.isInvalid}
      required={formControl.isRequired}
      aria-required={formControl.isRequired}
      aria-disabled={formControl.isDisabled}
      aria-describedby={ariaDescribedby}
      {...inputStyleProps}
      {...rest}
    />
  );
}) as <P, T = HTMLInputElement>(
  props: InputProps<P, T>,
) => React.ReactElement<InputProps<P, T>>;

export function DefaultInput() {
  return (
    <Input isInvalid placeholder="Here is a sample placeholder" size="sm" />
  );
}

export function ReadonlyInput() {
  return (
    <Input
      placeholder="Here is a sample placeholder"
      variant="outline"
      size="md"
      focusBorderColor="cyan.500"
      isReadOnly
    />
  );
}

export function FilledInput() {
  return <Input variant="filled" placeholder="Text goes here" />;
}

export function ControlledInput() {
  let [value, setValue] = useState();
  return (
    <Input
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        console.log(e.target.value)
      }
      variant="filled"
      placeholder="Text goes here"
    />
  );
}

export default Input;
