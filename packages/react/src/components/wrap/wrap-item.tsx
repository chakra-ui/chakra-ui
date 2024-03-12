import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"

export interface WrapItemProps extends HTMLChakraProps<"li"> {}

export const WrapItem = forwardRef<WrapItemProps, "li">(
  function WrapItem(props, ref) {
    return (
      <chakra.li
        ref={ref}
        {...props}
        css={{ display: "flex", alignItems: "flex-start", ...props.css }}
        className={cx("chakra-wrap__item", props.className)}
      />
    )
  },
)

WrapItem.displayName = "WrapItem"
