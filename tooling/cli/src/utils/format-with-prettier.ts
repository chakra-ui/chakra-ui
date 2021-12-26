import { format, resolveConfig } from "prettier"

async function createFormatFileWithPrettier(content: string) {
  const prettierConfig = await resolveConfig(process.cwd())
  return format(String(content), {
    ...prettierConfig,
    parser: "typescript",
  })
}

export async function formatWithPrettierIfAvailable(content: string) {
  return createFormatFileWithPrettier(content)
}
