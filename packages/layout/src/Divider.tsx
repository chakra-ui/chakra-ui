import { chakra, PropsOf } from "@chakra-ui/system"

interface DividerOptions {
  orientation?: "horizontal" | "vertical"
}

export type DividerProps = PropsOf<typeof Divider>

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
