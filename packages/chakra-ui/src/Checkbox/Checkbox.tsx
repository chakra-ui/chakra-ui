/** @jsx jsx */
import { Merge, Omit } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { Box, BoxProps, VisuallyHidden } from "@chakra-ui/layout";
import { useColorMode, Theme } from "@chakra-ui/theme";
import { ControlBox } from "../ControlBox";
import { Icon, IconProps } from "../Icon";
import checkboxStyles from "./styles";

export type VariantColor = keyof Omit<
  Theme["colors"],
  "black" | "white" | "whiteAlpha" | "blackAlpha" | "current" | "transparent"
>;

export interface CheckboxOptions {
  /**
   * id assigned to input
   */
  id?: string;
  /**
   * The name of the input field in a checkbox
   * (Useful for form submission).
   */
  name?: string;
  /**
   * The value to be used in the checkbox input.
   * This is the value that will be returned on form submission.
   */
  value?: string | number;
  /**
   * The color of the checkbox when it's checked.
   * This should be one of the color keys in the theme (e.g."green", "red")
   */
  variantColor?: VariantColor;
  /**
   * If `true`, the checkbox will be initially checked.
   */
  defaultIsChecked?: boolean;
  /**
   * If `true`, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  isChecked?: boolean;
  /**
   * If `true`, the checkbox should take up the full width of the parent.
   */
  isFullWidth?: boolean;
  /**
   * The size (width and height) of the checkbox
   */
  size?: "sm" | "md" | "lg";
  /**
   * If `true`, the checkbox will be disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the checkbox is marked as invalid.
   * Changes style of unchecked state.
   */
  isInvalid?: boolean;
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * If `true`, the checkbox will be indeterminate.
   * This only affects the icon shown inside checkbox
   * and does not modify the isChecked property.
   */
  isIndeterminate?: boolean;
  /**
   * The children is the label to be displayed to the right of the checkbox.
   */
  children?: React.ReactNode;
  iconColor?: IconProps["color"];
  iconSize?: IconProps["size"];
}

export type CheckboxProps = Merge<
  BoxProps<{}, HTMLInputElement>,
  CheckboxOptions
>;

const Checkbox = forwardRef(function Checkbox(
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
    isIndeterminate,
    children,
    iconColor,
    iconSize = "10px",
    ...rest
  }: CheckboxProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { colorMode } = useColorMode();
  const styleProps = checkboxStyles({ color: variantColor, size, colorMode });

  /**
   *
   * TODO: Improve API to be more declarative
   * <Checkbox>
   *   <CheckboxInput icon={CheckIcon}/>
   *   <CheckboxText>Welcome home</CheckboxText>
   * </Checkbox>
   */

  return (
    <Box
      as="label"
      display="inline-flex"
      verticalAlign="top"
      alignItems="center"
      width={isFullWidth ? "full" : undefined}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      {...rest}
    >
      <VisuallyHidden
        as="input"
        type="checkbox"
        aria-label={ariaLabel}
        id={id}
        ref={ref}
        name={name}
        value={value}
        defaultChecked={defaultIsChecked}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        checked={isChecked}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        aria-checked={isIndeterminate ? "mixed" : isChecked}
      />
      <ControlBox {...styleProps}>
        <Icon
          name={isIndeterminate ? "minus" : "check"}
          size={iconSize}
          color={iconColor}
          transition="transform 240ms, opacity 240ms"
        />
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
}) as React.FC<CheckboxProps>;

export default Checkbox;
