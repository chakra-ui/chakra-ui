import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, SystemStyleObject, chakra } from "../../styled-system"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverArrowProps extends HTMLChakraProps<"div"> {
  /**
   * The color of the arrow's shadow
   */
  shadowColor?: SystemStyleObject["color"]
}

const resolveVar = (scale: string, value: unknown) =>
  value ? `${scale}.${value}, ${value}` : undefined

export function PopoverArrow(props: PopoverArrowProps) {
  const { bg, bgColor, backgroundColor, shadow, boxShadow, shadowColor } = props

  const api = usePopoverContext()
  const styles = usePopoverStyles()

  const arrowBg = bg ?? bgColor ?? backgroundColor
  const arrowShadow = shadow ?? boxShadow

  return (
    <chakra.div
      {...api.getArrowProps()}
      className={cx("chakra-popover__arrow", props.className)}
    >
      <chakra.div
        className={cx("chakra-popover__arrow-inner", props.className)}
        {...api.getArrowInnerProps(props)}
        css={{
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
