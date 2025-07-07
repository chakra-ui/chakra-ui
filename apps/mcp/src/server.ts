import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { readFile, readdir } from "fs/promises"
import { join } from "path"
import { z } from "zod"

// Create server instance
const server = new McpServer({
  name: "chakra-ui-mcp-test",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
})

server.tool(
  "list_components",
  "List all available Chakra UI components with their exported members. You can filter by category and choose output format.",
  {
    state: z.object({
      category: z
        .string()
        .default("all")
        .describe(
          "Filter components by category/name (optional). Use 'all' to show all components.",
        ),
      format: z
        .enum(["text", "json", "detailed", "summary"])
        .default("text")
        .describe(
          "Output format: 'text' for simple list, 'json' for structured data, 'detailed' for full descriptions, 'summary' for overview",
        ),
    }),
  },
  async ({ state }) => {
    const components = await getChakraComponents()

    let resultText: string

    if (state.format === "json") {
      resultText = JSON.stringify(components, null, 2)
    } else if (state.category && state.category !== "all") {
      const filtered = components.filter(
        (comp) =>
          comp.name.toLowerCase().includes(state.category.toLowerCase()) ||
          comp.exports.some((exp) =>
            exp.toLowerCase().includes(state.category.toLowerCase()),
          ),
      )

      if (filtered.length === 0) {
        resultText = `No components found matching category: ${state.category}`
      } else if (state.format === "detailed") {
        resultText = filtered
          .map(
            (comp) =>
              `## ${comp.name}\n**Description:** ${comp.description}\n**Components:** ${comp.exports.join(", ")}\n**Count:** ${comp.exports.length} components`,
          )
          .join("\n\n")
      } else {
        resultText = filtered
          .map(
            (comp) =>
              `**${comp.name}**\n  Components: ${comp.exports.join(", ")}`,
          )
          .join("\n\n")
      }
    } else if (state.format === "summary") {
      const totalComponents = components.reduce(
        (sum, comp) => sum + comp.exports.length,
        0,
      )
      const familyCount = components.length

      resultText =
        `# Chakra UI Components Summary\n\n` +
        `**Total Component Families:** ${familyCount}\n` +
        `**Total Components:** ${totalComponents}\n\n` +
        `**Top 10 Component Families:**\n` +
        components
          .sort((a, b) => b.exports.length - a.exports.length)
          .slice(0, 10)
          .map(
            (comp, index) =>
              `${index + 1}. **${comp.name}** (${comp.exports.length} components)`,
          )
          .join("\n")
    } else if (state.format === "detailed") {
      resultText = components
        .map(
          (comp) =>
            `## ${comp.name}\n**Description:** ${comp.description}\n**Components:** ${comp.exports.join(", ")}\n**Count:** ${comp.exports.length} components`,
        )
        .join("\n\n")
    } else {
      // Default format: organized list
      resultText = components
        .map(
          (comp) =>
            `**${comp.name}**\n  Components: ${comp.exports.join(", ")}`,
        )
        .join("\n\n")
    }

    return {
      content: [
        {
          type: "text",
          text: resultText,
        },
      ],
    }
  },
)

async function getChakraComponents() {
  try {
    // Path to the Chakra UI components directory
    const componentsPath = join(
      process.cwd(),
      "../chakra-ui/packages/react/src/components",
    )

    // Read all directories in the components folder
    const componentDirs = await readdir(componentsPath, { withFileTypes: true })
    const components: Array<{
      name: string
      exports: string[]
      description?: string
    }> = []

    for (const dir of componentDirs) {
      if (dir.isDirectory()) {
        try {
          // Read the index.ts file for each component
          const indexPath = join(componentsPath, dir.name, "index.ts")
          const content = await readFile(indexPath, "utf-8")

          // Extract exported component names
          const exports = extractExports(content)

          if (exports.length > 0) {
            components.push({
              name: dir.name,
              exports: exports,
              description: `${dir.name} component family`,
            })
          }
        } catch (err) {
          // Skip directories without index.ts files
          continue
        }
      }
    }

    return components
  } catch (error) {
    throw new Error(
      `Failed to read Chakra UI components: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}

function extractExports(content: string): string[] {
  const exports: string[] = []

  // Match individual exports like: export { ComponentName }
  const singleExportMatches = content.match(/export\s*{\s*([^}]+)\s*}/g) || []
  for (const match of singleExportMatches) {
    const exportContent = match.replace(/export\s*{\s*/, "").replace(/\s*}/, "")
    const items = exportContent
      .split(",")
      .map((item) => {
        // Remove type exports and clean up names
        const cleaned = item.trim().replace(/^type\s+/, "")
        // Extract just the component name (before any 'as' keyword)
        return cleaned.split(/\s+as\s+/)[0].trim()
      })
      .filter(
        (item) =>
          item &&
          !item.startsWith("//") &&
          !item.includes("Props") &&
          !item.includes("Context") &&
          !item.includes("Provider") &&
          !item.startsWith("use") &&
          item !== "type",
      )
    exports.push(...items)
  }

  // Match default exports
  const defaultExportMatches =
    content.match(
      /export\s+(?:default\s+)?(?:const|function|class)\s+(\w+)/g,
    ) || []
  for (const match of defaultExportMatches) {
    const name = match.replace(
      /export\s+(?:default\s+)?(?:const|function|class)\s+/,
      "",
    )
    if (!name.includes("Props") && !name.startsWith("use")) {
      exports.push(name)
    }
  }

  return Array.from(new Set(exports)).sort()
}

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Chakra UI MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
