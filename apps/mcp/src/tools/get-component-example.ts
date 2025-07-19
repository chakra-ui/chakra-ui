import { z } from "zod"
import type { Tool } from "../lib/types.js"

export const getComponentExampleTool: Tool<{ componentList: string[] }> = {
  name: "get_component_example",
  description:
    "Retrieve comprehensive example code and usage patterns for a specific Chakra UI component. This tool provides practical implementation examples including basic usage, advanced configurations, and common use cases with complete code snippets.",
  async ctx() {
    const componentsData = await fetch("https://chakra-ui.com/types/index.json")

    if (!componentsData.ok) {
      throw new Error("Failed to fetch components")
    }

    const componentList = (await componentsData.json()) as string[]

    return { componentList }
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
        const res = await fetch(
          `https://chakra-ui.com/examples/${component}.json`,
        )

        if (!res.ok) {
          return {
            content: [
              {
                type: "text",
                text: `Failed to fetch example for component ${component}`,
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
