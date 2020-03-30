import { SystemProps, chakra, PropsOf, ThemingProps } from "@chakra-ui/system"
import { getValidChildren } from "@chakra-ui/utils"
import * as React from "react"
import { ButtonProps } from "./Button"

export type ButtonGroupOptions = Omit<ThemingProps, "orientation"> & {
  /**
   * If `true`, the borderRadius of buttons will be altered
   * to look flushed together
   */
  isAttached?: boolean
  /**
   * Spacing between each button
   */
  spacing?: SystemProps["marginRight"]
  /**
   * The buttons to group
   */
  children?: React.ReactNode
}

export type ButtonGroupProps = PropsOf<typeof chakra.div> & ButtonGroupOptions

export const ButtonGroup = ({
  size,
  colorScheme,
  variant,
  isAttached,
  spacing = 2,
  children,
  ...rest
}: ButtonGroupProps) => {
  const validChildren = getValidChildren(children)

  const clones = validChildren.map((child, index) => {
    const isFirst = index === 0
    const isLast = index === validChildren.length - 1

    return React.cloneElement(child as React.ReactElement<ButtonProps>, {
      size,
      colorScheme: child.props.colorScheme || colorScheme,
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
