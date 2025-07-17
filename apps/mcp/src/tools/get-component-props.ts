import { z } from "zod"
import { componentList } from "../components.js"
import type { Tool } from "../lib/types.js"

export const getComponentPropsTool: Tool = {
  name: "get_component_props",
  description:
    "Get detailed properties of a specific Chakra UI component. This tool retrieves the properties, attributes, design related props for a component, like size, variant, etc. and configuration options available for a given Chakra UI component.",
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        component: z
          .enum(componentList as [string, ...string[]])
          .describe(
            "The name of the Chakra UI component to get properties for",
          ),
      },
      async ({ component }) => {
        const res = await fetch(`https://chakra-ui.com/types/${component}.json`)

        if (!res.ok) {
          return {
            content: [
              {
                type: "text",
                text: "Failed to get component props",
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
      },
    )
  },
}
