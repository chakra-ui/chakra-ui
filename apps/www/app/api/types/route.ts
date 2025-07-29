import { readTypesFile } from "@/lib/read-types-file"

export const dynamic = "force-static"

export async function GET() {
  const typesIndex = await readTypesFile("index.json")
  if (!typesIndex) {
    return Response.json({ error: "Types data not found" }, { status: 404 })
  }
  return Response.json(typesIndex)
}
