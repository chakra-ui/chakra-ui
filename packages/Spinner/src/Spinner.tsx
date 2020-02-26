import { createChakra, PropsOf } from "@chakra-ui/system"
import { VisuallyHidden } from "@chakra-ui/visually-hidden"
import { keyframes } from "@emotion/core"
import * as React from "react"

const spin = keyframes`
  0% {  transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const BaseSpinner = createChakra("div", { themeKey: "Spinner" })
BaseSpinner.defaultProps = {
  variantSize: "md",
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

export type SpinnerProps = PropsOf<typeof BaseSpinner> & SpinnerOptions

export const Spinner = ({
  label = "Loading...",
  thickness = "2px",
  speed = "0.45s",
  color,
  emptyColor = "transparent",
  ...props
}: SpinnerProps) => (
  <BaseSpinner
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
  </BaseSpinner>
)

Spinner.displayName = "Spinner"

export default Spinner
