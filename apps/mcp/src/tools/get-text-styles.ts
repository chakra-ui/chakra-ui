import { defaultSystem } from "@chakra-ui/react/preset"
import type { Tool } from "../lib/types.js"
import { walkObject } from "../lib/walk-object.js"

const getTextStyles = () => {
  const textStyles = defaultSystem._config.theme?.textStyles ?? {}
  const keys = new Set<string>([])
  walkObject(
    textStyles,
    (value, path) => {
      keys.add(path.join("."))
      return value
    },
    {
      stop(value) {
        return typeof value === "object" && "value" in value
      },
    },
  )
  return Array.from(keys)
}

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
