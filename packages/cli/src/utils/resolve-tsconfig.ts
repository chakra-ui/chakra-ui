import createDebug from "debug"
import { createFilesMatcher, getTsconfig, parseTsconfig } from "get-tsconfig"
import type { TsConfigJsonResolved } from "get-tsconfig"
import { realpathSync, statSync } from "node:fs"
import { dirname, join, normalize, resolve } from "node:path"

const debug = createDebug("chakra:tsconfig")

type ConfigNode = {
  path: string
  config: TsConfigJsonResolved
  references?: ConfigNode[]
}

// resolve relative path to referenced tsconfig
function resolveReferencePath(configPath: string, refPath: string): string {
  const base = resolve(dirname(configPath), refPath)

  try {
    if (statSync(base).isFile()) return base
  } catch {}

  return join(base, "tsconfig.json")
}

// recursively load referenced tsconfigs
function loadReference(
  parent: ConfigNode,
  refPath: string,
  seen: Set<string>,
): ConfigNode {
  const configPath = resolveReferencePath(parent.path, refPath)

  const real = realpathSync(configPath)
  if (seen.has(real)) {
    throw new Error(`Circular tsconfig reference: ${configPath}`)
  }

  const config = parseTsconfig(configPath)
  const node: ConfigNode = {
    path: configPath,
    config,
  }

  // follow nested references
  seen.add(real)
  resolveReferences(node, seen)
  seen.delete(real)

  return node
}

// recursively resolve referenced tsconfigs
function resolveReferences(
  node: ConfigNode,
  seen = new Set<string>(),
): ConfigNode {
  const { references } = node.config
  if (!references?.length) return node

  debug("solution-style tsconfig detected, checking references...")
  node.references = references.flatMap((ref) => {
    // Skip references that are missing, malformed, or circular so a single
    // broken entry doesn't fail resolution for the whole project
    if (!ref?.path) {
      debug("invalid tsconfig reference in", node.path)
      return []
    }
    try {
      return [loadReference(node, ref.path, seen)]
    } catch (error) {
      debug("skipping unresolvable reference:", ref.path, error)
      return []
    }
  })

  return node
}

function findConfigForFile(root: ConfigNode, sourceFile: string): ConfigNode {
  function visit(node: ConfigNode): ConfigNode | undefined {
    // Explore children first so the first matching descendant wins.
    for (const ref of node.references ?? []) {
      const match = visit(ref)
      if (match) return match
    }

    const matcher = createFilesMatcher(node)
    return matcher(sourceFile) ? node : undefined
  }

  return visit(root) ?? root
}

function loadResolvedConfig(sourceFile: string): ConfigNode | undefined {
  const root = getTsconfig(sourceFile)
  if (!root) return undefined

  const real = realpathSync(root.path)
  const node: ConfigNode = {
    path: root.path,
    config: root.config,
  }

  const seen = new Set([real])
  const resolved = resolveReferences(node, seen)
  return findConfigForFile(resolved, sourceFile)
}

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
    const nearest = loadResolvedConfig(sourceFile)

    if (!nearest) {
      debug("no tsconfig found for", sourceFile)
      return undefined
    }

    // get-tsconfig returns forward-slash paths while reference resolution
    // produces native paths. Normalize so output is native on every platform.
    const configPath = normalize(nearest.path)
    debug("found tsconfig:", configPath)
    return configPath
  } catch (error) {
    debug("tsconfig resolution failed:", error)
    return undefined
  }
}
