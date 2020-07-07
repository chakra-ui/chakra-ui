import { chakra } from "@chakra-ui/system/src"
import { __DEV__, cx } from "@chakra-ui/utils/src"

/**
 * Layout component used to visually separate content in a list or group.
 *
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/components/divider
 */
export const Divider = chakra("hr", {
  themeKey: "Divider",
  baseStyle: {
    border: "0",
    opacity: 0.6,
    borderColor: "inherit",
    borderStyle: "solid",
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
