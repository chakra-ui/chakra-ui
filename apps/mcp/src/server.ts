import { getArkComponentProps } from "@chakra-ui/docgen"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

// Create server instance
export const server = new McpServer({
  name: "chakra-ui-mcp-test",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
})

server.tool(
  "get_component_props",
  "Get detailed properties of a specific Chakra UI component. You can filter by category and choose output format.",
  {
    component: z
      .enum(["accordion", "avatar", "carousel", "checkbox"])
      .describe(
        "The name of the Chakra UI component to get properties for. Use 'all' to show all components.",
      ),
  },
  async ({ component }) => {
    const componentProps = await getArkComponentProps(component)

    if (!componentProps) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to get component properties",
          },
        ],
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(componentProps),
        },
      ],
    }
  },
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Chakra UI MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
