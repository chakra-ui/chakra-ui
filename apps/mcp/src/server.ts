import { defaultSystem } from "@chakra-ui/react/preset"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { componentList } from "./components.js"
import { walkObject } from "./walk-object.js"

const getSemanticTokens = () => {
  return Array.from(
    defaultSystem.tokens.categoryMap.get("colors")!.entries() as [string, any],
  )
    .filter(([, value]) => !!value.extensions.conditions)
    .map(([key]) => key)
}

const getTextStyles = () => {
  const textStyles = defaultSystem._config.theme?.textStyles ?? {}
  const keys = new Set<string>([])
  walkObject(
    textStyles,
    (value, path) => {
      keys.add(path.join("."))
      return value
    },
    {
      stop(value) {
        return typeof value === "object" && "value" in value
      },
    },
  )
  return Array.from(keys)
}

export const server = new McpServer({
  name: "chakra-ui-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
})

server.tool(
  "get_components",
  "Get a list of Chakra UI components. This tool retrieves the names of all available Chakra UI components.",
  {},
  async () => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(componentList),
        },
      ],
    }
  },
)

server.tool(
  "get_component_props",
  "Get detailed properties of a specific Chakra UI component. This tool retrieves the properties, attributes, design related props for a component, like size, variant, etc. and configuration options available for a given Chakra UI component.",
  {
    component: z
      .enum(componentList as [string, ...string[]])
      .describe("The name of the Chakra UI component to get properties for"),
  },
  async ({ component }) => {
    const propsResp = await fetch(
      `https://chakra-ui.com/types/${component}.json`,
    )

    if (!propsResp.ok) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to get component props",
          },
        ],
      }
    }

    const componentProps = await propsResp.json()

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
  "get_component_example",
  "Retrieve comprehensive example code and usage patterns for a specific Chakra UI component. This tool provides practical implementation examples including basic usage, advanced configurations, and common use cases with complete code snippets.",
  {
    component: z
      .enum(componentList as [string, ...string[]])
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

server.tool(
  "get_text_styles",
  "Retrieve text styles defined in the Chakra UI theme. This tool provides a list of all text styles available in the Chakra UI theme, which can be used for consistent typography across the application.",
  async () => {
    const styles = getTextStyles()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(styles),
        },
      ],
    }
  },
)

server.tool(
  "list_blocks",
  "List all available blocks in the Chakra UI pro. This tool retrieves the names of all available blocks in the Chakra UI pro, which can be used to enhance the design and functionality of your application.",
  {},
  async () => {
    const blocksResp = await fetch("https://pro.chakra-ui.com/api/blocks")

    if (!blocksResp.ok) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to fetch blocks",
          },
        ],
      }
    }

    const blocks = await blocksResp.json()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(blocks),
        },
      ],
    }
  },
)

server.tool(
  "get_component_templates",
  "Retrieve well designed, fully responsive, and accessible component templates.",
  {
    category: z
      .enum(["banners"])
      .describe(
        "The name of the block category to retrieve from Chakra UI pro",
      ),
    id: z
      .enum(["banner-centered"])
      .describe("The ID of the block variant to retrieve from Chakra UI pro"),
  },
  async ({ category, id }) => {
    if (!process.env.CHAKRA_PRO_API_KEY) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: "Authentication required",
              message: "This tool requires a valid Chakra UI Pro key.",
              code: "UNAUTHORIZED",
            }),
          },
        ],
      }
    }

    const blockResp = await fetch(
      `https://pro.chakra-ui.com/api/blocks/${category}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAKRA_PRO_KEY}`,
        },
      },
    )

    if (!blockResp.ok) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to fetch block",
          },
        ],
      }
    }

    const blockData = await blockResp.json()

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(blockData),
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
