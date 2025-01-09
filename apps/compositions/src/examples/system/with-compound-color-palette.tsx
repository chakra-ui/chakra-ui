"use client"

import { chakra } from "@chakra-ui/react"

const Badge = chakra("div", {
  base: {
    px: "4",
    py: "2",
  },
  variants: {
    variant: {
      solid: {},
      subtle: {},
      outline: {},
    },
  },
  compoundVariants: [
    { variant: "solid", colorPalette: "gray", css: { bg: "gray.700" } },
    { variant: "subtle", colorPalette: "gray", css: { bg: "gray.300" } },
    {
      variant: "outline",
      colorPalette: "gray",
      css: { borderColor: "gray.700", color: "gray.700" },
    },
  ],
  defaultVariants: {
    variant: "subtle",
  },
})

export const WithCompoundColorPalette = () => {
  return (
    <Badge variant="solid" colorPalette="gray">
      Hello
    </Badge>
  )
}
