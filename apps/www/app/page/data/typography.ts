// Typography
import { defineConfig } from "@chakra-ui/react"

export default defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#0FEE0F" },
        secondary: { value: "#EE0F0F" },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
  },
})
