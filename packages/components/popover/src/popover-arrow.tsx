import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { usePopoverContext, usePopoverStyles } from "./popover-context"

export interface PopoverArrowProps extends HTMLChakraProps<"div"> {}

export function PopoverArrow(props: PopoverArrowProps) {
  const { bg, bgColor, backgroundColor } = props
  const { getArrowProps, getArrowInnerProps } = usePopoverContext()
  const styles = usePopoverStyles()
  const arrowBg = bg ?? bgColor ?? backgroundColor
  return (
    <chakra.div
      {...getArrowProps()}
      className="chakra-popover__arrow-positioner"
    >
      <chakra.div
        className={cx("chakra-popover__arrow", props.className)}
        {...getArrowInnerProps(props)}
        __css={{
          ...styles.arrow,
          "--popper-arrow-bg": arrowBg
            ? `colors.${arrowBg}, ${arrowBg}`
            : undefined,
        }}
      />
    </chakra.div>
  )
}

PopoverArrow.displayName = "PopoverArrow"
