import { defaultSystem } from "@chakra-ui/react/preset"
import type { Tool } from "../lib/types.js"

const getSemanticTokens = () => {
  return Array.from(
    defaultSystem.tokens.categoryMap.get("colors")!.entries() as [string, any],
  )
    .filter(([, value]) => !!value.extensions.conditions)
    .map(([key]) => key)
}

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
