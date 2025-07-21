import type { Tool } from "../lib/types.js"

export const listComponentTemplatesTool: Tool = {
  name: "list_component_templates",
  description:
    "List all available component templates in the Chakra UI pro. This tool retrieves the names of all available component templates in the Chakra UI pro, which can be used to enhance the design and functionality of your application.",
  exec(server, { name, description }) {
    server.tool(name, description, {}, async () => {
      const res = await fetch("https://pro.chakra-ui.com/api/blocks")

      if (!res.ok) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to fetch blocks",
            },
          ],
        }
      }

      const json = await res.json()

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(json),
          },
        ],
      }
    })
  },
}
