#!/usr/bin/env node
import process from "node:process"
import { type ZodTypeAny, z } from "zod"
import type { ToolConfig } from "./lib/types.js"
import { tools } from "./tools/index.js"

type ToolRunner = {
  name: string
  description: string
  schema?: unknown
  handler: (params: Record<string, unknown>) => Promise<unknown> | unknown
}

type ParsedArgs = {
  toolName?: string
  options: Record<string, string>
}

type ToolContent = { text: string }
type ToolResult = { content?: ToolContent[]; isError?: boolean }

type ToolRegistrar = {
  tool: (
    name: string,
    description: string,
    schemaOrHandler: unknown,
    maybeHandler?: unknown,
  ) => void
}

const RESERVED_FLAGS = new Set(["api-key", "json", "help"])

const isZodSchema = (schema: unknown): schema is ZodTypeAny => {
  return Boolean(
    schema && typeof (schema as ZodTypeAny).safeParse === "function",
  )
}

const normalizeSchema = (schema: unknown): ZodTypeAny | null => {
  if (!schema) return null
  if (isZodSchema(schema)) return schema

  if (schema && typeof schema === "object" && !Array.isArray(schema)) {
    const entries = Object.entries(schema as Record<string, unknown>)

    if (entries.length === 0) {
      return null
    }

    if (entries.every(([, value]) => isZodSchema(value))) {
      return z.object(schema as Record<string, ZodTypeAny>)
    }
  }

  return null
}

const parseArgs = (argv: string[]): ParsedArgs => {
  const [toolName, ...rest] = argv
  const options: Record<string, string> = {}

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i]
    if (arg.startsWith("--")) {
      const key = arg.slice(2)
      const next = rest[i + 1]
      if (next && !next.startsWith("--")) {
        options[key] = next
        i++
      } else {
        options[key] = "true"
      }
    }
  }

  return { toolName, options }
}

const printHelp = (
  toolDefs: Iterable<{ name: string; description: string }>,
) => {
  console.log("Chakra UI MCP CLI")
  console.log("Usage: chakra-ui-mcp-cli <tool-name> [--option value]")
  console.log("")
  console.log("Available tools:")
  for (const runner of toolDefs) {
    console.log(`  - ${runner.name}: ${runner.description}`)
  }
  console.log("")
  console.log(
    "Use --api-key to provide a Chakra Pro API key for Pro-only tools (or set CHAKRA_PRO_API_KEY).",
  )
  console.log("Use --json true to return raw JSON payloads when available.")
}

const buildToolRunners = async (
  config: ToolConfig,
  targetTool?: string,
): Promise<Map<string, ToolRunner>> => {
  const runners = new Map<string, ToolRunner>()

  const candidates = tools.filter(
    (tool) => !targetTool || tool.name === targetTool,
  )

  await Promise.all(
    candidates.map(async (tool) => {
      if (tool.disabled?.(config)) {
        return
      }

      const ctx = await tool.ctx?.()

      const stubServer: ToolRegistrar = {
        tool(
          name: string,
          description: string,
          schemaOrHandler: unknown,
          maybeHandler?: unknown,
        ) {
          const handler =
            typeof schemaOrHandler === "function"
              ? schemaOrHandler
              : maybeHandler
          const schema =
            typeof schemaOrHandler === "function" ? undefined : schemaOrHandler

          if (typeof handler !== "function") return

          runners.set(name, {
            name,
            description,
            schema,
            handler: handler as ToolRunner["handler"],
          })
        },
      }

      await tool.exec(stubServer, {
        ctx,
        name: tool.name,
        description: tool.description,
        config,
      })
    }),
  )

  return runners
}

const isToolContent = (value: unknown): value is ToolContent => {
  return Boolean(
    value &&
    typeof value === "object" &&
    "text" in value &&
    typeof (value as ToolContent).text === "string",
  )
}

const getContent = (value: unknown): ToolContent[] | null => {
  if (!value || typeof value !== "object") return null
  const content = (value as ToolResult).content
  if (!Array.isArray(content)) return null
  return content.filter(isToolContent)
}

const formatOutput = (result: unknown, asJson: boolean) => {
  const content = getContent(result)
  if (!content || content.length === 0) {
    console.log("No content returned.")
    return
  }

  content.forEach((item, index) => {
    if (asJson) {
      try {
        const parsed = JSON.parse(item.text)
        console.log(JSON.stringify(parsed, null, 2))
        return
      } catch {
        console.warn(
          `Unable to parse response item ${index + 1} as JSON. Showing raw text.`,
        )
      }
    }

    if (item?.text) {
      console.log(item.text)
    }
  })
}

async function main() {
  const { toolName, options } = parseArgs(process.argv.slice(2))
  const apiKey = options["api-key"] ?? process.env.CHAKRA_PRO_API_KEY
  const asJson = options["json"] === "true"

  const enabledToolDefs = tools.filter((tool) => !tool.disabled?.({ apiKey }))

  if (!toolName) {
    printHelp(enabledToolDefs)
    process.exit(0)
  }

  if (toolName === "list" || options.help === "true") {
    printHelp(enabledToolDefs)
    process.exit(0)
  }

  const runners = await buildToolRunners({ apiKey }, toolName)
  const runner = runners.get(toolName)
  if (!runner) {
    console.error(`Unknown tool: ${toolName}`)
    printHelp(enabledToolDefs)
    process.exit(1)
  }

  const schema = normalizeSchema(runner.schema)
  const toolArgs = Object.fromEntries(
    Object.entries(options).filter(([key]) => !RESERVED_FLAGS.has(key)),
  )

  let params: Record<string, unknown> = toolArgs

  if (schema) {
    const validatedArgs = schema.safeParse(toolArgs)

    if (!validatedArgs.success) {
      console.error("Invalid arguments:")
      for (const issue of validatedArgs.error.issues) {
        console.error(
          ` - ${issue.path.join(".") || "(root)"}: ${issue.message}`,
        )
      }
      process.exit(1)
    }

    params = validatedArgs.data
  }

  try {
    const result = await runner.handler(params)
    formatOutput(result, asJson)
    if ((result as ToolResult | undefined)?.isError) {
      process.exitCode = 1
    }
  } catch (error) {
    console.error(
      `Failed to execute ${runner.name}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    )
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(
    `Unexpected error while running chakra-ui-mcp-cli: ${
      error instanceof Error ? error.message : "Unknown error"
    }`,
  )
  process.exit(1)
})
