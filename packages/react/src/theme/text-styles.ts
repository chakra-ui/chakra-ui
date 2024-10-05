import { defineTextStyles } from "../styled-system"

export const textStyles = defineTextStyles({
  "2xs": { value: { fontSize: "2xs", lineHeight: "moderate" } },
  xs: { value: { fontSize: "xs", lineHeight: "moderate" } },
  sm: { value: { fontSize: "sm", lineHeight: "moderate" } },
  md: { value: { fontSize: "md", lineHeight: "moderate" } },
  lg: { value: { fontSize: "lg", lineHeight: "moderate" } },
  xl: { value: { fontSize: "xl", lineHeight: "moderate" } },
  "2xl": { value: { fontSize: "2xl", lineHeight: "shorter" } },
  "3xl": { value: { fontSize: "3xl", lineHeight: "shorter" } },
  "4xl": {
    value: { fontSize: "4xl", lineHeight: "shorter", letterSpacing: "tight" },
  },
  "5xl": {
    value: { fontSize: "5xl", lineHeight: "shorter", letterSpacing: "tight" },
  },
  "6xl": {
    value: { fontSize: "6xl", lineHeight: "shorter", letterSpacing: "tight" },
  },
  "7xl": {
    value: { fontSize: "7xl", lineHeight: "shorter", letterSpacing: "tight" },
  },
  none: {
    value: {},
  },
})
