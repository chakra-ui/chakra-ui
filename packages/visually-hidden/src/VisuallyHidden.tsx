import { chakra } from "@chakra-ui/styled"
import React from "react"

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

export const VisuallyHiddenInput = chakra("input", {
  attrs: {
    style: visuallyHiddenStyle,
  },
})

export const ScreenReader = chakra("span", {
  attrs: {
    style: visuallyHiddenStyle,
  },
})

export const VisuallyHidden = chakra("span", {
  attrs: {
    style: visuallyHiddenStyle,
  },
})
