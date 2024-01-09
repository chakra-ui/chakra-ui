import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef, useStyleConfig } from "../system"
import { cx } from "@chakra-ui/utils/cx"

export interface BadgeProps
  extends HTMLChakraProps<"span">,
    ThemingProps<"Badge"> {}

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/badge
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

Badge.displayName = "Badge"
