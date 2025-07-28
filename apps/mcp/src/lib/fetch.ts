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

// Base URLs for different API endpoints
const CHAKRA_BASE_URL = "https://chakra-ui.com"
const PRO_BASE_URL = "https://pro.chakra-ui.com"

/**
 * Generic fetch utility with consistent error handling
 */
async function fetchJson<T>(
  url: string,
  options?: RequestInit,
  errorContext?: string,
): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    const context = errorContext || `fetch ${url}`
    throw new Error(
      `Failed to ${context}: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<T>
}

/**
 * Creates a Chakra UI API URL
 */
function createChakraUrl(path: string): string {
  return `${CHAKRA_BASE_URL}${path}`
}

/**
 * Creates a Chakra UI Pro API URL
 */
function createProUrl(path: string): string {
  return `${PRO_BASE_URL}${path}`
}

/**
 * Creates authorization headers for Pro API
 */
function createAuthHeaders(apiKey: string): RequestInit {
  return {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }
}

/**
 * Fetches the list of all available Chakra UI components and charts
 */
export async function fetchComponentList(): Promise<ComponentList> {
  return fetchJson<ComponentList>(
    createChakraUrl("/r/types/index.json"),
    undefined,
    "fetch component list",
  )
}

/**
 * Fetches the properties/props for a specific Chakra UI component
 */
export async function fetchComponentProps(component: string): Promise<any> {
  return fetchJson(
    createChakraUrl(`/r/types/${component}.json`),
    undefined,
    `fetch props for component ${component}`,
  )
}

/**
 * Fetches example code for a specific Chakra UI component
 */
export async function fetchComponentExample(component: string): Promise<any> {
  return fetchJson(
    createChakraUrl(`/r/examples/${component}.json`),
    undefined,
    `fetch example for component ${component}`,
  )
}

/**
 * Fetches all available Chakra UI Pro blocks
 */
export async function fetchProBlocks(): Promise<ChakraProBlocksResponse> {
  return fetchJson<ChakraProBlocksResponse>(
    createProUrl("/api/blocks"),
    undefined,
    "fetch pro blocks",
  )
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

  return fetchJson(
    createProUrl(`/api/blocks/${category}/${id}`),
    createAuthHeaders(apiKey),
    `fetch pro block ${category}/${id}`,
  )
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
  return fetchJson(createChakraUrl("/api/theme"), undefined, "fetch theme")
}

/**
 * Fetches the token categories from the Chakra UI API
 */
export async function fetchTokenCategories(): Promise<any> {
  return fetchJson(
    createChakraUrl("/api/theme/tokens"),
    undefined,
    "fetch theme customization",
  )
}
