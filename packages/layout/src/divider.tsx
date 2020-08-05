import * as React from "react"
import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

/**
 * Layout component used to visually separate content in a list or group.
 *
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/components/divider
 */
export const Divider: React.FC<DividerProps> = forwardRef((props, ref) => {
  const { className, orientation = "horizontal", ...rest } = props

  const styles = {
    vertical: {
      borderLeftWidth: "1px",
      height: "100%",
    },
    horizontal: {
      borderBottomWidth: "1px",
      width: "100%",
    },
  }

  return (
    <chakra.hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      {...rest}
      __css={{
        border: "0",
        opacity: 0.6,
        borderColor: "inherit",
        borderStyle: "solid",
        ...styles[orientation],
      }}
      className={cx("chakra-divider", props.className)}
    />
  )
})

export type DividerProps = PropsOf<typeof chakra.hr> & {
  orientation?: "horizontal" | "vertical"
}

if (__DEV__) {
  Divider.displayName = "Divider"
}
