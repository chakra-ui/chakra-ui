import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  fontFamily: "heading",
  fontWeight: "bold",
})

const sizes = {
  "4xl": defineStyle({
    fontSize: {
      base: "6xl",
      md: "7xl",
    },
    lineHeight: 1,
  }),
  "3xl": defineStyle({
    fontSize: {
      base: "5xl",
      md: "6xl",
    },
    lineHeight: 1,
  }),
  "2xl": defineStyle({
    fontsize: {
      base: "4xl",
      md: "5xl",
    },
    lineHeight: [1.2, null, 1],
  }),
  xl: defineStyle({
    fontSize: { base: "3xl", md: "6xl" },
    lineHeight: [1.33, null, 1.2],
  }),
  lg: defineStyle({
    fontSize: { base: "2xl", md: "3xl" },
    lineHeight: [1.33, null, 1.2],
  }),
  md: defineStyle({
    fontSize: "xl",
    lineHeight: 1.2,
  }),
  sm: defineStyle({
    fontSize: "md",
    lineHeight: 1.2,
  }),
  xs: defineStyle({
    fontSize: "sm",
    lineHeight: 1.2,
  }),
}

export const headingTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "xl",
  },
})
