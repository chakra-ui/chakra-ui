import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { Tool } from "../lib/types.js"
import { getComponentExampleTool } from "./get-component-example.js"
import { getComponentPropsTool } from "./get-component-props.js"
import { getComponentTemplatesTool } from "./get-component-templates.js"
import { getLayerStylesTool } from "./get-layer-style.js"
import { getSemanticTokensTool } from "./get-semantic-tokens.js"
import { getTextStylesTool } from "./get-text-styles.js"
import { getTokenTool } from "./get-token.js"
import { listComponentTemplatesTool } from "./list-component-templates.js"
import { listComponentsTool } from "./list-components.js"
import { themeCustomizationTool } from "./theme-customization.js"
import { v2ToV3MigrationTool } from "./v2-to-v3-migration.js"

const baseTool: Tool[] = [
  getComponentExampleTool,
  getComponentPropsTool,
  getLayerStylesTool,
  getSemanticTokensTool,
  getTextStylesTool,
  getTokenTool,
  listComponentsTool,
  themeCustomizationTool,
  v2ToV3MigrationTool,
]

const proTools: Tool[] = [listComponentTemplatesTool, getComponentTemplatesTool]

export const initializeTools = async (
  server: McpServer,
  config: { apiKey?: string },
) => {
  const tools = config.apiKey ? [...baseTool, ...proTools] : baseTool

  await Promise.all(
    tools.map(async (tool) => {
      const toolCtx = await tool.ctx?.()
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx,
        config,
      })
    }),
  )
}
