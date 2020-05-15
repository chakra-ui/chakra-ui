import { chakra, keyframes, PropsOf } from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"
import { forwardRef } from "react"

const spin = keyframes`
  0% {  transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

/**
 * Spinner - Theming
 *
 * To style the spinner component globally, change the styles in
 * `theme.components.Spinner`
 */
const StyledSpinner = chakra("div", {
  themeKey: "Spinner",
  baseStyle: {
    display: "inline-block",
    borderColor: "currentColor",
    borderStyle: "solid",
    borderRadius: "full",
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
   * For accessibility, it's important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string
}

export type SpinnerProps = PropsOf<typeof StyledSpinner> & SpinnerOptions

/**
 * Spinner
 *
 * React component used to indicate the loading state of a page or a component,
 *
 * It renders a `div` by default
 *
 * @see Docs https://chakra-ui.com/spinner
 */
export const Spinner = forwardRef(
  (props: SpinnerProps, ref: React.Ref<any>) => {
    const {
      label = "Loading...",
      thickness = "2px",
      speed = "0.45s",
      color,
      emptyColor = "transparent",
      className,
      ...rest
    } = props

    const _className = cx("chakra-spinner", className)

    return (
      <StyledSpinner
        ref={ref}
        borderWidth={thickness}
        borderBottomColor={emptyColor}
        borderLeftColor={emptyColor}
        color={color}
        animation={`${spin} ${speed} linear infinite`}
        className={_className}
        {...rest}
      >
        {label && <VisuallyHidden>{label}</VisuallyHidden>}
      </StyledSpinner>
    )
  },
)

if (__DEV__) {
  Spinner.displayName = "Spinner"
}
