"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "./button"

export interface IconButtonProps extends ButtonProps {}

/**
 * Icon button renders an icon within a button.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon-button
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    return (
      <Button padding="0" _icon={{ fontSize: "1.2em" }} ref={ref} {...props} />
    )
  },
)
