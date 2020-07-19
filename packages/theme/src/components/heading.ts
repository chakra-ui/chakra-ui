import { styleConfig } from "@chakra-ui/theme-tools"

const heading = styleConfig({
  baseStyle: {
    fontFamily: "heading",
    lineHeight: "shorter",
    fontWeight: "bold",
  },
  sizes: {
    "2xl": {
      fontSize: ["4xl", null, "5xl"],
    },
    xl: {
      fontSize: ["3xl", null, "4xl"],
    },
    lg: {
      fontSize: ["2xl", null, "3xl"],
    },
    md: { fontSize: "xl" },
    sm: { fontSize: "md" },
    xs: { fontSize: "sm" },
  },
  defaultProps: {
    size: "xl",
  },
})

export default heading
