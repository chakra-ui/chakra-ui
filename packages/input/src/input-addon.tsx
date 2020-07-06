import { chakra, PropsOf, useStyles } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

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

const StyledAddon = chakra("div", {
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
  const styles = useStyles()

  return (
    <StyledAddon
      ref={ref}
      __css={{
        ...placementStyles,
        ...styles.addon,
      }}
      {...rest}
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

//@ts-ignore
InputLeftAddon.groupId = "InputLeftAddon"

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */

export const InputRightAddon = React.forwardRef(function InputRightAddon(
  props: InputAddonProps,
  ref: React.Ref<any>,
) {
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

//@ts-ignore
InputRightAddon.groupId = "InputRightAddon"
