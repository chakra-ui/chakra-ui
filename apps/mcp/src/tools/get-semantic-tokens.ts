import { getSemanticTokens } from "../lib/system.js"
import type { Tool } from "../lib/types.js"

export const getSemanticTokensTool: Tool = {
  name: "get_semantic_tokens",
  description:
    "Retrieve semantic tokens that works automatically for light and dark mode. This tool is useful for removing hard-coded color values or base color values like blue.500, gray.100, etc.",
  exec(server, { name, description }) {
    server.tool(name, description, async () => {
      const tokens = getSemanticTokens()

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tokens),
          },
        ],
      }
    })
  },
}
