/**
 * Attempts to format `value` with prettier if it is available in the project.
 * Falls back to returning the raw string so codegen never hard-fails when the
 * project uses a different formatter (Biome, dprint, deno fmt, etc.).
 *
 * The actual on-disk formatting pass is handled by `io.write` via formatly,
 * which detects and delegates to whatever formatter the project has configured.
 */
export async function pretty(value: string): Promise<string> {
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
    })
  } catch {
    // prettier is not installed — return raw string and let formatly handle
    // the on-disk formatting pass in io.write
    return value
  }
}
