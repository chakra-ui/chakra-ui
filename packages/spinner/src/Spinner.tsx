import { chakra, PropsOf, keyframes } from "@chakra-ui/styled"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import * as React from "react"

const spin = keyframes`
  0% {  transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const StyledSpinner = chakra("div", { themeKey: "Spinner" })
StyledSpinner.defaultProps = {
  size: "md",
}

export interface SpinnerOptions {
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

export const Spinner = ({
  label = "Loading...",
  thickness = "2px",
  speed = "0.45s",
  color,
  emptyColor = "transparent",
  ...props
}: SpinnerProps) => (
  <StyledSpinner
    display="inline-block"
    borderColor="currentColor"
    borderStyle="solid"
    borderRadius="full"
    borderWidth={thickness}
    borderBottomColor={emptyColor}
    borderLeftColor={emptyColor}
    color={color}
    animation={`${spin} ${speed} linear infinite`}
    {...props}
  >
    {label && <VisuallyHidden>{label}</VisuallyHidden>}
  </StyledSpinner>
)

Spinner.displayName = "Spinner"
