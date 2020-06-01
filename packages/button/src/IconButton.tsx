import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Button, ButtonProps } from "./Button"
import { forwardRef, Ref, isValidElement, cloneElement } from "react"

export type IconButtonProps = Omit<
  ButtonProps,
  "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText"
> & {
  icon?: React.ReactElement
  isRound?: boolean
  "aria-label": string
}

export const IconButton = forwardRef(
  (props: IconButtonProps, ref: Ref<any>) => {
    const { icon, children, isRound, "aria-label": ariaLabel, ...rest } = props

    /**
     * Passing the icon as prop or children should work
     */
    const btnIcon = icon || children

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
        {isValidElement(btnIcon) ? cloneElement(btnIcon, a11yProps) : null}
      </Button>
    )
  },
)

if (__DEV__) {
  IconButton.displayName = "IconButton"
}

IconButton.defaultProps = Button.defaultProps
