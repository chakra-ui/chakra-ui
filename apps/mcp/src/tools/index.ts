import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { Tool } from "../lib/types.js"
import { getComponentExampleTool } from "./get-component-example.js"
import { getComponentPropsTool } from "./get-component-props.js"
import { getComponentTemplatesTool } from "./get-component-templates.js"
import { getComponentsTool } from "./get-components.js"
import { getSemanticTokensTool } from "./get-semantic-tokens.js"
import { getTextStylesTool } from "./get-text-styles.js"
import { listBlocksTool } from "./list-blocks.js"
import { v2ToV3MigrationTool } from "./v2-to-v3-migration.js"

const tools: Tool[] = [
  getComponentsTool,
  getComponentPropsTool,
  getComponentExampleTool,
  getSemanticTokensTool,
  getTextStylesTool,
  listBlocksTool,
  getComponentTemplatesTool,
  v2ToV3MigrationTool,
]

export const initializeTools = async (server: McpServer) => {
  await Promise.all(
    tools.map(async (tool) => {
      const toolCtx = await tool.ctx?.()
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx,
      })
    }),
  )
}

export { tools }
