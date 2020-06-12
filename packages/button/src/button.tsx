import { Spinner } from "@chakra-ui/spinner"
import {
  chakra,
  PropsOf,
  SystemProps,
  forwardRef,
  useComponentStyle,
  pseudoSelectors,
} from "@chakra-ui/system"
import { dataAttr, __DEV__, merge, Dict, cx } from "@chakra-ui/utils"
import * as React from "react"
import { useButtonGroup } from "./button-group"

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

export type ButtonProps = PropsOf<typeof StyledButton> & ButtonOptions

export const Button = forwardRef<ButtonProps, "button">(function Button(
  props,
  ref,
) {
  const group = useButtonGroup()

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
    variant = group?.variant,
    colorScheme = group?.colorScheme,
    size = group?.size,
    className,
    ...rest
  } = props

  const styles = useComponentStyle({
    themeKey: "Button",
    variant,
    size,
    colorScheme,
  }) as Dict

  /**
   * When button is used within ButtonGroup (i.e flushed with sibling buttons),
   * it's important to add a `zIndex` when it's focused to it doesn't look funky.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */
  const focusSelector = pseudoSelectors["_focus"]
  const _focus = merge(styles?.[focusSelector] ?? {}, { zIndex: 1 })

  const _className = cx("chakra-button", className)

  return (
    <StyledButton
      disabled={isDisabled || isLoading}
      ref={ref}
      type={type}
      width={isFullWidth ? "100%" : undefined}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      className={_className}
      {...(!!group && { _focus })}
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

function ButtonIcon(props: PropsOf<typeof chakra.span>) {
  const a11yProps = {
    "aria-hidden": true,
    focusable: false,
  }

  const children = React.isValidElement(props.children)
    ? React.cloneElement(props.children, a11yProps)
    : props.children

  return (
    <chakra.span
      className="chakra-button__icon"
      {...props}
      children={children}
    />
  )
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
      fontSize="1em"
      lineHeight="normal"
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
