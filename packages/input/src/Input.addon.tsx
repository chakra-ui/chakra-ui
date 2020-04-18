import { chakra, PropsOf, useColorModeValue } from "@chakra-ui/system"
import * as React from "react"
import { useInputGroup } from "./Input.group"
import { __DEV__ } from "@chakra-ui/utils"

export type Placement = "left" | "right"

function getPlacementStyles(placement: Placement) {
  if (placement === "left") {
    return {
      marginRight: "-1px",
      borderRightRadius: 0,
      borderRightColor: "transparent",
    }
  }

  if (placement === "right") {
    return {
      order: 1,
      borderLeftRadius: 0,
      borderLeftColor: "transparent",
    }
  }

  return {}
}

/**
 * StyledAddon
 *
 * Wrapper element around the InputAddon component
 */

const StyledAddon = chakra("div", { themeKey: "Input" })

export type InputAddonProps = PropsOf<typeof StyledAddon> & {
  placement?: Placement
}

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */

export function InputAddon({ placement = "left", ...props }: InputAddonProps) {
  const bg = useColorModeValue(`gray.100`, `whiteAlpha.300`)
  const placementStyles = getPlacementStyles(placement)

  const group = useInputGroup()

  return (
    <StyledAddon
      flex="0 0 auto"
      whiteSpace="nowrap"
      bg={bg}
      {...placementStyles}
      {...props}
      variant={group?.variant || props.variant}
      size={group?.size || props.size}
    />
  )
}

if (__DEV__) {
  InputAddon.displayName = "InputAddon"
}

/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */

export const InputLeftAddon = (props: InputAddonProps) => (
  <InputAddon placement="left" {...props} />
)

if (__DEV__) {
  InputLeftAddon.displayName = "InputLeftAddon"
}

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */

export const InputRightAddon = (props: InputAddonProps) => (
  <InputAddon placement="right" {...props} />
)

if (__DEV__) {
  InputRightAddon.displayName = "InputRightAddon"
}
