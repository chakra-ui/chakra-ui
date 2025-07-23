import { z } from "zod"
import { fetchComponentExample, getAllComponentNames } from "../lib/fetch.js"
import type { Tool } from "../lib/types.js"

export const getComponentExampleTool: Tool<{ componentList: string[] }> = {
  name: "get_component_example",
  description:
    "Retrieve comprehensive example code and usage patterns for a specific Chakra UI component. This tool provides practical implementation examples including basic usage, advanced configurations, and common use cases with complete code snippets.",
  async ctx() {
    try {
      const componentList = await getAllComponentNames()
      return { componentList }
    } catch (error) {
      throw new Error(
        `Failed to initialize component example tool: ${error instanceof Error ? error.message : "Unknown error"}`,
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
            "The name of the Chakra UI component to get example code for",
          ),
      },
      async ({ component }) => {
        try {
          const json = await fetchComponentExample(component)

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
                text: `Failed to fetch example for component ${component}: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          }
        }
      },
    )
  },
}
