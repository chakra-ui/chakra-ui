/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { ControlBox } from "../ControlBox";
import { useColorMode } from "@chakra-ui/theme";
import useCheckboxStyle from "../Checkbox/styles";
import { Box, BoxProps, VisuallyHidden } from "@chakra-ui/layout";
import { VariantColor } from "../Checkbox";

export interface RadioOptions {
  /**
   * id assigned to input
   */
  id?: string;
  /**
   * The name of the input field in a radio
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the radio button.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * The aria-label attribute associated with the radio element
   */
  "aria-label"?: string;
  /**
   * The aria-labelledby attribute associated with the radio element
   */
  "aria-labelledby"?: string;
  /**
   * The color of the radio when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  variantColor?: VariantColor;
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the radio will occupy the full width of it's parent container
   */
  isFullWidth?: boolean;
  /**
   * The size of the radio button
   */
  size?: "lg" | "md" | "sm";
  /**
   * If `true`, the radio will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the radio button will be invalid. This sets `aria-invalid` to `true`.
   */
  isInvalid?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

export type RadioProps = RadioOptions &
  BoxProps &
  React.RefAttributes<HTMLInputElement>;

const Radio = forwardRef(
  (
    {
      id,
      name,
      value,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      variantColor = "blue",
      defaultIsChecked,
      isChecked,
      isFullWidth,
      size = "md",
      isDisabled,
      isInvalid,
      onChange,
      onBlur,
      onFocus,
      children,
      ...rest
    }: RadioProps,
    ref,
  ) => {
    const { colorMode } = useColorMode();
    const styleProps = useCheckboxStyle({
      color: variantColor,
      size,
      colorMode,
      type: "radio",
    });

    return (
      <Box
        as="label"
        display="inline-flex"
        verticalAlign="top"
        htmlFor={id}
        alignItems="center"
        width={isFullWidth ? "full" : undefined}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        {...rest}
      >
        <VisuallyHidden
          as="input"
          type="radio"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          id={id}
          ref={ref}
          name={name}
          value={value}
          aria-invalid={isInvalid}
          defaultChecked={defaultIsChecked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          checked={isChecked}
          disabled={isDisabled}
        />
        <ControlBox {...styleProps} type="radio" rounded="full">
          <Box bg="currentColor" as="span" rounded="full" size="50%" />
        </ControlBox>
        {children && (
          <Box
            ml={2}
            fontSize={size}
            userSelect="none"
            opacity={isDisabled ? 0.32 : 1}
          >
            {children}
          </Box>
        )}
      </Box>
    );
  },
);

export default Radio;
