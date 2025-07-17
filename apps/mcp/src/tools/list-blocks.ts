import type { Tool } from "../lib/types.js"

export const listBlocksTool: Tool = {
  name: "list_blocks",
  description:
    "List all available blocks in the Chakra UI pro. This tool retrieves the names of all available blocks in the Chakra UI pro, which can be used to enhance the design and functionality of your application.",
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
