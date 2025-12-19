import { z } from "zod"
import { searchDocs } from "../lib/fetch.js"
import type { Tool } from "../lib/types.js"

export const searchDocsTool: Tool = {
  name: "search_docs",
  description:
    "Use as a last resort when other tools don't provide the needed information. Search Chakra UI documentation for components, styling guides, theming, and getting started guides. Returns matching documentation pages with their titles, descriptions, and URLs.",
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        query: z
          .string()
          .describe("Search query to find relevant documentation"),
      },
      async ({ query }) => {
        const results = await searchDocs(query)

        if (results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No documentation found for "${query}". Try searching for component names like "button", "modal", or topics like "styling", "theming".`,
              },
            ],
          }
        }

        const formattedResults = results
          .map(
            (item) =>
              `- ${item.label} (${item.category}): ${item.description}\n  URL: ${item.url}`,
          )
          .join("\n\n")

        return {
          content: [
            {
              type: "text",
              text: `Found ${results.length} result(s) for "${query}":\n\n${formattedResults}`,
            },
          ],
        }
      },
    )
  },
}
