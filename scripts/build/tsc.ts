import {
  cpSync,
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"

export async function generateTypes(dir: string) {
  const { execa } = await import("execa")

  await execa("pnpm", ["tsc", "--project", "tsconfig.build.json"], {
    cwd: dir,
    stdio: "inherit",
  })

  addRelativeExtensions(join(dir, "dist", "types"))

  try {
    cpSync(
      join(dir, "dist", "types", "index.d.ts"),
      join(dir, "dist", "types", "index.d.mts"),
    )
  } catch {
    console.log("No .dts file found")
  }
}

const relativeSpecifier =
  /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.\.?(?:\/[^"']*)?)\2/g

/**
 * The packages are `"type": "module"`, so under `moduleResolution: nodenext`
 * TypeScript resolves the declarations with Node's ESM rules, which need
 * explicit extensions. Rewrite `./x` to `./x.js` and `./dir` to `./dir/index.js`
 */
export function addRelativeExtensions(typesDir: string) {
  const files = readdirSync(typesDir, { recursive: true, encoding: "utf8" })

  for (const file of files) {
    if (!file.endsWith(".d.ts")) continue

    const path = join(typesDir, file)
    const content = readFileSync(path, "utf8")

    const next = content.replace(
      relativeSpecifier,
      (match, prefix, quote, spec) => {
        const base = join(dirname(path), spec)
        const isDir = spec === "." || spec === ".." || spec.endsWith("/")
        if (!isDir && existsSync(`${base}.d.ts`)) {
          return `${prefix}${quote}${spec}.js${quote}`
        }
        if (existsSync(join(base, "index.d.ts"))) {
          return `${prefix}${quote}${spec.replace(/\/$/, "")}/index.js${quote}`
        }
        return match
      },
    )

    if (next !== content) writeFileSync(path, next)
  }
}
