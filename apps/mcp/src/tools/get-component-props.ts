import { z } from "zod"
import { fetchComponentProps, getRegularComponentNames } from "../lib/fetch.js"
import { type Tool } from "../lib/types.js"

export const getComponentPropsTool: Tool<{ componentList: string[] }> = {
  name: "get_component_props",
  description:
    "Get detailed properties of a specific Chakra UI component. This tool retrieves the properties, attributes, design related props for a component, like size, variant, etc. and configuration options available for a given Chakra UI component.",
  async ctx() {
    try {
      const componentList = await getRegularComponentNames()
      return { componentList }
    } catch (error) {
      throw new Error(
        `Failed to initialize component props tool: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  },
  exec(server, { ctx, name, description }) {
    server.tool(
      name,
      description,
      {
        component: z
          .enum(ctx.componentList as [string, ...string[]])
          .describe(
            "The name of the Chakra UI component to get properties for",
          ),
      },
      async ({ component }) => {
        try {
          const json = await fetchComponentProps(component)

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
                text: `Failed to get component props for ${component}: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          }
        }
      },
    )
  },
}
