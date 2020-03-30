import { ComponentTheme, mode } from "./utils"

const Popover: ComponentTheme = {
  baseStyle: props => ({
    Content: {
      bg: mode("white", "gray.700")(props),
      border: "1px solid",
      borderColor: "inherit",
      width: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      borderRadius: "md",
      boxShadow: "sm",
      maxWidth: "xs",
      _focus: {
        outline: 0,
        boxShadow: "outline",
      },
    },
    Header: {
      px: 3,
      py: 2,
      borderBottomWidth: "1px",
    },
    Body: {
      px: 3,
      py: 2,
      borderBottomWidth: "1px",
    },
  }),
}

export default Popover
