import { styleConfig } from "@chakra-ui/theme-tools"

const breadcrumb = styleConfig({
  parts: {
    link: "the breadcrumb",
    separator: "the separator between each link",
  },
  baseStyle: {
    link: {
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
})

export default breadcrumb
