import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

export interface ToolConfig {
  apiKey?: string
}

export interface Tool<T = unknown> {
  name: string
  description: string
  ctx?(): Promise<T> | void
  disabled?(config: ToolConfig): boolean
  exec(
    server: McpServer,
    opts: { ctx: T; name: string; description: string; config: ToolConfig },
  ): Promise<void> | void
}
