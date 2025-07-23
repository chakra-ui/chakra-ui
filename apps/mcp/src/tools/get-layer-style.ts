import { getLayerStyles } from "../lib/system.js"
import type { Tool } from "../lib/types.js"

export const getLayerStylesTool: Tool = {
  name: "get_layer_styles",
  description:
    "Retrieve layer styles defined in the Chakra UI theme. This tool provides a list of available layer styles, which can be used for consistent container styling.",
  exec(server, { name, description }) {
    server.tool(name, description, async () => {
      const styles = getLayerStyles()
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
