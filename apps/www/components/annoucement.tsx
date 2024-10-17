"use client"

import { chakra } from "@chakra-ui/react"

export const Annoucement = chakra("div", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    textStyle: "sm",
    gap: "2.5",
    px: "4",
    py: "2",
    fontWeight: "medium",
    layerStyle: "fill.subtle",
    colorPalette: "teal",
    bg: "teal.500/10",
    borderRadius: "l2",
    focusRing: "outside",
  },
})
