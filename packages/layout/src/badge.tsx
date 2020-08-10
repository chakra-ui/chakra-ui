import * as React from "react"
import {
  chakra,
  PropsOf,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  forwardRef,
} from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

export interface BadgeProps extends PropsOf<typeof chakra.span>, ThemingProps {}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/components/badge
 */
export const Badge = forwardRef<BadgeProps, "span">(function Badge(props, ref) {
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
