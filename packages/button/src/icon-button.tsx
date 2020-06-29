import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Button, ButtonProps } from "./button"
import { forwardRef } from "@chakra-ui/system"

type Omitted = "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText"

type BaseButtonProps = Omit<ButtonProps, Omitted>

export type IconButtonProps = BaseButtonProps & {
  icon?: React.ReactElement
  isRound?: boolean
  "aria-label": string
}

export const IconButton = forwardRef<IconButtonProps>(function IconButton(
  props,
  ref,
) {
  const { icon, children, isRound, "aria-label": ariaLabel, ...rest } = props

  /**
   * Passing the icon as prop or children should work
   */
  const iconElement = icon || children

  const a11yProps = {
    "aria-hidden": true,
    focusable: false,
  }

  return (
    <Button
      padding="0"
      borderRadius={isRound ? "full" : "md"}
      ref={ref}
      aria-label={ariaLabel}
      {...rest}
    >
      {React.isValidElement(iconElement)
        ? React.cloneElement(iconElement, a11yProps)
        : null}
    </Button>
  )
})

if (__DEV__) {
  IconButton.displayName = "IconButton"
}
