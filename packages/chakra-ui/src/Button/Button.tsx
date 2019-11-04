/** @jsx jsx */
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";
import { Merge, Omit } from "@chakra-ui/utils";
import { jsx } from "@emotion/core";
import { forwardRef } from "react";
import { Icon, IconProps } from "../Icon";
import { Spinner } from "../Spinner";
import { Icons, Theme } from "@chakra-ui/theme";
import useButtonStyle from "./styles";

type IconType = Icons | React.ComponentType;

type ButtonIconProps = { icon: IconType } & Omit<IconProps, "name">;

const ButtonIcon = ({ icon, ...props }: ButtonIconProps) => {
  if (typeof icon === "string") {
    return (
      <Icon focusable="false" name={icon} color="currentColor" {...props} />
    );
  }
  return (
    <Box
      as={icon}
      data-custom-icon
      focusable="false"
      color="currentColor"
      {...props}
    />
  );
};

export interface ButtonOptions {
  /**
   * The size of the button
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The color scheme of the button vaint. Use the color keys passed in `theme.colors`.
   * @example
   * variantColor = "green" | "purple" | "orange"
   */
  variantColor?: keyof Theme["colors"];
  /**
   * The variant of the button style to use.
   */
  variant?: "outline" | "ghost" | "unstyled" | "link" | "solid";
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean;
  /**
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit";
  /**
   * The content of the button.
   */
  children: React.ReactNode;
  /**
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.iconPath`
   */
  leftIcon?: IconType;
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: IconType;
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: SystemProps["margin"];
}

export type ButtonProps<P, T = HTMLButtonElement> = Merge<
  BoxProps<P, T>,
  ButtonOptions
>;

const Button = forwardRef(function Button<P, T>(
  {
    isDisabled,
    isLoading,
    isActive,
    isFullWidth,
    children,
    variantColor = "gray",
    leftIcon,
    rightIcon,
    variant = "solid",
    loadingText,
    iconSpacing = 2,
    type = "button",
    size = "md",
    ...rest
  }: ButtonProps<P, T>,
  ref: React.Ref<T>,
) {
  const buttonStyleProps = useButtonStyle({
    color: variantColor,
    variant,
    size,
  });
  const _isDisabled = isDisabled || isLoading;

  return (
    <Box
      disabled={_isDisabled}
      aria-disabled={_isDisabled}
      ref={ref}
      as="button"
      type={type}
      borderRadius="md"
      fontWeight="semibold"
      width={isFullWidth ? "full" : undefined}
      data-active={isActive ? "true" : undefined}
      {...buttonStyleProps}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon ml={-1} mr={iconSpacing} icon={leftIcon} />
      )}
      {isLoading && (
        <Spinner
          position={loadingText ? "relative" : "absolute"}
          mr={loadingText ? iconSpacing : 0}
          color="currentColor"
          size="1em"
        />
      )}
      {isLoading
        ? loadingText || (
            <Box as="span" opacity={0}>
              {children}
            </Box>
          )
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon mr={-1} ml={iconSpacing} icon={rightIcon} />
      )}
    </Box>
  );
}) as <P, T>(props: ButtonProps<P, T>) => React.ReactElement<ButtonProps<P, T>>;

export default Button;
