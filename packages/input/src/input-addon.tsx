import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useInputGroup } from "./input-group"

type Placement = "left" | "right"

const placements = {
  left: {
    marginRight: "-1px",
    borderRightRadius: 0,
    borderRightColor: "transparent",
  },
  right: {
    marginRight: "-1px",
    borderLeftRadius: 0,
    borderLeftColor: "transparent",
  },
}

/**
 * StyledAddon
 *
 * Wrapper element around the InputAddon component
 */

const StyledAddon = chakra("div", {
  themeKey: "InputAddon",
  baseStyle: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
})

export type InputAddonProps = PropsOf<typeof StyledAddon> & {
  placement?: Placement
}

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */

export const InputAddon = React.forwardRef(function InputAddonProps(
  props: InputAddonProps,
  ref: React.Ref<any>,
) {
  const { placement = "left", ...rest } = props
  const placementStyles = placements[placement] ?? {}
  const group = useInputGroup()

  return (
    <StyledAddon
      ref={ref}
      {...placementStyles}
      {...rest}
      variant={group?.variant || props.variant}
      size={group?.size || props.size}
    />
  )
})

if (__DEV__) {
  InputAddon.displayName = "InputAddon"
}

/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */

export const InputLeftAddon = React.forwardRef(function InputLeftAddon(
  props: InputAddonProps,
  ref: React.Ref<any>,
) {
  const { leftAddon } = useInputGroup()

  useSafeLayoutEffect(() => {
    leftAddon?.mount()
    return () => leftAddon?.unmount()
  }, [])

  return (
    <InputAddon
      ref={ref}
      placement="left"
      {...props}
      className={cx("chakra-input__left-addon", props.className)}
    />
  )
})

if (__DEV__) {
  InputLeftAddon.displayName = "InputLeftAddon"
}

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */

export const InputRightAddon = React.forwardRef(function InputRightAddon(
  props: InputAddonProps,
  ref: React.Ref<any>,
) {
  const { rightAddon } = useInputGroup()

  useSafeLayoutEffect(() => {
    rightAddon?.mount()
    return () => rightAddon?.unmount()
  }, [])

  return (
    <InputAddon
      ref={ref}
      placement="right"
      {...props}
      className={cx("chakra-input__right-addon", props.className)}
    />
  )
})

if (__DEV__) {
  InputRightAddon.displayName = "InputRightAddon"
}
