import * as React from "react";
import * as StyledSystem from "styled-system";
import { PseudoBoxProps } from "../PseudoBox";

export interface IButton {
  /**
   * The size of the button
   */
  size?: "sm" | "md" | "lg";
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The color scheme of the button vaint. Use the color keys passed in `theme.colors`.
   * @example
   * variantColor = "green" | "purple" | "orange"
   */
  variantColor?: string;
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
  leftIcon?: string;
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: string;
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: StyledSystem.MarginProps["margin"];
}

export type ButtonProps = IButton &
  PseudoBoxProps &
  React.RefAttributes<HTMLButtonElement>;

declare const Button: React.FC<ButtonProps>;

export default Button;
