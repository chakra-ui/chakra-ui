"use client"

import { chakra } from "../../styled-system"

export const visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0, 0, 0, 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
}

/**
 * Visually hidden component used to hide
 * elements on screen
 *
 * @see Docs https://chakra-ui.com/docs/components/visually-hidden
 */
export const VisuallyHidden = chakra("span", {
  base: visuallyHiddenStyle,
})

VisuallyHidden.displayName = "VisuallyHidden"
