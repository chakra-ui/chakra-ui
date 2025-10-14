import { fetchTheme } from "../lib/fetch.js"
import type { Tool } from "../lib/types.js"

export const getThemeTool: Tool = {
  name: "get_theme",
  description: `Retrieve the theme specification (colors, fonts, textStyles, etc.) to design any page, component or section`,
  exec(server, { name, description }) {
    server.tool(name, description, async () => {
      const json = await fetchTheme()
      return {
        content: [
          {
            type: "text",
            text: `
  - tokens: core theme tokens (non-semantic tokens)
  - semanticTokens: context-aware tokens that works automatically for light and dark mode. Use this to remove hard-coded color values.
  - layerStyles: consistent container styling
  - textStyles: consistent text styling that combines font size, font weight, and line height.
  - animationStyles: shorthand for a bunch of animation styles (maps to the animationStyle style prop). When you use this, YOU MUST specify the animation duration and ease.
  `,
          },
          {
            type: "text",
            text: JSON.stringify(json),
          },
        ],
      }
    })
  },
}
