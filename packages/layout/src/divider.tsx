import { chakra } from "@chakra-ui/system"
import { __DEV__, cx } from "@chakra-ui/utils"

/**
 * Layout component used to visually separate content in a list or group.
 *
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/components/code
 */
export const Divider = chakra("hr", {
  themeKey: "Divider",
  baseStyle: {
    border: "0",
    opacity: 0.6,
    borderColor: "inherit",
  },
  attrs: (props) => ({
    role: "separator",
    "aria-orientation": props.variant ?? "horizontal",
    className: cx("chakra-divider", props.className),
  }),
})

if (__DEV__) {
  Divider.displayName = "Divider"
}
