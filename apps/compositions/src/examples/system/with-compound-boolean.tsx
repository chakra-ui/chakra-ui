"use client"

import { Stack, chakra } from "@chakra-ui/react"

const Badge = chakra("div", {
  base: {
    px: "4",
    py: "2",
  },
  variants: {
    variant: {
      solid: {},
      subtle: {},
    },
    pressed: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      pressed: true,
      css: { bg: "gray.700", color: "white" },
    },
    { variant: "subtle", pressed: true, css: { bg: "gray.300" } },
  ],
  defaultVariants: {
    variant: "subtle",
  },
})

export const WithCompoundBoolean = () => {
  return (
    <Stack>
      <Badge variant="solid" colorPalette="gray">
        Hello
      </Badge>
      <Badge variant="solid" colorPalette="gray" pressed>
        Hello
      </Badge>
    </Stack>
  )
}
