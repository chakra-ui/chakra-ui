import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

interface ServerConfig {
  apiKey?: string
}

export interface Tool<T = unknown> {
  name: string
  description: string
  ctx?(): Promise<T> | void
  disabled?(config: ServerConfig): boolean
  exec(
    server: McpServer,
    opts: { ctx: T; name: string; description: string; config: ServerConfig },
  ): Promise<void> | void
}
