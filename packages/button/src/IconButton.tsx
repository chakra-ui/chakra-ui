import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { Button, ButtonProps } from "./Button"

export type IconButtonProps = Omit<
  ButtonProps,
  "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText"
> & {
  icon?: React.ReactElement
  isRound?: boolean
  "aria-label": string
}

export const IconButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
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
        {React.isValidElement(btnIcon)
          ? React.cloneElement(btnIcon, a11yProps)
          : null}
      </Button>
    )
  },
)

if (__DEV__) {
  IconButton.displayName = "IconButton"
}
