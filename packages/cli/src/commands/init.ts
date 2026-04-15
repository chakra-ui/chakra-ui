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
  jsxFactory: "chakra",
  importMap: "@chakra-ui/styled-system",
  outdir: "styled-system",
})
`

const POSTCSS_CONFIG = `module.exports = {
  plugins: {
    "@pandacss/postcss": {},
  },
}
`

const CSS_ENTRY = `@layer reset, base, tokens, recipes, utilities;
`

export const InitCommand = new Command("init")
  .description("Initialize Chakra UI with Panda CSS in your project")
  .action(async () => {
    const cwd = process.cwd()

    // 1. Create panda.config.ts
    const configPath = resolve(cwd, "panda.config.ts")
    if (existsSync(configPath)) {
      p.log.warn("panda.config.ts already exists, skipping")
    } else {
      writeFileSync(configPath, PANDA_CONFIG)
      p.log.success("Created panda.config.ts")
    }

    // 2. Create postcss.config.cjs
    const postcssPath = resolve(cwd, "postcss.config.cjs")
    if (existsSync(postcssPath)) {
      p.log.warn("postcss.config.cjs already exists, skipping")
    } else {
      writeFileSync(postcssPath, POSTCSS_CONFIG)
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

    // 4. Create CSS entry point if src/ exists
    const srcDir = resolve(cwd, "src")
    const cssPath = resolve(srcDir, "index.css")
    if (existsSync(srcDir) && !existsSync(cssPath)) {
      writeFileSync(cssPath, CSS_ENTRY)
      p.log.success("Created src/index.css")
    }

    // 5. Run codegen
    p.log.step("Running codegen...")
    try {
      execSync("npx panda codegen", { cwd, stdio: "inherit" })
      p.log.success("Codegen complete")
    } catch {
      p.log.error("Codegen failed — run 'npx chakra codegen' manually")
    }

    p.outro("Chakra UI initialized! Import your CSS and start building.")
  })
