import { z } from "zod"
import type { Tool } from "../lib/types.js"

interface ChakraProBlockVariant {
  id: string
  name: string
  categoryId: string
  accessLevel: "free" | "pro"
}

interface ChakraProBlock {
  id: string
  name: string
  group: string
  description: string
  figmaNodeId: string
  variants: ChakraProBlockVariant[]
}

export const getComponentTemplatesTool: Tool<{
  categories: string[]
  variants: string[]
}> = {
  name: "get_component_templates",
  description:
    "Retrieve well designed, fully responsive, and accessible component templates.",
  async ctx() {
    const blocks = await fetch("https://pro.chakra-ui.com/api/blocks")

    if (!blocks.ok) {
      throw new Error("Failed to fetch blocks")
    }

    const json = (await blocks.json()) as { data: ChakraProBlock[] }

    return {
      categories: json.data.map((block) => block.id),
      variants: json.data.flatMap((block) => block.variants.map((v) => v.id)),
    }
  },
  exec(server, { ctx, name, description }) {
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
        if (!process.env.CHAKRA_PRO_API_KEY) {
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

        const res = await fetch(
          `https://pro.chakra-ui.com/api/blocks/${category}/${id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.CHAKRA_PRO_API_KEY}`,
            },
          },
        )

        if (!res.ok) {
          return {
            content: [
              {
                type: "text",
                text: "Failed to fetch block",
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
