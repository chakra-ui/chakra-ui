import { Spinner } from "@chakra-ui/spinner"
import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { dataAttr, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import {
  forwardRef,
  ReactElement,
  Ref,
  cloneElement,
  isValidElement,
} from "react"

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
  leftIcon?: ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   * Use the icon key in `theme.iconPath`
   */
  rightIcon?: ReactElement
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
        <ButtonIcon ml={-1} mr={iconSpacing} children={leftIcon} />
      )}
      {isLoading && (
        <ButtonSpinner
          spacing={iconSpacing}
          label={loadingText}
          children={spinner}
        />
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0} children={children} />
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon ml={iconSpacing} mr={-1} children={rightIcon} />
      )}
    </StyledButton>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}

const ButtonIcon = (props: PropsOf<typeof chakra.span>) => {
  const a11yProps = {
    "aria-hidden": true,
    focusable: false,
  }

  const children = isValidElement(props.children)
    ? cloneElement(props.children, a11yProps)
    : props.children

  return <chakra.span {...props}>{children}</chakra.span>
}

if (__DEV__) {
  ButtonIcon.displayName = "ButtonIcon"
}

type ButtonSpinnerProps = PropsOf<typeof chakra.div> & {
  label?: string
  spacing?: SystemProps["margin"]
}

const ButtonSpinner = (props: ButtonSpinnerProps) => {
  const {
    label,
    spacing,
    children = <Spinner color="currentColor" width="1em" height="1em" />,
    ...rest
  } = props

  return (
    <chakra.div
      fontSize="1em"
      lineHeight="normal"
      position={label ? "relative" : "absolute"}
      // ml={label ? -1 : 0}
      mr={label ? spacing : 0}
      {...rest}
      children={children}
    />
  )
}

if (__DEV__) {
  ButtonSpinner.displayName = "ButtonSpinner"
}
