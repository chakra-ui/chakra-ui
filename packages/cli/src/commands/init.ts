import * as p from "@clack/prompts"
import { Command } from "commander"
import { execSync } from "node:child_process"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const PANDA_CONFIG = `import chakraPreset from "@chakra-ui/panda-preset"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@chakra-ui/react-next/src/**/*.{ts,tsx}",
  ],
  presets: [chakraPreset],
  jsxFramework: "react",
  jsxStyleProps: "all",
  jsxFactory: "chakra",
  // Pre-generate CSS for every variant of supported components so styles ship
  // without needing the PostCSS plugin at runtime (Turbopack-friendly).
  staticCss: {
    recipes: {
      accordion: ["*"],
      badge: ["*"],
      carousel: ["*"],
      dialog: ["*"],
    },
  },
  importMap: "@chakra-ui/styled-system",
  outdir: "styled-system",
})
`

// CSS entry that declares the cascade layer order and imports the generated
// stylesheet. One line for the user, Tailwind-style. @import path is relative
// to the CSS file that contains it.
const VITE_CSS_ENTRY = `@layer reset, base, tokens, recipes, utilities;
@import "../styled-system/styles.css";
`

const NEXT_CSS_ENTRY = `@layer reset, base, tokens, recipes, utilities;
@import "../../../styled-system/styles.css";
`

function isNextJs(cwd: string): boolean {
  const candidates = ["next.config.js", "next.config.mjs", "next.config.ts"]
  return candidates.some((f) => existsSync(resolve(cwd, f)))
}

function findViteConfig(cwd: string): string | null {
  const candidates = ["vite.config.ts", "vite.config.js", "vite.config.mjs"]
  const found = candidates.find((f) => existsSync(resolve(cwd, f)))
  return found ? resolve(cwd, found) : null
}

function prependCssEntry(filePath: string, entry: string) {
  if (!existsSync(filePath)) {
    writeFileSync(filePath, entry)
    return "created"
  }
  const content = readFileSync(filePath, "utf-8")
  if (content.includes("styled-system/styles.css")) return "skipped"
  writeFileSync(filePath, entry + "\n" + content)
  return "updated"
}

function patchViteConfig(filePath: string) {
  const content = readFileSync(filePath, "utf-8")
  if (content.includes("dedupe") && content.includes("react")) return false

  const injection = `
  resolve: {
    dedupe: ["react", "react-dom"],
    preserveSymlinks: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client"],
  },
`

  const patched = content.replace(
    /defineConfig\s*\(\s*\{([\s\S]*?)\}\s*\)/,
    (_m, existing) => {
      const trimmed = existing.trimEnd()
      const sep = trimmed.endsWith(",") || trimmed === "" ? "" : ","
      return `defineConfig({${trimmed}${sep}${injection}})`
    },
  )

  if (patched === content) return false
  writeFileSync(filePath, patched)
  return true
}

export const InitCommand = new Command("init")
  .description("Initialize Chakra UI with Panda CSS in your project")
  .action(async () => {
    const cwd = process.cwd()
    const isNext = isNextJs(cwd)

    if (isNext) {
      p.log.info("Detected Next.js project")
    }

    // 1. Create panda.config.ts
    const configPath = resolve(cwd, "panda.config.ts")
    if (existsSync(configPath)) {
      p.log.warn("panda.config.ts already exists, skipping")
    } else {
      writeFileSync(configPath, PANDA_CONFIG)
      p.log.success("Created panda.config.ts")
    }

    // 2. Add tsconfig paths for styled-system override
    const tsconfigPath = resolve(cwd, "tsconfig.json")
    if (existsSync(tsconfigPath)) {
      try {
        const raw = readFileSync(tsconfigPath, "utf-8")
        const tsconfig = JSON.parse(raw)
        if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {}
        if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {}

        tsconfig.compilerOptions.paths["@chakra-ui/styled-system/*"] = [
          "./styled-system/*",
        ]

        writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + "\n")
        p.log.success("Added tsconfig paths for @chakra-ui/styled-system")
      } catch {
        p.log.warn("Could not update tsconfig.json — add paths manually")
      }
    } else {
      p.log.warn("No tsconfig.json found — create one and add paths manually")
    }

    // 3. Wire cascade layers + generated styles into CSS entry
    const cssTarget = isNext
      ? resolve(cwd, "src/app/globals.css")
      : resolve(cwd, "src/index.css")
    const entry = isNext ? NEXT_CSS_ENTRY : VITE_CSS_ENTRY
    const relPath = isNext ? "src/app/globals.css" : "src/index.css"

    const result = prependCssEntry(cssTarget, entry)
    if (result === "created") p.log.success(`Created ${relPath}`)
    else if (result === "updated")
      p.log.success(`Added @layer + styles.css import to ${relPath}`)
    else p.log.warn(`${relPath} already imports styled-system/styles.css`)

    // 4. Patch Vite config to dedupe React (linked/symlinked pkgs produce dupes)
    const viteConfigPath = findViteConfig(cwd)
    if (viteConfigPath) {
      if (patchViteConfig(viteConfigPath)) {
        p.log.success("Patched vite.config to dedupe React")
      }
    }

    // 5. Add styled-system to .gitignore
    const gitignorePath = resolve(cwd, ".gitignore")
    if (existsSync(gitignorePath)) {
      const content = readFileSync(gitignorePath, "utf-8")
      if (!content.includes("styled-system")) {
        writeFileSync(
          gitignorePath,
          content.trimEnd() + "\n\n# Panda CSS\nstyled-system\n",
        )
        p.log.success("Added styled-system to .gitignore")
      }
    }

    // 6. Run codegen (also emits styles.css via chakra codegen)
    p.log.step("Running codegen...")
    try {
      execSync("npx chakra codegen", { cwd, stdio: "inherit" })
    } catch {
      p.log.error("Codegen failed — run 'npx chakra codegen' manually")
    }

    p.outro("Chakra UI initialized! Run your dev server and start building.")
  })
