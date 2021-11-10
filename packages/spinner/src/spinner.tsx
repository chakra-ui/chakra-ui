import {
  chakra,
  forwardRef,
  keyframes,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"

const spin = keyframes({
  "0%": {
    transform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
  },
})

interface SpinnerOptions {
  /**
   * The color of the empty area in the spinner
   */
  emptyColor?: string
  /**
   * The color of the spinner
   */
  color?: string
  /**
   * The thickness of the spinner
   * @example
   * ```jsx
   * <Spinner thickness="4px"/>
   * ```
   */
  thickness?: string
  /**
   * The speed of the spinner.
   * @example
   * ```jsx
   * <Spinner speed="0.2s"/>
   * ```
   */
  speed?: string
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string
}

export interface SpinnerProps
  extends Omit<HTMLChakraProps<"div">, keyof SpinnerOptions>,
    SpinnerOptions,
    ThemingProps<"Spinner"> {}

/**
 * Spinner is used to indicate the loading state of a page or a component,
 * It renders a `div` by default.
 *
 * @see Docs https://chakra-ui.com/docs/feedback/spinner
 */
export const Spinner = forwardRef<SpinnerProps, "div">((props, ref) => {
  const styles = useStyleConfig("Spinner", props)

  const {
    label = "Loading...",
    thickness = "2px",
    speed = "0.45s",
    color,
    emptyColor = "transparent",
    className,
    ...rest
  } = omitThemingProps(props)

  const _className = cx("chakra-spinner", className)

  const spinnerStyles = {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "99999px",
    borderWidth: thickness,
    borderBottomColor: emptyColor,
    borderLeftColor: emptyColor,
    color,
    animation: `${spin} ${speed} linear infinite`,
    ...styles,
  }

  return (
    <chakra.div
      ref={ref}
      __css={spinnerStyles}
      className={_className}
      {...rest}
    >
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </chakra.div>
  )
})

if (__DEV__) {
  Spinner.displayName = "Spinner"
}
