import { styleConfig } from "@chakra-ui/theme-tools"

const heading = styleConfig({
  parts: {
    heading: "typography - the heading",
  },
  baseStyle: {
    heading: {
      fontFamily: "heading",
      lineHeight: "shorter",
      fontWeight: "bold",
    },
  },
  sizes: {
    "2xl": {
      heading: { fontSize: ["4xl", null, "5xl"] },
    },
    xl: {
      heading: { fontSize: ["3xl", null, "4xl"] },
    },
    lg: {
      heading: { fontSize: ["2xl", null, "3xl"] },
    },
    md: { heading: { fontSize: "xl" } },
    sm: { heading: { fontSize: "md" } },
    xs: { heading: { fontSize: "sm" } },
  },
  defaultProps: {
    size: "xl",
  },
})

export default heading
