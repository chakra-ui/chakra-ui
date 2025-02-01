import * as React from "react"
import { CloseIcon } from "../icons"
import { IconButton, type IconButtonProps } from "./icon-button"

export interface CloseButtonProps extends IconButtonProps {}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  return (
    <IconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
      {props.children ?? <CloseIcon />}
    </IconButton>
  )
})
