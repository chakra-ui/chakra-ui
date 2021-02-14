import {
  chakra,
  forwardRef,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

type Placement = "left" | "right"

export interface InputAddonProps extends HTMLChakraProps<"div"> {
  placement?: Placement
}

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
export const InputAddon = forwardRef<InputAddonProps, "div">((props, ref) => {
  const { placement = "left", ...rest } = props
  const styles = useStyles()

  const cssStyles = {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    ...styles.addon,
    // Workaround to force the following css to be always placed _after_ the all above styes.
    // Otherwise, if css above contains any media queries,
    // they would be moved to the end and increased their priority.
    // See: https://github.com/emotion-js/emotion/issues/1860
    "&&": props.__css,
  }

  return (
    <chakra.div
      ref={ref}
      {...rest}
      __css={cssStyles}
      className={cx(`chakra-input__${placement}-addon`, props.className)}
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
export const InputLeftAddon = forwardRef<InputAddonProps, "div">(
  (props, ref) => (
    <InputAddon
      ref={ref}
      placement="left"
      __css={{
        marginRight: "-1px",
        borderRightColor: "transparent",
        borderRightRadius: 0,
      }}
      {...props}
    />
  ),
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
  (props, ref) => (
    <InputAddon
      ref={ref}
      placement="right"
      __css={{
        marginLeft: "-1px",
        borderLeftColor: "transparent",
        borderLeftRadius: 0,
      }}
      {...props}
    />
  ),
)

if (__DEV__) {
  InputRightAddon.displayName = "InputRightAddon"
}

// This is used in `input-group.tsx`
InputRightAddon.id = "InputRightAddon"
