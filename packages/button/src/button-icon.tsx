import { chakra, HTMLChakraProps } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export const ButtonIcon: React.FC<HTMLChakraProps<"span">> = (props) => {
  const { children, className, ...rest } = props

  const _children = React.isValidElement(children)
    ? React.cloneElement(children, {
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

if (__DEV__) {
  ButtonIcon.displayName = "ButtonIcon"
}
