import { Icon } from "@chakra-ui/icon"
import { Spinner } from "@chakra-ui/spinner"
import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { dataAttr, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { ElementType, forwardRef, ReactElement, Ref } from "react"

const StyledButton = chakra("button", {
  themeKey: "Button",
  baseStyle: {
    display: "inline-flex",
    appearance: "none",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 250ms",
    userSelect: "none",
    position: "relative",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    outline: "none",
  },
})

export interface ButtonOptions {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean
  /**
   * If `true`, the button will be styled in it's active state.
   */
  isActive?: boolean
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string
  /**
   * If `true`, the button will take up the full width of its container.
   */
  isFullWidth?: boolean
  /**
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit"
  /**
   * If added, the button will show an icon before the button's label.
   * Use the icon key in `theme.iconPath`
   */
  leftIcon?: ElementType
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: ElementType
  /**
   * The space between the button icon and label.
   * Use the styled-system tokens or add custom values as a string
   */
  iconSpacing?: SystemProps["marginRight"]
  /**
   * Replace the spinner component when `isLoading` is set to `true`
   */
  spinner?: ReactElement
}

export type ButtonProps = Omit<PropsOf<typeof StyledButton>, "disabled"> &
  ButtonOptions

export const Button = forwardRef((props: ButtonProps, ref: Ref<any>) => {
  const {
    isDisabled,
    isLoading,
    isActive,
    isFullWidth,
    children,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = "0.5rem",
    type = "button",
    spinner,
    ...rest
  } = props

  return (
    <StyledButton
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      ref={ref}
      type={type}
      width={isFullWidth ? "100%" : undefined}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <Icon marginLeft={-1} marginRight={iconSpacing} as={leftIcon} />
      )}
      {isLoading && (
        <chakra.span
          position={loadingText ? "relative" : "absolute"}
          marginRight={loadingText ? iconSpacing : 0}
        >
          {spinner || <Spinner color="currentColor" size="1em" />}
        </chakra.span>
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0}>{children}</chakra.span>
        : children}
      {rightIcon && !isLoading && (
        <Icon marginRight={-1} marginLeft={iconSpacing} as={rightIcon} />
      )}
    </StyledButton>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}
