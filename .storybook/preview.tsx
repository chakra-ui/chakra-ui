import { withThemeByClassName } from "@storybook/addon-themes"
import { Preview, ReactRenderer } from "@storybook/react"
import React from "react"
import { ChakraProvider, defaultSystem } from "../packages/react/src"

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
        light: "",
        dark: "dark",
      },
    }),
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
