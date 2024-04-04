import { defineTokens } from "../../styled-system"
import { spacing } from "./spacing"

const largeSizes = defineTokens.sizes({
  max: { value: "max-content" },
  min: { value: "min-content" },
  full: { value: "100%" },
  "3xs": { value: "14rem" },
  "2xs": { value: "16rem" },
  xs: { value: "20rem" },
  sm: { value: "24rem" },
  md: { value: "28rem" },
  lg: { value: "32rem" },
  xl: { value: "36rem" },
  "2xl": { value: "42rem" },
  "3xl": { value: "48rem" },
  "4xl": { value: "56rem" },
  "5xl": { value: "64rem" },
  "6xl": { value: "72rem" },
  "7xl": { value: "80rem" },
  "8xl": { value: "90rem" },
  prose: { value: "60ch" },
})

const container = defineTokens.sizes({
  sm: { value: "640px" },
  md: { value: "768px" },
  lg: { value: "1024px" },
  xl: { value: "1280px" },
})

export const sizes = defineTokens.sizes({
  ...spacing,
  ...largeSizes,
  container,
})
