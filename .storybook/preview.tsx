import { withThemeByClassName } from "@storybook/addon-themes"
import { Preview, ReactRenderer } from "@storybook/react"
import React from "react"
import { SystemProvider, defaultSystem } from "../packages/react/src"

const preview: Preview = {
  parameters: {},
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: "light",
      themes: {
        light: "",
        dark: "dark",
      },
    }),
    (Story) => (
      <SystemProvider value={defaultSystem}>
        <Story />
      </SystemProvider>
    ),
  ],
}

export default preview
