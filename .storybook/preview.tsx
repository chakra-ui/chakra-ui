import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview, ReactRenderer } from "@storybook/react"
import { Global } from "@storybook/theming"
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
        <Global
          styles={{ body: { fontSize: defaultSystem.token("fontSizes.sm") } }}
        />
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
