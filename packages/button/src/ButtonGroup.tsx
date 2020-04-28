import { chakra, PropsOf } from "@chakra-ui/system"
import { getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type ButtonGroupProps = PropsOf<typeof chakra.div>

export const ButtonGroup = (props: ButtonGroupProps) => {
  const { size, colorScheme, variant, children, ...rest } = props

  const validChildren = getValidChildren(children)

  const css = {
    "> *:first-of-type:not(:last-of-type)": { borderRightRadius: 0 },
    "> *:not(:first-of-type):not(:last-of-type)": { borderRadius: 0 },
    "> *:not(:first-of-type):last-of-type": { borderLeftRadius: 0 },
  }

  const clones = validChildren.map(child => {
    return React.cloneElement(child as any, {
      size,
      colorScheme: child.props.colorScheme || colorScheme,
      variant: child.props.variant || variant,
      _focus: { boxShadow: "outline", zIndex: 1 },
    })
  })

  return (
    <chakra.div
      display="flex"
      role="group"
      whiteSpace="nowrap"
      sx={css}
      {...rest}
      children={clones}
    />
  )
}

if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup"
}
