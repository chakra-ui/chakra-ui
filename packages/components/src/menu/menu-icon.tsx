import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

import { Children, cloneElement, isValidElement } from "react"
import { useMenuStyles } from "./menu"

export const MenuIcon: React.FC<HTMLChakraProps<"span">> = (props) => {
  const { className, children, ...rest } = props

  const styles = useMenuStyles()

  const child = Children.only(children)

  const clone = isValidElement(child)
    ? cloneElement<any>(child, {
        focusable: "false",
        "aria-hidden": true,
        className: cx("chakra-menu__icon", child.props.className),
      })
    : null

  const _className = cx("chakra-menu__icon-wrapper", className)

  return (
    <chakra.span className={_className} {...rest} __css={styles.icon}>
      {clone}
    </chakra.span>
  )
}

MenuIcon.displayName = "MenuIcon"
