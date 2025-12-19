import { data } from "@/lib/search"
import Fuse, { type IFuseOptions } from "fuse.js"

const BASE_URL = "https://chakra-ui.com"

interface InternalSearchItem {
  label: string
  value: string
  description: string
  category: string
}

export interface SearchItem {
  label: string
  slug: string
  url: string
  description: string
  category: string
}

const fuseOptions: IFuseOptions<InternalSearchItem> = {
  keys: [
    { name: "label", weight: 0.5 },
    { name: "description", weight: 0.3 },
    { name: "category", weight: 0.2 },
  ],
  threshold: 0.3,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  ignoreLocation: false,
  findAllMatches: true,
  useExtendedSearch: true,
}

function toSearchItem(item: InternalSearchItem): SearchItem {
  return {
    label: item.label,
    slug: `/${item.value}`,
    url: `${BASE_URL}/${item.value}`,
    description: item.description,
    category: item.category,
  }
}

function searchItems(query: string): SearchItem[] {
  const allItems = Object.values(data).flat()
  const fuse = new Fuse(allItems, fuseOptions)
  const results = fuse.search(query)

  return results
    .sort((a, b) => (a.score || 1) - (b.score || 1))
    .map((result) => toSearchItem(result.item))
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return Response.json(data)
  }

  const results = searchItems(query)

  return Response.json(results)
}
