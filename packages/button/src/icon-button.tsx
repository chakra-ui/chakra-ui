import { __DEV__ } from "@chakra-ui/utils"
import React, { ReactElement, isValidElement, cloneElement } from "react"
import { Button, ButtonProps } from "./button"
import { forwardRef } from "@chakra-ui/system"

type Omitted = "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText"

type BaseButtonProps = Omit<ButtonProps, Omitted>

export type IconButtonProps = BaseButtonProps & {
  icon?: ReactElement
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
  const element = icon || children
  const _children = isValidElement(element)
    ? cloneElement(element as any, {
        "aria-hidden": true,
        focusable: false,
      })
    : null

  return (
    <Button
      padding="0"
      borderRadius={isRound ? "full" : "md"}
      ref={ref}
      aria-label={ariaLabel}
      {...rest}
    >
      {_children}
    </Button>
  )
})

if (__DEV__) {
  IconButton.displayName = "IconButton"
}
