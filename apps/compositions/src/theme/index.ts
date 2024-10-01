import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  // Whether to use css reset
  preflight: true,

  // Global CSS for your app
  // https://next.chakra-ui.com/docs/theming/customization/global-css
  globalCss: {
    body: {
      // Sets the color palette for every component
      colorPalette: "accent",
    },
  },

  // Custom theme for your app
  // https://next.chakra-ui.com/docs/theming/overview
  theme: {},
})

// Styling engine for your app (pass to the ChakraProvider)
// https://next.chakra-ui.com/docs/theming/overview#system
export const system = createSystem(defaultConfig, config)
