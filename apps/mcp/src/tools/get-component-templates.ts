import { z } from "zod"
import { fetchProBlock, getProBlockContext } from "../lib/fetch.js"
import type { Tool } from "../lib/types.js"

export const getComponentTemplatesTool: Tool<{
  categories: string[]
  variants: string[]
}> = {
  name: "get_component_templates",
  description:
    "Retrieve well designed, fully responsive, and accessible component templates.",
  disabled(config) {
    return !config.apiKey
  },
  async ctx() {
    try {
      return await getProBlockContext()
    } catch (error) {
      throw new Error(
        `Failed to initialize component templates tool: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  },
  exec(server, { ctx, name, description, config }) {
    server.tool(
      name,
      description,
      {
        category: z
          .enum(ctx.categories as [string, ...string[]])
          .describe(
            "The name of the block category to retrieve from Chakra UI pro",
          ),
        id: z
          .enum(ctx.variants as [string, ...string[]])
          .describe(
            "The ID of the block variant to retrieve from Chakra UI pro",
          ),
      },
      async ({ category, id }) => {
        if (!config.apiKey) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: "Authentication required",
                  message: "This tool requires a valid Chakra UI Pro key.",
                  code: "UNAUTHORIZED",
                }),
              },
            ],
          }
        }

        try {
          const json = await fetchProBlock(category, id, config.apiKey)

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
                text: `Failed to fetch block ${category}/${id}: ${error instanceof Error ? error.message : "Unknown error"}`,
              },
            ],
          }
        }
      },
    )
  },
}
