import { ComponentTheme, mode } from "./utils"

const Kbd: ComponentTheme = {
  baseStyle: props => ({
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    border: "1px solid",
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
