import { ComponentTheme, getModeColor } from "./utils"

const Dialog: ComponentTheme = {
  baseStyle: props => ({
    Overlay: {
      bg: "rgba(0,0,0,0.4)",
    },
    Content: {
      bg: getModeColor(props, "gray.700", "white"),
      color: "inherit",
      shadow:
        props.colorMode === "dark"
          ? "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
          : "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
    },
  }),
}

export default Dialog
