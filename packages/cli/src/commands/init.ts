import * as p from "@clack/prompts"
import { Command } from "commander"
import { execSync } from "node:child_process"
import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs"
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
  jsxFactory: "chakra",
  importMap: "@chakra-ui/styled-system",
  outdir: "styled-system",
})
`

const POSTCSS_CONFIG = `module.exports = {
  plugins: {
    "@pandacss/dev/postcss": {},
  },
}
`

const CSS_LAYER = `@layer reset, base, tokens, recipes, utilities;\n`

function isNextJs(cwd: string): boolean {
  const candidates = ["next.config.js", "next.config.mjs", "next.config.ts"]
  return candidates.some((f) => existsSync(resolve(cwd, f)))
}

function findViteConfig(cwd: string): string | null {
  const candidates = ["vite.config.ts", "vite.config.js", "vite.config.mjs"]
  const found = candidates.find((f) => existsSync(resolve(cwd, f)))
  return found ? resolve(cwd, found) : null
}

function prependLayer(filePath: string) {
  if (!existsSync(filePath)) return false
  const content = readFileSync(filePath, "utf-8")
  if (content.includes("@layer")) return false
  writeFileSync(filePath, CSS_LAYER + "\n" + content)
  return true
}

function patchViteConfig(filePath: string) {
  const content = readFileSync(filePath, "utf-8")

  // Already patched
  if (content.includes("dedupe") && content.includes("react")) return false

  // Need to inject resolve.dedupe + optimizeDeps.include inside defineConfig({...})
  // Conservative regex: find defineConfig({ ... }) and splice in before the closing brace
  const match = content.match(/defineConfig\s*\(\s*\{([\s\S]*)\}\s*\)/)
  if (!match) return false

  const inner = match[1]
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

    // 2. PostCSS config — replace existing if needed
    const postcssTargets = [
      "postcss.config.mjs",
      "postcss.config.js",
      "postcss.config.cjs",
    ]

    const existingPostcss = postcssTargets.find((f) =>
      existsSync(resolve(cwd, f)),
    )

    if (existingPostcss) {
      const existingPath = resolve(cwd, existingPostcss)
      const content = readFileSync(existingPath, "utf-8")

      if (content.includes("@pandacss")) {
        p.log.warn(`${existingPostcss} already configured for Panda, skipping`)
      } else {
        // Replace with Panda postcss config
        unlinkSync(existingPath)
        writeFileSync(resolve(cwd, "postcss.config.cjs"), POSTCSS_CONFIG)
        p.log.success(
          `Replaced ${existingPostcss} with Panda CSS postcss config`,
        )
      }
    } else {
      writeFileSync(resolve(cwd, "postcss.config.cjs"), POSTCSS_CONFIG)
      p.log.success("Created postcss.config.cjs")
    }

    // 3. Add tsconfig paths for styled-system override
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

    // 4. Add @layer declaration to CSS entry point
    if (isNext) {
      // Next.js: prepend to src/app/globals.css
      const globalsPath = resolve(cwd, "src/app/globals.css")
      if (prependLayer(globalsPath)) {
        p.log.success("Added @layer declaration to src/app/globals.css")
      } else if (existsSync(globalsPath)) {
        p.log.warn("src/app/globals.css already has @layer declaration")
      } else {
        // Fallback: create src/app/globals.css
        writeFileSync(globalsPath, CSS_LAYER)
        p.log.success("Created src/app/globals.css with @layer declaration")
      }
    } else {
      // Vite / other: prepend to src/index.css
      const cssPath = resolve(cwd, "src/index.css")
      if (existsSync(cssPath)) {
        if (prependLayer(cssPath)) {
          p.log.success("Added @layer declaration to src/index.css")
        }
      } else if (existsSync(resolve(cwd, "src"))) {
        writeFileSync(cssPath, CSS_LAYER)
        p.log.success("Created src/index.css")
      }
    }

    // 5. Patch Vite config to dedupe React (needed for linked/symlinked packages)
    const viteConfigPath = findViteConfig(cwd)
    if (viteConfigPath) {
      if (patchViteConfig(viteConfigPath)) {
        p.log.success("Patched vite.config to dedupe React")
      }
    }

    // 6. Add styled-system to .gitignore
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

    // 6. Run codegen (uses chakra codegen which patches styled-system)
    p.log.step("Running codegen...")
    try {
      execSync("npx chakra codegen", { cwd, stdio: "inherit" })
    } catch {
      p.log.error("Codegen failed — run 'npx chakra codegen' manually")
    }

    p.outro("Chakra UI initialized! Import your CSS and start building.")
  })
