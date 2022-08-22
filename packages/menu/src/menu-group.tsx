import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"

import { useMenuStyles } from "./menu"

export interface MenuGroupProps extends HTMLChakraProps<"div"> {}

export const MenuGroup = forwardRef<MenuGroupProps, "div">((props, ref) => {
  const { title, children, className, ...rest } = props

  const _className = cx("chakra-menu__group__title", className)
  const styles = useMenuStyles()

  return (
    <div ref={ref} className="chakra-menu__group" role="group">
      {title && (
        <chakra.p className={_className} {...rest} __css={styles.groupTitle}>
          {title}
        </chakra.p>
      )}
      {children}
    </div>
  )
})

if (__DEV__) {
  MenuGroup.displayName = "MenuGroup"
}
