import { HTMLChakraProps, chakra } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"

import { Children, cloneElement, isValidElement } from "react"

export const MenuIcon: React.FC<HTMLChakraProps<"span">> = (props) => {
  const { className, children, ...rest } = props

  const child = Children.only(children)

  const clone = isValidElement(child)
    ? cloneElement(child, {
        focusable: "false",
        "aria-hidden": true,
        className: cx("chakra-menu__icon", child.props.className),
      })
    : null

  const _className = cx("chakra-menu__icon-wrapper", className)

  return (
    <chakra.span
      className={_className}
      {...rest}
      __css={{
        flexShrink: 0,
      }}
    >
      {clone}
    </chakra.span>
  )
}

MenuIcon.displayName = "MenuIcon"
