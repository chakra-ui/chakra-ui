import { ComponentTheme, getModeColor } from "./utils"

const Dialog: ComponentTheme = {
  baseStyle: (props: any) => ({
    Overlay: {
      bg: "rgba(0,0,0,0.4)",
    },
    Content: {
      borderRadius: "md",
      bg: getModeColor(props, "white", "gray.700"),
      color: "inherit",
      shadow:
        props.colorMode === "dark"
          ? "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px"
          : "0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)",
    },
    Header: {
      paddingX: 6,
      paddingY: 4,
      fontSize: "xl",
      fontWeight: "semibold",
    },
    Body: {
      paddingX: 6,
      paddingY: 2,
    },
    Footer: {
      paddingX: 6,
      paddingY: 4,
    },
  }),
}

export default Dialog
