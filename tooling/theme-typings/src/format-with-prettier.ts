import type { format, resolveConfig } from "prettier"

const createFormatFileWithPrettier = (prettier: {
  format: typeof format
  resolveConfig: typeof resolveConfig
}) => async (content: string) => {
  const prettierConfig = await prettier.resolveConfig(process.cwd())
  return prettier.format(String(content), {
    ...prettierConfig,
    parser: "typescript",
  })
}

export async function formatWithPrettierIfAvailable(content: string) {
  let prettier
  try {
    prettier = require("prettier")
  } catch {
    // silent exit if prettier is not installed
    return content
  }

  return createFormatFileWithPrettier(prettier)(content)
}
