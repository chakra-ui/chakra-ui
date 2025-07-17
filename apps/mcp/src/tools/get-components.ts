import { componentList } from "../components.js"
import type { Tool } from "../lib/types.js"

export const getComponentsTool: Tool = {
  name: "get_components",
  description:
    "Get a list of Chakra UI components. This tool retrieves the names of all available Chakra UI components.",
  exec(server, { name, description }) {
    server.tool(name, description, {}, async () => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(componentList),
          },
        ],
      }
    })
  },
}
