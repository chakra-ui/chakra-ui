import {
  chakra,
  forwardRef,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
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
    marginLeft: "-1px",
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

export interface InputAddonProps extends HTMLChakraProps<"div"> {
  placement?: Placement
}

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
export const InputAddon = forwardRef<InputAddonProps, "div">(
  function InputAddon(props, ref) {
    const { placement = "left", ...rest } = props
    const placementStyles = placements[placement] ?? {}
    const styles = useStyles()

    return (
      <StyledAddon
        ref={ref}
        {...rest}
        __css={{
          ...styles.addon,
          ...placementStyles,
        }}
      />
    )
  },
)

if (__DEV__) {
  InputAddon.displayName = "InputAddon"
}

/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */
export const InputLeftAddon = forwardRef<InputAddonProps, "div">(
  function InputLeftAddon(props, ref) {
    return (
      <InputAddon
        ref={ref}
        placement="left"
        {...props}
        className={cx("chakra-input__left-addon", props.className)}
      />
    )
  },
)

if (__DEV__) {
  InputLeftAddon.displayName = "InputLeftAddon"
}

// This is used in `input-group.tsx`
InputLeftAddon.id = "InputLeftAddon"

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */
export const InputRightAddon = forwardRef<InputAddonProps, "div">(
  function InputRightAddon(props, ref) {
    return (
      <InputAddon
        ref={ref}
        placement="right"
        {...props}
        className={cx("chakra-input__right-addon", props.className)}
      />
    )
  },
)

if (__DEV__) {
  InputRightAddon.displayName = "InputRightAddon"
}

// This is used in `input-group.tsx`
InputRightAddon.id = "InputRightAddon"
