import type { Options } from "prettier"

export async function pretty(value: string, options: Options = {}) {
  try {
    const { format } = await import("prettier")
    return format(value, {
      parser: "typescript",
      bracketSpacing: true,
      jsxSingleQuote: false,
      printWidth: 160,
      proseWrap: "always",
      semi: false,
      singleQuote: false,
      tabWidth: 2,
      trailingComma: "all",
      ...options,
    })
  } catch {
    return value
  }
}
