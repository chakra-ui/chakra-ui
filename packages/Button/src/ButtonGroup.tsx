import { SystemProps, chakra, PropsOf } from "@chakra-ui/system"
import { cleanChildren } from "@chakra-ui/utils"
import * as React from "react"
import { ButtonProps } from "./Button"

export interface ButtonGroupOptions
  extends Pick<ButtonProps, "variantSize" | "variant" | "variantColor"> {
  /**
   * If `true`, the borderRadius of button that are direct children will be altered
   * to look flushed together
   */
  isAttached?: boolean
  spacing?: SystemProps["marginRight"]
}

export type ButtonGroupProps = PropsOf<typeof chakra.div> & ButtonGroupOptions

export const ButtonGroup = ({
  variantSize,
  variantColor,
  variant,
  isAttached,
  spacing = 2,
  children,
  ...rest
}: ButtonGroupProps) => {
  const validChildren = cleanChildren(children)

  const clones = validChildren.map((child, index) => {
    const isFirst = index === 0
    const isLast = index === validChildren.length - 1

    return React.cloneElement(child as React.ReactElement<ButtonProps>, {
      variantSize,
      variantColor: child.props.variantColor || variantColor,
      variant: child.props.variant || variant,
      _focus: { boxShadow: "outline", zIndex: 1 },
      ...(!isLast && !isAttached && { marginRight: spacing }),
      ...(isFirst && isAttached && { borderRightRadius: 0 }),
      ...(isLast && isAttached && { borderLeftRadius: 0 }),
      ...(!isLast && isAttached && { borderRightRadius: 0 }),
      ...(!isFirst && !isLast && isAttached && { borderRadius: 0 }),
    })
  })

  return <chakra.div display="inline-block" {...rest} children={clones} />
}
