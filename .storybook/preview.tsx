import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview, ReactRenderer } from "@storybook/react-vite"
import { ThemeProvider } from "next-themes"
import React from "react"
import "./index.css"

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Layout",
          "Typography",
          "Components",
          "Charts",
          "Rich Text Editor",
        ],
      },
    },
    actions: { disable: true },
    controls: { disable: true },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: "light",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
    (Story, context) => {
      return (
        <ThemeProvider
          forcedTheme={context.globals.theme}
          enableSystem={false}
          attribute="class"
        >
          <Story />
        </ThemeProvider>
      )
    },
  ],
}

export default preview
