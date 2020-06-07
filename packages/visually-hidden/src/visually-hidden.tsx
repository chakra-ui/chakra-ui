import { chakra } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

/**
 * Styles to visually hide an element
 * but make it accessible to screen-readers
 */
export const visuallyHiddenStyle: React.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
}

/**
 * Visually hidden component used to hide
 * elements on screen
 */
export const VisuallyHidden = chakra("span", {
  attrs: { style: visuallyHiddenStyle },
})

if (__DEV__) {
  VisuallyHidden.displayName = "VisuallyHidden"
}

/**
 * Visually hidden input component for designing
 * custom input components using the html `input`
 * as a proxy
 */
export const VisuallyHiddenInput = chakra("input", {
  attrs: { style: visuallyHiddenStyle },
})

if (__DEV__) {
  VisuallyHiddenInput.displayName = "VisuallyHiddenInput"
}

export default VisuallyHidden
