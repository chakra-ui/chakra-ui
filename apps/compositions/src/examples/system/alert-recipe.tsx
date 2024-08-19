"use client"

import { chakra } from "@chakra-ui/react"

const Alert = chakra("div", {
  base: {
    lineHeight: "1",
    fontSize: "sm",
    fontWeight: "semibold",
    rounded: "md",
    padding: "4",
    fontFamily: "Inter",
    color: "white",
  },
  variants: {
    status: {
      default: { bg: "gray" },
      error: { bg: "red" },
      success: { bg: "green" },
      warning: { bg: "orange" },
    },
    caps: {
      true: {
        textTransform: "uppercase",
      },
    },
  },
})

export const SystemAlertRecipe = () => {
  return (
    <Alert status="success" caps>
      This is an alert
    </Alert>
  )
}
