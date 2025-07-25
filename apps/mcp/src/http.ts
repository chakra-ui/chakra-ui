import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js"
import express from "express"
import { randomUUID } from "node:crypto"
import { server } from "./server.js"
import { initializeTools } from "./tools/index.js"

export async function main() {
  const app = express()
  app.use(express.json())

  // Store transports for each session type
  const transports = {
    streamable: {} as Record<string, StreamableHTTPServerTransport>,
    sse: {} as Record<string, SSEServerTransport>,
  }

  // Modern Streamable HTTP endpoint
  app.post("/mcp", async (req, res) => {
    // Check for existing session ID
    const apiKey = req.headers["x-api-key"] as string | undefined
    const sessionId = req.headers["mcp-session-id"] as string | undefined
    let transport: StreamableHTTPServerTransport

    if (sessionId && transports.streamable[sessionId]) {
      // Reuse existing transport
      transport = transports.streamable[sessionId]
    } else if (!sessionId && isInitializeRequest(req.body)) {
      // New initialization request
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId) => {
          // Store the transport by session ID
          transports.streamable[sessionId] = transport
        },
      })

      // Clean up transport when closed
      transport.onclose = () => {
        if (transport.sessionId) {
          delete transports.streamable[transport.sessionId]
        }
      }

      await initializeTools(server, { apiKey })

      // Connect to the MCP server
      await server.connect(transport)
    } else {
      // Invalid request
      console.error(
        "Invalid Streamable HTTP request: ",
        JSON.stringify(req.body, null, 2),
      )
      res.status(400).json({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Bad Request: No valid session ID provided",
        },
        id: null,
      })
      return
    }

    // Handle the request
    await transport.handleRequest(req, res, req.body)
  })

  // Reusable handler for GET and DELETE requests
  const handleSessionRequest = async (
    req: express.Request,
    res: express.Response,
  ) => {
    const sessionId = req.headers["mcp-session-id"] as string | undefined
    if (!sessionId || !transports.streamable[sessionId]) {
      console.error(
        "Invalid Streamable HTTP request (invalid/missing session ID): ",
        JSON.stringify(req.body, null, 2),
      )
      res.status(400).send("Invalid or missing session ID")
      return
    }

    console.log("Handling session request for ID:", sessionId)

    const transport = transports.streamable[sessionId]
    await transport.handleRequest(req, res)
  }

  app.get("/mcp", handleSessionRequest)
  app.delete("/mcp", handleSessionRequest)

  // Legacy SSE endpoint for older clients
  app.get("/sse", async (req, res) => {
    // Create SSE transport for legacy clients
    const apiKey = req.headers["x-api-key"] as string | undefined
    const transport = new SSEServerTransport("/messages", res)
    transports.sse[transport.sessionId] = transport

    res.on("close", () => {
      delete transports.sse[transport.sessionId]
    })

    await initializeTools(server, { apiKey })
    await server.connect(transport)
  })

  // Legacy message endpoint for older clients
  app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId as string
    const transport = transports.sse[sessionId]
    if (transport) {
      await transport.handlePostMessage(req, res, req.body)
    } else {
      console.error("No transport found for sessionId", sessionId)
      res.status(400).send("No transport found for sessionId")
    }
  })

  app.listen(3000, () => {
    console.info("Chakra MCP SSE Server running on http://localhost:3000")
  })
}

if (typeof require !== "undefined" && require.main === module) {
  main().catch(console.error)
}

if (
  import.meta.url === process.argv[1] ||
  import.meta.url === `file://${process.argv[1]}`
) {
  main().catch(console.error)
}
