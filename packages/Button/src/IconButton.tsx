import * as React from "react"
import { Button, ButtonProps } from "./Button"
import Icon from "@chakra-ui/icon"

export type IconButtonProps = Omit<
  ButtonProps,
  "leftIcon" | "isFullWidth" | "rightIcon" | "loadingText"
> & {
  icon?: React.ElementType
  isRound?: boolean
  "aria-label": string
}

export const IconButton = React.forwardRef(
  (props: IconButtonProps, ref: React.Ref<any>) => {
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

IconButton.displayName = "IconButton"
IconButton.defaultProps = Button.defaultProps
