import { useMergeRefs } from "@chakra-ui/hooks"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx, dataAttr, mergeWith, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useButtonGroup } from "./button-group"
import { ButtonSpinner } from "./button-spinner"
import { ButtonIcon } from "./button-icon"
import { useButtonType } from "./use-button-type"

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
  /**
   * It determines the placement of the spinner when isLoading is true
   * @default "start"
   */
  spinnerPlacement?: "start" | "end"
}

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps<"Button"> {}

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
    type,
    spinner,
    spinnerPlacement = "start",
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
  const buttonStyles: SystemStyleObject = React.useMemo(() => {
    const _focus = mergeWith({}, styles?.["_focus"] ?? {}, { zIndex: 1 })
    return {
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      width: isFullWidth ? "100%" : "auto",
      ...styles,
      ...(!!group && { _focus }),
    }
  }, [styles, group, isFullWidth])

  const { ref: _ref, type: defaultType } = useButtonType(as)

  const contentProps = { rightIcon, leftIcon, iconSpacing, children }

  return (
    <chakra.button
      disabled={isDisabled || isLoading}
      ref={useMergeRefs(ref, _ref)}
      as={as}
      type={type ?? defaultType}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      __css={buttonStyles}
      className={cx("chakra-button", className)}
      {...rest}
    >
      {isLoading && spinnerPlacement === "start" && (
        <ButtonSpinner
          className="chakra-button__spinner--start"
          label={loadingText}
          placement="start"
        >
          {spinner}
        </ButtonSpinner>
      )}

      {isLoading ? (
        loadingText || (
          <chakra.span opacity={0}>
            <ButtonContent {...contentProps} />
          </chakra.span>
        )
      ) : (
        <ButtonContent {...contentProps} />
      )}

      {isLoading && spinnerPlacement === "end" && (
        <ButtonSpinner
          className="chakra-button__spinner--end"
          label={loadingText}
          placement="end"
        >
          {spinner}
        </ButtonSpinner>
      )}
    </chakra.button>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}

type ButtonContentProps = Pick<
  ButtonProps,
  "leftIcon" | "rightIcon" | "children" | "iconSpacing"
>

function ButtonContent(props: ButtonContentProps) {
  const { leftIcon, rightIcon, children, iconSpacing } = props
  return (
    <>
      {leftIcon && <ButtonIcon marginEnd={iconSpacing}>{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && (
        <ButtonIcon marginStart={iconSpacing}>{rightIcon}</ButtonIcon>
      )}
    </>
  )
}
