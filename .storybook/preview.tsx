import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview, ReactRenderer } from "@storybook/react"
import React from "react"
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
} from "../packages/react/src"

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Inter, sans-serif" },
        body: { value: "Inter, sans-serif" },
        mono: { value: "Roboto Mono, monospace" },
      },
    },
  },
})

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: "light",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
    (Story) => (
      <ChakraProvider value={system}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
