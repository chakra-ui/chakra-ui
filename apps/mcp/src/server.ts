import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { initializeTools } from "./tools/index.js"

export const server = new McpServer({
  name: "chakra-ui",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
})

async function main() {
  await initializeTools(server)

  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.info("Chakra UI MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
