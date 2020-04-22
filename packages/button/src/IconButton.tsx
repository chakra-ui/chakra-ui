import Icon from "@chakra-ui/icon"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { ElementType, forwardRef, Ref } from "react"
import { Button, ButtonProps } from "./Button"

export type IconButtonProps = Omit<
  ButtonProps,
  "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText"
> & {
  icon?: ElementType
  isRound?: boolean
  "aria-label": string
}

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: Ref<any>) => {
    const { icon, isRound, "aria-label": ariaLabel, ...rest } = props

    return (
      <Button
        padding="0"
        borderRadius={isRound ? "full" : "md"}
        ref={ref}
        aria-label={ariaLabel}
        {...rest}
      >
        <Icon aria-hidden focusable="false" as={icon} />
      </Button>
    )
  },
)

if (__DEV__) {
  IconButton.displayName = "IconButton"
}
