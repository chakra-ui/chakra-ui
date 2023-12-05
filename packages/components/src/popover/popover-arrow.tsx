import { chakra, HTMLChakraProps, SystemProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverArrowProps extends HTMLChakraProps<"div"> {
  /**
   * The color of the arrow's shadow
   */
  shadowColor?: SystemProps["color"]
}

const resolveVar = (scale: string, value: unknown) =>
  value ? `${scale}.${value}, ${value}` : undefined

export function PopoverArrow(props: PopoverArrowProps) {
  const { bg, bgColor, backgroundColor, shadow, boxShadow, shadowColor } = props
  const { getArrowProps, getArrowInnerProps } = usePopoverContext()
  const styles = usePopoverStyles()
  const arrowBg = bg ?? bgColor ?? backgroundColor
  const arrowShadow = shadow ?? boxShadow
  return (
    <chakra.div
      {...getArrowProps()}
      className="chakra-popover__arrow-positioner"
    >
      <chakra.div
        className={cx("chakra-popover__arrow", props.className)}
        {...getArrowInnerProps(props)}
        __css={{
          "--popper-arrow-shadow-color": resolveVar("colors", shadowColor),
          "--popper-arrow-bg": resolveVar("colors", arrowBg),
          "--popper-arrow-shadow": resolveVar("shadows", arrowShadow),
          ...styles.arrow,
        }}
      />
    </chakra.div>
  )
}

PopoverArrow.displayName = "PopoverArrow"
