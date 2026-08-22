#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { server } from "./server.js"
import { initializeTools } from "./tools/index.js"

async function main() {
  await initializeTools(server, {
    apiKey: process.env.CHAKRA_PRO_API_KEY,
  })

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
