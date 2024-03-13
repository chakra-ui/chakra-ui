import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"

export interface WrapItemProps extends HTMLChakraProps<"div"> {}

export const WrapItem = forwardRef<WrapItemProps, "div">(
  function WrapItem(props, ref) {
    return (
      <chakra.div
        ref={ref}
        {...props}
        css={{ display: "flex", alignItems: "flex-start", ...props.css }}
        className={cx("chakra-wrap__item", props.className)}
      />
    )
  },
)

WrapItem.displayName = "WrapItem"
