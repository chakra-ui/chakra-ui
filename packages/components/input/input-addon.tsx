import { chakra, forwardRef, HTMLChakraProps } from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { useInputGroupStyles } from "./input-group"

type Placement = "left" | "right"

const placements = {
  left: {
    marginEnd: "-1px",
    borderEndRadius: 0,
    borderEndColor: "transparent",
  },
  right: {
    marginStart: "-1px",
    borderStartRadius: 0,
    borderStartColor: "transparent",
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
    const styles = useInputGroupStyles()

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

InputAddon.displayName = "InputAddon"

export type InputLeftAddonProps = InputAddonProps

/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */
export const InputLeftAddon = forwardRef<InputLeftAddonProps, "div">(
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

InputLeftAddon.displayName = "InputLeftAddon"

// This is used in `input-group.tsx`
InputLeftAddon.id = "InputLeftAddon"

export type InputRightAddonProps = InputAddonProps

/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */
export const InputRightAddon = forwardRef<InputRightAddonProps, "div">(
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

InputRightAddon.displayName = "InputRightAddon"

// This is used in `input-group.tsx`
InputRightAddon.id = "InputRightAddon"
