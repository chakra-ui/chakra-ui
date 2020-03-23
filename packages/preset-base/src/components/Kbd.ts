import { ComponentTheme, getModeColor } from "./utils"

const Kbd: ComponentTheme = {
  baseStyle: (props: any) => ({
    bg: getModeColor(props, "gray.100", "whiteAlpha"),
    borderRadius: "md",
    border: "1px",
    borderColor: "inherit",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap",
  }),
}

export default Kbd
