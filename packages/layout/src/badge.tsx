import {
  chakra,
  forwardRef,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface BadgeProps
  extends HTMLChakraProps<"span">,
    ThemingProps<"Badge"> {}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
 */
export const Badge = forwardRef<BadgeProps, "span">((props, ref) => {
  const styles = useStyleConfig("Badge", props)
  const { className, ...rest } = omitThemingProps(props)

  return (
    <chakra.span
      ref={ref}
      className={cx("chakra-badge", props.className)}
      {...rest}
      __css={{
        display: "inline-block",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...styles,
      }}
    />
  )
})

if (__DEV__) {
  Badge.displayName = "Badge"
}
