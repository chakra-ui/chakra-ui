import { Spinner } from "@chakra-ui/spinner"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, dataAttr, mergeWith, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useButtonGroup } from "./button-group"

export interface ButtonOptions {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean
  /**
   * If `true`, the button will be styled in its active state.
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
   * @type React.ReactElement
   */
  leftIcon?: React.ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   * @type React.ReactElement
   */
  rightIcon?: React.ReactElement
  /**
   * The space between the button icon and label.
   * @type SystemProps["marginRight"]
   */
  iconSpacing?: SystemProps["marginRight"]
  /**
   * Replace the spinner component when `isLoading` is set to `true`
   * @type React.ReactElement
   */
  spinner?: React.ReactElement
}

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps {}

export const Button = forwardRef<ButtonProps, "button">((props, ref) => {
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
   * it is important to add a `zIndex` on focus.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */
  const _focus = mergeWith({}, styles?.["_focus"] ?? {}, { zIndex: 1 })

  const buttonStyles: SystemStyleObject = {
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
        <ButtonIcon marginEnd={iconSpacing}>{leftIcon}</ButtonIcon>
      )}
      {isLoading && (
        <ButtonSpinner
          __css={{ fontSize: "1em", lineHeight: "normal" }}
          spacing={iconSpacing}
          label={loadingText}
        >
          {spinner}
        </ButtonSpinner>
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0}>{children}</chakra.span>
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon marginStart={iconSpacing}>{rightIcon}</ButtonIcon>
      )}
    </chakra.button>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}

const ButtonIcon: React.FC<HTMLChakraProps<"span">> = (props) => {
  const { children, className, ...rest } = props

  const _children = React.isValidElement(children)
    ? React.cloneElement(children, {
        "aria-hidden": true,
        focusable: false,
      })
    : children

  const _className = cx("chakra-button__icon", className)

  return (
    <chakra.span {...rest} className={_className}>
      {_children}
    </chakra.span>
  )
}

if (__DEV__) {
  ButtonIcon.displayName = "ButtonIcon"
}

interface ButtonSpinnerProps extends HTMLChakraProps<"div"> {
  label?: string
  /**
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps["margin"]
}

const ButtonSpinner: React.FC<ButtonSpinnerProps> = (props) => {
  const {
    label,
    spacing,
    children = <Spinner color="currentColor" width="1em" height="1em" />,
    className,
    __css,
    ...rest
  } = props

  const _className = cx("chakra-button__spinner", className)

  const spinnerStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    position: label ? "relative" : "absolute",
    marginEnd: label ? spacing : 0,
    ...__css,
  }

  return (
    <chakra.div className={_className} {...rest} __css={spinnerStyles}>
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  ButtonSpinner.displayName = "ButtonSpinner"
}
