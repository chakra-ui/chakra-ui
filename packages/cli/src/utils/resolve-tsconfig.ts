import createDebug from "debug"
import { resolve } from "node:path"
import { parse } from "tsconfck"

const debug = createDebug("chakra:tsconfig")

/**
 * Resolves the correct tsconfig file for a given source file.
 *
 * Handles solution-style tsconfigs (e.g. Vite projects) where the root
 * tsconfig.json has `"files": []` and `"references": [...]`, and the
 * actual compiler options (like `paths`) live in a referenced config.
 */
export async function resolveTsconfig(
  sourceFile: string,
  tsconfigPath?: string,
): Promise<string | undefined> {
  if (tsconfigPath) {
    const resolved = resolve(tsconfigPath)
    debug("using explicit tsconfig:", resolved)
    return resolved
  }

  try {
    const result = await parse(sourceFile)

    if (!result.tsconfigFile) {
      debug("no tsconfig found for", sourceFile)
      return undefined
    }

    debug("found tsconfig:", result.tsconfigFile)

    // If this is a solution-style tsconfig (has references, no real files),
    // find the referenced config that contains `paths`
    if (result.referenced && result.referenced.length > 0) {
      debug("solution-style tsconfig detected, checking references...")

      for (const ref of result.referenced) {
        if (ref.tsconfig?.compilerOptions?.paths) {
          debug("found paths in referenced tsconfig:", ref.tsconfigFile)
          return ref.tsconfigFile
        }
      }

      // Fall back to the first referenced tsconfig
      debug("no paths found in references, using first reference")
      return result.referenced[0].tsconfigFile
    }

    return result.tsconfigFile
  } catch (error) {
    debug("tsconfig resolution failed:", error)
    return undefined
  }
}
