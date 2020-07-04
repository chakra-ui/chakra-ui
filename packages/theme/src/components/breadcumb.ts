import { ComponentTheme } from "@chakra-ui/theme-tools"

const Breadcrumb: ComponentTheme = {
  baseStyle: {
    Separator: {},
    Link: {
      transition: "all 0.15s ease-out",
      cursor: "pointer",
      textDecoration: "none",
      outline: "none",
      color: "inherit",
      _hover: {
        textDecoration: "underline",
      },
      _focus: {
        boxShadow: "outline",
      },
    },
  },
}

export default Breadcrumb
