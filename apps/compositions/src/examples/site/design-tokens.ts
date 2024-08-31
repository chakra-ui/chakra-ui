import { defineTokens } from "@chakra-ui/react"

export const tokens = defineTokens({
  colors: {
    primary: { value: "#0FEE0F" },
    secondary: { value: "#EE0F0F" },
  },
  fonts: {
    body: { value: "system-ui, sans-serif" },
  },
  animations: {
    "slide-in-right": { value: "slide-in-right 0.5s ease-in-out" },
  },
})
