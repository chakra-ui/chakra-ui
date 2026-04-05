import { HttpsProxyAgent } from "https-proxy-agent"
import fetch from "node-fetch"
import { z } from "zod"
import {
  componentListSchema,
  compositionFileSchema,
  compositionIndexSchema,
  proBlockResponseSchema,
  processEnvSchema,
  searchResultsSchema,
  themeIndexSchema,
} from "./schema"
import type { SearchItem } from "./schema"

interface ChakraProBlockVariant {
  id: string
  name: string
  categoryId: string
  accessLevel: "free" | "pro"
}

interface ChakraProBlock {
  id: string
  name: string
  group: string
  description: string
  figmaNodeId: string
  variants: ChakraProBlockVariant[]
}

interface ChakraProBlocksResponse {
  data: ChakraProBlock[]
}

const env = processEnvSchema.parse(process.env)

const agent = env.HTTPS_PROXY ? new HttpsProxyAgent(env.HTTPS_PROXY) : undefined

const docsOrigin = env.CHAKRA_DOCS_URL.replace(/\/$/, "")

function docsUrl(path: string): string {
  return `${docsOrigin}${path.startsWith("/") ? path : `/${path}`}`
}

function parseWithSchema<T>(
  json: unknown,
  schema: z.ZodType<T>,
  context: string,
): T {
  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((i) =>
        i.path.length ? `${i.path.join(".")}: ${i.message}` : i.message,
      )
      .join("; ")
    throw new Error(`Invalid ${context} response: ${detail}`)
  }
  return parsed.data
}

export async function fetchCompositions() {
  const res = await fetch(`${env.REGISTRY_URL}/compositions/index.json`, {
    agent,
  })
  const json = await res.json()
  return compositionIndexSchema.parse(json)
}

export async function fetchComposition(id: string) {
  try {
    const res = await fetch(`${env.REGISTRY_URL}/compositions/${id}.json`, {
      agent,
    })
    const json = await res.json()
    return compositionFileSchema.parse(json)
  } catch (error) {
    throw new Error(
      `Failed to fetch snippet "${id}". Make sure the id is correct or run @chakra-ui/cli snippet list to see available snippets.`,
    )
  }
}

export async function fetchProBlocks(): Promise<ChakraProBlocksResponse> {
  const res = await fetch("https://pro.chakra-ui.com/api/blocks", {
    agent,
  })

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pro blocks: ${res.status} ${res.statusText}`,
    )
  }

  return res.json() as Promise<ChakraProBlocksResponse>
}

export async function fetchComponentList() {
  const res = await fetch(`${docsUrl("/api/types")}`, { agent })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch component list: ${res.status} ${res.statusText}`,
    )
  }
  const json: unknown = await res.json()
  return parseWithSchema(json, componentListSchema, "component list")
}

export async function fetchComponentProps(component: string): Promise<unknown> {
  const res = await fetch(`${docsUrl(`/api/types/${component}`)}`, {
    agent,
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch props for "${component}": ${res.status} ${res.statusText}`,
    )
  }
  const json: unknown = await res.json()
  return parseWithSchema(json, z.unknown(), `props for "${component}"`)
}

export async function fetchComponentExample(
  component: string,
): Promise<unknown> {
  const res = await fetch(`${docsUrl(`/r/examples/${component}.json`)}`, {
    agent,
  })
  if (!res.ok) {
    throw new Error(
      `Failed to fetch example for "${component}": ${res.status} ${res.statusText}`,
    )
  }
  const json: unknown = await res.json()
  return parseWithSchema(json, z.unknown(), `example for "${component}"`)
}

export async function fetchTheme() {
  const res = await fetch(`${docsUrl("/api/theme")}`, { agent })
  if (!res.ok) {
    throw new Error(`Failed to fetch theme: ${res.status} ${res.statusText}`)
  }
  const json: unknown = await res.json()
  return parseWithSchema(json, themeIndexSchema, "theme")
}

export async function searchDocs(query: string): Promise<SearchItem[]> {
  const res = await fetch(
    `${docsUrl("/api/search")}?query=${encodeURIComponent(query)}`,
    { agent },
  )
  if (!res.ok) {
    throw new Error(`Failed to search docs: ${res.status} ${res.statusText}`)
  }
  const json: unknown = await res.json()
  return parseWithSchema(json, searchResultsSchema, "search")
}

export async function fetchProBlock(
  category: string,
  id: string,
  apiKey: string,
) {
  const res = await fetch(
    `https://pro.chakra-ui.com/api/blocks/${category}/${id}`,
    {
      agent,
      headers: {
        "x-api-key": apiKey,
      },
    },
  )

  if (!res.ok) {
    throw new Error(
      `Failed to fetch pro block ${category}/${id}: ${res.status} ${res.statusText}`,
    )
  }

  const json: unknown = await res.json()
  return parseWithSchema(json, proBlockResponseSchema, "pro block")
}

export type { SearchItem } from "./schema"
