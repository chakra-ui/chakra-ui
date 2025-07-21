import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { Tool } from "../lib/types.js"
import { getComponentExampleTool } from "./get-component-example.js"
import { getComponentPropsTool } from "./get-component-props.js"
import { getComponentTemplatesTool } from "./get-component-templates.js"
import { getComponentsTool } from "./get-components.js"
import { getLayerStylesTool } from "./get-layer-style.js"
import { getSemanticTokensTool } from "./get-semantic-tokens.js"
import { getTextStylesTool } from "./get-text-styles.js"
import { getTokenTool } from "./get-token.js"
import { listComponentTemplatesTool } from "./list-component-templates.js"
import { themeCustomizationTool } from "./theme-customization.js"
import { v2ToV3MigrationTool } from "./v2-to-v3-migration.js"

const baseTool: Tool[] = [
  getComponentsTool,
  getComponentPropsTool,
  getComponentExampleTool,
  getSemanticTokensTool,
  getTextStylesTool,
  getLayerStylesTool,
  v2ToV3MigrationTool,
  getTokenTool,
  themeCustomizationTool,
]

const proTools: Tool[] = [listComponentTemplatesTool, getComponentTemplatesTool]

const getAvailableTools = (): Tool[] => {
  const hasProApiKey = !!process.env.CHAKRA_PRO_API_KEY
  return hasProApiKey ? [...baseTool, ...proTools] : baseTool
}

export const tools = getAvailableTools()

export const initializeTools = async (server: McpServer) => {
  const availableTools = getAvailableTools()
  await Promise.all(
    availableTools.map(async (tool) => {
      const toolCtx = await tool.ctx?.()
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx,
      })
    }),
  )
}
