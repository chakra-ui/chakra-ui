import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-inter)" },
        body: { value: "var(--font-inter)" },
      },
    },
  },
  globalCss: {
    ":root": {
      "--header-height": { base: "64px", md: "104px" },
      "--content-height": "calc(100dvh - var(--header-height))",
    },
  },
})
