import { chakra, PropsOf } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"

interface DividerOptions {
  orientation?: "horizontal" | "vertical"
}

export type DividerProps = PropsOf<typeof Divider>

/**
 * Layout component used to visually separate content in a list or group.
 *
 * It display a thin horizontal or vertical line, and renders a `hr` tag.
 *
 * @see Docs https://chakra-ui.com/code
 */
export const Divider = chakra<"hr", DividerOptions>("hr", {
  themeKey: "Divider",
  baseStyle: {
    marginY: "8px",
    border: "0",
    borderBottom: "1px",
    opacity: 0.6,
    borderColor: "inherit",
  },
  attrs: props => ({
    role: "separator",
    "aria-orientation": props.orientation || "horizontal",
  }),
})

if (__DEV__) {
  Divider.displayName = "Divider"
}
