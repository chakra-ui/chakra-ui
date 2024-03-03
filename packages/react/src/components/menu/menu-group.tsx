import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useMenuStyles } from "./menu-context"

export interface MenuGroupProps extends HTMLChakraProps<"div"> {}

export const MenuGroup = forwardRef<MenuGroupProps, "div">(
  function MenuGroup(props, ref) {
    const { title, children, className, ...rest } = props

    const _className = cx("chakra-menu__group__title", className)
    const styles = useMenuStyles()

    return (
      <div ref={ref} className="chakra-menu__group" role="group">
        {title && (
          <chakra.p className={_className} {...rest} css={styles.groupTitle}>
            {title}
          </chakra.p>
        )}
        {children}
      </div>
    )
  },
)

MenuGroup.displayName = "MenuGroup"
