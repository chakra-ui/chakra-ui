import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import type { Tool, ToolConfig } from "../lib/types.js"
import { customizeThemeTool } from "./customize-theme.js"
import { getComponentExampleTool } from "./get-component-example.js"
import { getComponentPropsTool } from "./get-component-props.js"
import { getComponentTemplatesTool } from "./get-component-templates.js"
import { getThemeTool } from "./get-theme.js"
import { installationTool } from "./installation.js"
import { listComponentTemplatesTool } from "./list-component-templates.js"
import { listComponentsTool } from "./list-components.js"
import { searchDocsTool } from "./search-docs.js"
import { v2ToV3MigrationTool } from "./v2-to-v3-migration.js"

const tools: Tool[] = [
  getComponentExampleTool,
  getComponentPropsTool,
  getThemeTool,
  listComponentsTool,
  customizeThemeTool,
  v2ToV3MigrationTool,
  listComponentTemplatesTool,
  getComponentTemplatesTool,
  installationTool,
  searchDocsTool,
]

const registeredToolCache = new Map<string, Tool>()

export const initializeTools = async (
  server: McpServer,
  config: ToolConfig,
) => {
  const enabledTools = tools.filter((tool) => !tool.disabled?.(config))

  await Promise.all(
    enabledTools.map(async (tool) => {
      const toolCtx = await tool.ctx?.()
      if (registeredToolCache.has(tool.name)) {
        return
      }
      registeredToolCache.set(tool.name, tool)
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx,
        config,
      })
    }),
  )
}
