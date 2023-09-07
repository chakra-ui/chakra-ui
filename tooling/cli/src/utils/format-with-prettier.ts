import { format, resolveConfig } from "prettier"

export async function formatWithPrettier(content: string) {
  const prettierConfig = await resolveConfig(process.cwd())

  try {
    return await format(String(content), {
      ...prettierConfig,
      parser: "typescript",
    })
  } catch {
    // prettier fails when no tsconfig.json is found
    return String(content)
  }
}
