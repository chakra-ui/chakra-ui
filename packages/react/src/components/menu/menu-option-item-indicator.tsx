import { dataAttr } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuStyles, useOptionItemStateContext } from "./menu-context"

const DefaultIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
    <polygon
      fill="currentColor"
      points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    />
  </chakra.svg>
)

export interface MenuOptionItemIndicatorProps extends HTMLChakraProps<"div"> {}

export const MenuOptionItemIndicator = forwardRef<
  MenuOptionItemIndicatorProps,
  "div"
>(function MenuOptionItemIndicator(props, ref) {
  const item = useOptionItemStateContext()
  const styles = useMenuStyles()
  return (
    <chakra.div
      ref={ref}
      {...props}
      aria-hidden
      data-type={item.type}
      data-checked={dataAttr(item.isChecked)}
      css={[styles.indicator, props.css]}
    >
      {props.children ?? <DefaultIcon />}
    </chakra.div>
  )
})

MenuOptionItemIndicator.displayName = "MenuOptionItemIndicator"
