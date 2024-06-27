import { defineTextStyles } from "../styled-system"

export const textStyles = defineTextStyles({
  xs: { value: { fontSize: "xs", lineHeight: "base" } },
  sm: { value: { fontSize: "sm", lineHeight: "base" } },
  md: { value: { fontSize: "md", lineHeight: "base" } },
  lg: { value: { fontSize: "lg", lineHeight: "base" } },
  xl: { value: { fontSize: "xl", lineHeight: "base" } },
  "2xl": { value: { fontSize: "2xl", lineHeight: "shorter" } },
  "3xl": { value: { fontSize: "3xl", lineHeight: "shorter" } },
  "4xl": {
    value: {
      fontSize: "4xl",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
  },
  "5xl": {
    value: {
      fontSize: "5xl",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
  },
  "6xl": {
    value: {
      fontSize: "6xl",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
  },
  "7xl": {
    value: {
      fontSize: "7xl",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
  },
})
