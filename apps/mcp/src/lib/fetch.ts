interface ComponentList {
  components: string[]
  charts: string[]
}

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

/**
 * Fetches the list of all available Chakra UI components and charts
 */
export async function fetchComponentList(): Promise<ComponentList> {
  const response = await fetch("https://chakra-ui.com/r/types/index.json")

  if (!response.ok) {
    throw new Error(
      `Failed to fetch component list: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<ComponentList>
}

/**
 * Fetches the properties/props for a specific Chakra UI component
 */
export async function fetchComponentProps(component: string): Promise<any> {
  const response = await fetch(
    `https://chakra-ui.com/r/types/${component}.json`,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch props for component ${component}: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}

/**
 * Fetches example code for a specific Chakra UI component
 */
export async function fetchComponentExample(component: string): Promise<any> {
  const response = await fetch(
    `https://chakra-ui.com/r/examples/${component}.json`,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch example for component ${component}: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}

/**
 * Fetches all available Chakra UI Pro blocks
 */
export async function fetchProBlocks(): Promise<ChakraProBlocksResponse> {
  const response = await fetch("https://pro.chakra-ui.com/api/blocks")

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pro blocks: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<ChakraProBlocksResponse>
}

/**
 * Fetches a specific Chakra UI Pro block by category and ID
 */
export async function fetchProBlock(
  category: string,
  id: string,
  apiKey?: string,
): Promise<any> {
  if (!apiKey) {
    throw new Error("Chakra UI Pro API key is required")
  }

  const response = await fetch(
    `https://pro.chakra-ui.com/api/blocks/${category}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pro block ${category}/${id}: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}

/**
 * Gets the combined list of all components (regular + charts)
 */
export async function getAllComponentNames(): Promise<string[]> {
  const componentList = await fetchComponentList()
  return [...componentList.components, ...componentList.charts]
}

/**
 * Gets only the regular components (excludes charts)
 */
export async function getRegularComponentNames(): Promise<string[]> {
  const componentList = await fetchComponentList()
  return componentList.components
}

/**
 * Gets the pro block categories and variants for context
 */
export async function getProBlockContext(): Promise<{
  categories: string[]
  variants: string[]
}> {
  const blocks = await fetchProBlocks()

  return {
    categories: blocks.data.map((block) => block.id),
    variants: blocks.data.flatMap((block) => block.variants.map((v) => v.id)),
  }
}

/**
 * Fetches the design context from the Chakra UI API
 */
export async function fetchTheme(): Promise<any> {
  const response = await fetch("https://chakra-ui.com/api/theme")

  if (!response.ok) {
    throw new Error(
      `Failed to fetch theme: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}

/**
 * Fetches the token categories from the Chakra UI API
 */
export async function fetchTokenCategories(): Promise<any> {
  const response = await fetch("https://chakra-ui.com/api/theme/tokens")
  if (!response.ok) {
    throw new Error(
      `Failed to fetch theme customization: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}
