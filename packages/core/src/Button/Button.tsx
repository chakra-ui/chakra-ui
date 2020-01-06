import {
  chakra,
  ChakraComponent,
  createChakra,
  forwardRef,
  PropsOf,
  SystemProps,
} from "@chakra-ui/system";
import { Omit } from "@chakra-ui/utils";
import * as React from "react";
import { Icon } from "../Icon";
import { Spinner } from "../Spinner";

const ButtonIcon = forwardRef(
  ({ icon, ...props }: { icon?: any }, ref: React.Ref<any>) =>
    typeof icon === "string" ? (
      <Icon
        ref={ref}
        focusable="false"
        //@ts-ignore
        name={icon}
        color="currentColor"
        {...props}
      />
    ) : (
      <chakra.svg
        ref={ref}
        as={icon}
        data-custom-icon
        focusable="false"
        color="currentColor"
        {...props}
      />
    ),
) as ChakraComponent<"svg", { icon?: string | React.ElementType }>;

const BaseButton = createChakra("button", { themeKey: "Button" });
BaseButton.defaultProps = {
  variant: "solid",
  variantSize: "md",
  variantColor: "gray",
};
BaseButton.displayName = "BaseButton";

export interface ButtonOptions {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
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
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.iconPath`
   */
  leftIcon?: string | React.ComponentType;
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: string | React.ComponentType;
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: SystemProps["margin"];
}

export type ButtonProps = Omit<PropsOf<typeof BaseButton>, "disabled"> &
  ButtonOptions;

const Button = React.forwardRef((props: ButtonProps, ref: React.Ref<any>) => {
  const {
    isDisabled,
    isLoading,
    isActive,
    isFullWidth,
    children,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = 2,
    type = "button",
    ...rest
  } = props;

  return (
    <BaseButton
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      ref={ref}
      type={type}
      width={isFullWidth ? "full" : undefined}
      data-active={isActive ? "" : undefined}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon marginLeft={-1} marginRight={iconSpacing} icon={leftIcon} />
      )}
      {isLoading && (
        <Spinner
          position={loadingText ? "relative" : "absolute"}
          marginRight={loadingText ? iconSpacing : 0}
          color="currentColor"
          size="1em"
        />
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0}>{children}</chakra.span>
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon
          marginRight={-1}
          marginLeft={iconSpacing}
          icon={rightIcon}
        />
      )}
    </BaseButton>
  );
});

//@ts-ignore
Button.displayName = "Button";

export default Button;
