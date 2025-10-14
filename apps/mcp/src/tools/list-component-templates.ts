import { fetchProBlocks } from "../lib/fetch.js"
import type { Tool } from "../lib/types.js"

export const listComponentTemplatesTool: Tool = {
  name: "list_component_templates",
  description:
    "List available component templates or blocks in the Chakra UI pro. This tool retrieves the names of all available component templates in the Chakra UI pro, which can be used to enhance the design and functionality of your application.",
  disabled(config) {
    return !config.apiKey
  },
  exec(server, { name, description }) {
    server.tool(name, description, {}, async () => {
      try {
        const json = await fetchProBlocks()

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(json),
            },
          ],
        }
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to fetch blocks: ${error instanceof Error ? error.message : "Unknown error"}`,
            },
          ],
        }
      }
    })
  },
}
