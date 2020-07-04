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
import * as React from "react"
import { useButtonGroup } from "./button-group"

const StyledButton = chakra("button", {
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
   */
  leftIcon?: React.ReactElement
  /**
   * If added, the button will show an icon after the button's label.
   */
  rightIcon?: React.ReactElement
  /**
   * The space between the button icon and label.
   */
  iconSpacing?: SystemProps["marginRight"]
  /**
   * Replace the spinner component when `isLoading` is set to `true`
   */
  spinner?: React.ReactElement
}

export type ButtonProps = PropsOf<typeof StyledButton> &
  ButtonOptions &
  ThemingProps

export const Button = forwardRef<ButtonProps>(function Button(props, ref) {
  const group = useButtonGroup()
  const styles = useStyleConfig("Button", { ...group, ...props })
  const realProps = omitThemingProps(props)

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
  } = realProps

  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it's important to add a `zIndex` when it's focused to it doesn't look funky.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */
  const buttonStyles = styles.Container
  const _focus = merge(buttonStyles?.["_focus"] ?? {}, { zIndex: 1 })

  const _className = cx("chakra-button", className)

  return (
    <StyledButton
      disabled={isDisabled || isLoading}
      ref={ref}
      as={as}
      type={as ? undefined : type}
      width={isFullWidth ? "100%" : undefined}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      __css={buttonStyles}
      className={_className}
      {...(!!group && { _focus })}
      {...rest}
    >
      {leftIcon && !isLoading && (
        <ButtonIcon __css={styles.Icon} mr={iconSpacing} children={leftIcon} />
      )}
      {isLoading && (
        <ButtonSpinner
          __css={styles.Spinner}
          spacing={iconSpacing}
          label={loadingText}
          children={spinner}
        />
      )}
      {isLoading
        ? loadingText || <chakra.span opacity={0} children={children} />
        : children}
      {rightIcon && !isLoading && (
        <ButtonIcon __css={styles.Icon} ml={iconSpacing} children={rightIcon} />
      )}
    </StyledButton>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}

function ButtonIcon(props: PropsOf<typeof chakra.span>) {
  const { children, className, ...rest } = props
  const a11yProps = {
    "aria-hidden": true,
    focusable: false,
  }

  const _children = React.isValidElement(children)
    ? React.cloneElement(children, a11yProps)
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

  return (
    <chakra.div
      position={label ? "relative" : "absolute"}
      mr={label ? spacing : 0}
      className={_className}
      {...rest}
      children={children}
    />
  )
}

if (__DEV__) {
  ButtonSpinner.displayName = "ButtonSpinner"
}
