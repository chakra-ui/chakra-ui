import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-wix-madefor)" },
        body: { value: "var(--font-wix-madefor)" },
      },
    },
  },
  globalCss: {
    ":root": {
      "--banner-height": "44px",
      "--header-height": { base: "64px", md: "104px" },
      "--content-height": "calc(100dvh - var(--header-height))",
      "--sidebar-height": "calc(var(--content-height) - var(--banner-height))",
    },
  },
})
