import { HttpsProxyAgent } from "https-proxy-agent"
import fetch from "node-fetch"
import {
  compositionFileSchema,
  compositionIndexSchema,
  processEnvSchema,
} from "./schema"

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

export async function fetchProBlock(
  category: string,
  id: string,
  apiKey: string,
): Promise<any> {
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

  return res.json()
}
