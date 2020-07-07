import { chakra, PropsOf } from "@chakra-ui/system/src"
import { __DEV__, cx } from "@chakra-ui/utils/src"

export type BadgeProps = PropsOf<typeof Badge>

/**
 * React component used to display notifications, messages, or
 * statuses in different shapes and sizes.
 *
 * @see Docs https://chakra-ui.com/components/badge
 */
export const Badge = chakra("span", {
  themeKey: "Badge",
  baseStyle: {
    display: "inline-block",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  attrs: (props) => ({
    className: cx("chakra-badge", props.className),
  }),
})

if (__DEV__) {
  Badge.displayName = "Badge"
}
