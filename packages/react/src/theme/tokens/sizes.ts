import { defineTokens } from "../../styled-system"
import { spacing } from "./spacing"

const largeSizes = defineTokens.sizes({
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
})

const namedSizes = defineTokens.sizes({
  max: { value: "max-content" },
  min: { value: "min-content" },
  fit: { value: "fit-content" },
  prose: { value: "60ch" },
  full: { value: "100%" },
  dvh: { value: "100dvh" },
  svh: { value: "100svh" },
  lvh: { value: "100lvh" },
  dvw: { value: "100dvw" },
  svw: { value: "100svw" },
  lvw: { value: "100lvw" },
  vw: { value: "100vw" },
  vh: { value: "100vh" },
})

const fractionalSizes = defineTokens.sizes({
  "1/2": { value: "50%" },
  "1/3": { value: "33.333333%" },
  "2/3": { value: "66.666667%" },
  "1/4": { value: "25%" },
  "3/4": { value: "75%" },
  "1/5": { value: "20%" },
  "2/5": { value: "40%" },
  "3/5": { value: "60%" },
  "4/5": { value: "80%" },
  "1/6": { value: "16.666667%" },
  "2/6": { value: "33.333333%" },
  "3/6": { value: "50%" },
  "4/6": { value: "66.666667%" },
  "5/6": { value: "83.333333%" },
  "1/12": { value: "8.333333%" },
  "2/12": { value: "16.666667%" },
  "3/12": { value: "25%" },
  "4/12": { value: "33.333333%" },
  "5/12": { value: "41.666667%" },
  "6/12": { value: "50%" },
  "7/12": { value: "58.333333%" },
  "8/12": { value: "66.666667%" },
  "9/12": { value: "75%" },
  "10/12": { value: "83.333333%" },
  "11/12": { value: "91.666667%" },
})

export const sizes = defineTokens.sizes({
  ...largeSizes,
  ...spacing,
  ...fractionalSizes,
  ...namedSizes,
})
