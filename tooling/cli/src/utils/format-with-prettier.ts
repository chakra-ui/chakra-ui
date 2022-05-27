import { format, resolveConfig } from "prettier"

export async function formatWithPrettierIfAvailable(content: string) {
  const prettierConfig = await resolveConfig(process.cwd())

  try {
    return format(String(content), {
      ...prettierConfig,
      parser: "typescript",
    })
  } catch {
    // prettier fails when no tsconfig.json is found
    return String(content)
  }
}
