"use client"

import { chakra } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

const Flex = chakra("div", {
  base: {
    display: "flex",
    gap: "4",
  },
  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
    },
  },
})

export const SystemFlexRecipe = () => {
  return (
    <Flex direction="row" align="center" justify="center">
      <DecorativeBox height="10">Item 1</DecorativeBox>
      <DecorativeBox height="20">Item 2</DecorativeBox>
    </Flex>
  )
}
