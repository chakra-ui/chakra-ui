import { createChakra } from "@chakra-ui/system"
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

export const VisuallyHiddenInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} style={visuallyHiddenStyle} {...props} />)

export const ScreenReader = (props: React.ComponentProps<"span">) => (
  <span style={visuallyHiddenStyle} {...props} />
)

export const VisuallyHidden = createChakra("span", {
  attrs: {
    style: visuallyHiddenStyle,
  },
})
