import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { cloneElement, isValidElement } from "react"

export function ButtonIcon(props: HTMLChakraProps<"span">) {
  const { children, className, ...rest } = props

  const _children = isValidElement(children)
    ? cloneElement<any>(children, {
        "aria-hidden": true,
        focusable: false,
      })
    : children

  const _className = cx("chakra-button__icon", className)

  return (
    <chakra.span
      display="inline-flex"
      alignSelf="center"
      flexShrink={0}
      {...rest}
      className={_className}
    >
      {_children}
    </chakra.span>
  )
}

ButtonIcon.displayName = "ButtonIcon"
