import { getTextStyles } from "../lib/system.js"
import type { Tool } from "../lib/types.js"

export const getTextStylesTool: Tool = {
  name: "get_text_styles",
  description:
    "Retrieve text styles defined in the Chakra UI theme. This tool provides a list of all text styles available in the Chakra UI theme, which can be used for consistent typography across the application.",
  exec(server, { name, description }) {
    server.tool(name, description, async () => {
      const styles = getTextStyles()
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(styles),
          },
        ],
      }
    })
  },
}
