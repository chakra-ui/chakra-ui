import { forwardRef } from "@chakra-ui/system"
import { cloneElement, isValidElement } from "react"
import { Button, ButtonProps } from "./button"

type OmittedProps =
  | "leftIcon"
  | "rightIcon"
  | "loadingText"
  | "iconSpacing"
  | "spinnerPlacement"

interface BaseButtonProps extends Omit<ButtonProps, OmittedProps> {}

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   * @type React.ReactElement
   */
  icon?: React.ReactElement
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   *
   * @default false
   */
  isRound?: boolean
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string
}

/**
 * Icon button renders an icon within a button.
 *
 * @see Docs https://chakra-ui.com/docs/components/icon-button
 */
export const IconButton = forwardRef<IconButtonProps, "button">(
  (props, ref) => {
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
        borderRadius={isRound ? "full" : undefined}
        ref={ref}
        aria-label={ariaLabel}
        {...rest}
      >
        {_children}
      </Button>
    )
  },
)

IconButton.displayName = "IconButton"
