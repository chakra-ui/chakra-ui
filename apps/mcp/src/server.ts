import { defaultSystem } from "@chakra-ui/react"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const getSemanticTokens = () => {
  return Array.from(
    defaultSystem.tokens.categoryMap.get("colors")!.entries() as [string, any],
  )
    .filter(([, value]) => !!value.extensions.conditions)
    .map(([key]) => key)
}

const ARK_BASE_URL = "https://ark-ui.com/api/types/react"

const COMPONENTS_LIST = [
  "accordion",
  "avatar",
  "button",
  "carousel",
  "checkbox",
  "card",
  "input",
  "link",
] as const

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
      .enum(COMPONENTS_LIST)
      .describe("The name of the Chakra UI component to get properties for"),
  },
  async ({ component }) => {
    const componentPropsResp = await fetch(`${ARK_BASE_URL}/${component}`)

    if (!componentPropsResp.ok) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to get component props",
          },
        ],
      }
    }

    const componentProps = await componentPropsResp.json()

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

server.tool(
  "get_component_recipe",
  "Use this tool to get design related props for a component, like size, variant, etc.",
  {
    component: z
      .enum(COMPONENTS_LIST)
      .describe("The name of the Chakra UI component to get properties for"),
  },
  async ({ component }) => {
    const recipeResp = await fetch(
      `https://chakra-ui.com/types/recipe/${component}.json`,
    )

    if (!recipeResp.ok) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to fetch recipe for component ${component}`,
          },
        ],
      }
    }

    const recipe = await recipeResp.json()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(recipe),
        },
      ],
    }
  },
)

server.tool(
  "get_component_example",
  "Retrieve comprehensive example code and usage patterns for a specific Chakra UI component. This tool provides practical implementation examples including basic usage, advanced configurations, and common use cases with complete code snippets.",
  {
    component: z
      .enum(COMPONENTS_LIST)
      .describe("The name of the Chakra UI component to get example code for"),
  },
  async ({ component }) => {
    const exampleResp = await fetch(
      `https://chakra-ui.com/examples/${component}.json`,
    )

    if (!exampleResp.ok) {
      return {
        content: [
          {
            type: "text",
            text: `Failed to fetch example for component ${component}`,
          },
        ],
      }
    }

    const example = await exampleResp.json()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(example),
        },
      ],
    }
  },
)

server.tool(
  "get_semantic_tokens",
  "Retrieve semantic tokens that works automatically for light and dark mode. This tool is useful for removing hard-coded color values or base color values like blue.500, gray.100, etc.",
  async () => {
    const tokens = getSemanticTokens()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(tokens),
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
