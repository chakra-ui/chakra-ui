import * as React from "react";
import { PseudoBoxProps } from "../PseudoBox";
import { Icons } from "../theme/icons";
import { Omit } from "../common-types";

export interface IButton {
  /**
   * The size of the button
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * The color scheme of the button.
   *
   * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
   * @see http://chakra-ui.com/theme#colors
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
  leftIcon?: Icons | React.ComponentType;
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: Icons | React.ComponentType;
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: PseudoBoxProps["margin"];
}

export type ButtonProps = IButton & Omit<PseudoBoxProps, "size">;

declare const Button: React.FC<ButtonProps>;

export default Button;
