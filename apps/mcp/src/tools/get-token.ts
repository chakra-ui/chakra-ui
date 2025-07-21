import { z } from "zod"
import { getCategoryTokens, tokenCategories } from "../lib/system.js"
import { Tool } from "../lib/types.js"

export const getTokenTool: Tool = {
  name: "get_token",
  description:
    "Retrieve core theme tokens (non-semantic tokens). This tool is useful for retrieving tokens like colors, font sizes, etc., that are not semantic tokens.",
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        category: z
          .enum(tokenCategories as [string, ...string[]])
          .describe("The category of the token to retrieve"),
      },
      async ({ category }) => {
        const tokens = getCategoryTokens(category)
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(tokens),
            },
          ],
        }
      },
    )
  },
}
