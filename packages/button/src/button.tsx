import { Spinner } from "@chakra-ui/spinner"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  PropsOf,
  SystemProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx, dataAttr, merge, __DEV__ } from "@chakra-ui/utils"
import React, { ReactElement, isValidElement, cloneElement } from "react"
import { useButtonGroup } from "./button-group"

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
   */
  leftIcon?: ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   */
  rightIcon?: ReactElement
  /**
   * The space between the button icon and label.
   */
  iconSpacing?: SystemProps["marginRight"]
  /**
   * Replace the spinner component when `isLoading` is set to `true`
   */
  spinner?: ReactElement
}

export type ButtonProps = PropsOf<typeof chakra.button> &
  ButtonOptions &
  ThemingProps

export const Button = forwardRef<ButtonProps>(function Button(props, ref) {
  const group = useButtonGroup()
  const styles = useStyleConfig("Button", { ...group, ...props })

  const {
    isDisabled = group?.isDisabled,
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
    className,
    as,
    ...rest
  } = omitThemingProps(props)

  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it's important to add a `zIndex` when it's focused to it doesn't look funky.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */
  const _focus = merge({}, styles?.["_focus"] ?? {}, { zIndex: 1 })

  const buttonStyles = {
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
    width: isFullWidth ? "100%" : "auto",
    ...styles,
    ...(!!group && { _focus }),
  }

  return (
    <chakra.button
      disabled={isDisabled || isLoading}
      ref={ref}
      as={as}
      type={as ? undefined : type}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      __css={buttonStyles}
      className={cx("chakra-button", className)}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon mr={iconSpacing} children={leftIcon} />
      )}
      {isLoading && (
        <ButtonSpinner
          __css={{ fontSize: "1em", lineHeight: "normal" }}
          spacing={iconSpacing}
          label={loadingText}
          children={spinner}
        />
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0} children={children} />
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon ml={iconSpacing} children={rightIcon} />
      )}
    </chakra.button>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}

function ButtonIcon(props: PropsOf<typeof chakra.span>) {
  const { children, className, ...rest } = props

  const _children = isValidElement(children)
    ? cloneElement(children, {
        "aria-hidden": true,
        focusable: false,
      })
    : children

  const _className = cx("chakra-button__icon", className)

  return <chakra.span {...rest} className={_className} children={_children} />
}

if (__DEV__) {
  ButtonIcon.displayName = "ButtonIcon"
}

type ButtonSpinnerProps = PropsOf<typeof chakra.div> & {
  label?: string
  spacing?: SystemProps["margin"]
}

function ButtonSpinner(props: ButtonSpinnerProps) {
  const {
    label,
    spacing,
    children = <Spinner color="currentColor" width="1em" height="1em" />,
    className,
    ...rest
  } = props

  const _className = cx("chakra-button__spinner", className)
  const spinnerStyles = {
    position: label ? "relative" : "absolute",
    mr: label ? spacing : 0,
  }

  return (
    <chakra.div
      className={_className}
      {...rest}
      __css={spinnerStyles}
      children={children}
    />
  )
}

if (__DEV__) {
  ButtonSpinner.displayName = "ButtonSpinner"
}
