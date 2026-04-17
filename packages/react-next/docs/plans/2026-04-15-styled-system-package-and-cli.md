# Separate styled-system Package + CLI Commands

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract `styled-system/` into its own `@chakra-ui/styled-system`
package, update react-next components to import from it, and add `init` +
`codegen` commands to the existing `@chakra-ui/cli`.

**Architecture:** `@chakra-ui/styled-system` is a workspace package containing
default Panda codegen output (runtime JS, no CSS). `react-next` components
import from `@chakra-ui/styled-system/*`. The CLI's `init` command scaffolds a
user project with `panda.config.ts` + tsconfig paths
(`@chakra-ui/styled-system/*` → `./styled-system/*`) so local codegen overrides
the npm package. `codegen` wraps `panda codegen` + post-codegen fixes.

**Tech Stack:** Panda CSS, commander (existing CLI), TypeScript

---

## Task 1: Create `@chakra-ui/styled-system` workspace package

**Files:**

- Create: `packages/styled-system-next/package.json`
- Modify: `packages/react-next/panda.config.ts` (change `outdir` to
  `../styled-system-next`, `importMap` to `@chakra-ui/styled-system`)

The styled-system package is the Panda codegen output directory wrapped as a
proper workspace package. We generate it by running `panda codegen` with
`outdir` pointing to this package, then `panda emit-pkg` to set up exports.

- [ ] **Step 1: Create the package directory and package.json**

Create `packages/styled-system-next/package.json`:

```json
{
  "name": "@chakra-ui/styled-system",
  "version": "0.0.0",
  "description": "Chakra UI styled-system runtime — Panda CSS codegen output",
  "type": "module",
  "sideEffects": false,
  "publishConfig": {
    "access": "public"
  },
  "author": "Segun Adebayo <sage@adebayosegun.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/chakra-ui/chakra-ui",
    "directory": "packages/styled-system-next"
  },
  "peerDependencies": {
    "react": ">=18"
  }
}
```

- [ ] **Step 2: Update react-next panda.config.ts**

Change `outdir` and `importMap`:

```ts
import chakraPreset from "@chakra-ui/panda-preset"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: [
    "./src/**/*.{ts,tsx}",
    "./__stories__/**/*.{ts,tsx}",
    "../../apps/compositions-next/src/**/*.{ts,tsx}",
  ],
  presets: [chakraPreset],
  jsxFramework: "react",
  jsxStyleProps: "all",
  staticCss: { recipes: "*" },
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            "50": { value: "#eff0ff" },
            "100": { value: "#d9dbff" },
            "200": { value: "#b3b7ff" },
            "300": { value: "#8d93ff" },
            "400": { value: "#676fff" },
            "500": { value: "#414bff" },
            "600": { value: "#3038cc" },
            "700": { value: "#202599" },
            "800": { value: "#101266" },
            "900": { value: "#080933" },
            "950": { value: "#04041a" },
          },
        },
      },
      semanticTokens: {
        colors: {
          "brand.solid": {
            value: {
              _light: "{colors.brand.500}",
              _dark: "{colors.brand.200}",
            },
          },
          "brand.contrast": {
            value: { _light: "{colors.white}", _dark: "{colors.brand.900}" },
          },
          "brand.muted": {
            value: { _light: "{colors.brand.50}", _dark: "{colors.brand.950}" },
          },
        },
      },
    },
  },
  outdir: "../styled-system-next",
  importMap: "@chakra-ui/styled-system",
  jsxFactory: "chakra",
})
```

- [ ] **Step 3: Run codegen to populate the styled-system-next package**

```bash
cd packages/react-next && pnpm codegen
```

This generates all files into `packages/styled-system-next/`.

- [ ] **Step 4: Run `panda emit-pkg` to set up proper exports**

```bash
cd packages/react-next && npx panda emit-pkg --outdir ../styled-system-next
```

This adds the `exports` map to `packages/styled-system-next/package.json` so
imports like `@chakra-ui/styled-system/css`, `@chakra-ui/styled-system/jsx`,
etc. resolve correctly.

- [ ] **Step 5: Run the post-codegen script (adjusted for new path)**

Update `scripts/post-codegen.mjs` to target `../styled-system-next` instead of
`styled-system/`:

Change the `JSX_DIR` constant:

```js
const JSX_DIR = resolve(root, "../styled-system-next/jsx")
```

Then run it:

```bash
node scripts/post-codegen.mjs
```

- [ ] **Step 6: Verify the package structure**

```bash
ls packages/styled-system-next/
```

Expected: `css/`, `jsx/`, `recipes/`, `patterns/`, `tokens/`, `types/`,
`helpers.mjs`, `styles.css`, `package.json` (with exports)

- [ ] **Step 7: Add to pnpm workspace**

Check `pnpm-workspace.yaml` — it likely already has `packages/*` which covers
`packages/styled-system-next`. Verify:

```bash
pnpm ls --filter @chakra-ui/styled-system
```

- [ ] **Step 8: Commit**

```bash
git add packages/styled-system-next/ packages/react-next/panda.config.ts packages/react-next/scripts/post-codegen.mjs
git commit -m "feat(v4): create @chakra-ui/styled-system package from codegen output"
```

---

## Task 2: Update react-next to import from `@chakra-ui/styled-system`

**Files:**

- Modify: `packages/react-next/src/components/accordion/accordion.tsx`
- Modify: `packages/react-next/src/components/badge/badge.tsx`
- Modify: `packages/react-next/src/components/carousel/carousel.tsx`
- Modify: `packages/react-next/src/components/dialog/dialog.tsx`
- Modify: `packages/react-next/src/components/index.ts`
- Modify: `packages/react-next/src/temp/create-recipe-context.mjs`
- Modify: `packages/react-next/src/temp/create-slot-recipe-context.mjs`
- Modify: `packages/react-next/package.json`

- [ ] **Step 1: Update all component imports**

Every component currently imports from `"../../../styled-system/jsx"` and
`"../../../styled-system/recipes"`. Change all to
`"@chakra-ui/styled-system/jsx"` and `"@chakra-ui/styled-system/recipes"`.

**accordion.tsx:**

```tsx
import { chakra, createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { accordion } from "@chakra-ui/styled-system/recipes"
```

**badge.tsx:**

```tsx
import {
  type HTMLChakraProps,
  createRecipeContext,
} from "@chakra-ui/styled-system/jsx"
import { type BadgeVariantProps, badge } from "@chakra-ui/styled-system/recipes"
```

**carousel.tsx:**

```tsx
import { chakra, createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { carousel } from "@chakra-ui/styled-system/recipes"
```

**dialog.tsx:**

```tsx
import { chakra, createSlotRecipeContext } from "@chakra-ui/styled-system/jsx"
import { dialog } from "@chakra-ui/styled-system/recipes"
```

- [ ] **Step 2: Update components/index.ts**

Change the styled-system re-export:

```ts
export * from "./accordion"
export * from "./badge"
export * from "./carousel"
export * from "./dialog"
export * from "@chakra-ui/styled-system/jsx"
```

- [ ] **Step 3: Update src/temp/ files**

In `create-recipe-context.mjs` and `create-slot-recipe-context.mjs`, the imports
reference `./factory.mjs` (relative to styled-system/jsx/). These files get
COPIED into the styled-system package by post-codegen, so they should keep their
relative imports. No change needed here — they run inside the styled-system
package, not react-next.

- [ ] **Step 4: Update package.json**

Add `@chakra-ui/styled-system` as a dependency. Remove the `styled-system/*`
entries from `files` and `exports`:

In `dependencies`, add:

```json
"@chakra-ui/styled-system": "workspace:*"
```

Update `files` to just:

```json
"files": ["dist"]
```

Remove from `exports`:

```json
"./styled-system": "...",
"./styled-system/*": "..."
```

Keep:

```json
"exports": {
  ".": { ... },
  "./*": { ... },
  "./package.json": "./package.json"
}
```

- [ ] **Step 5: Build and verify**

```bash
cd packages/react-next && pnpm build
```

The build should pass because `@chakra-ui/styled-system` is now a workspace
dependency and Rollup marks dependencies as external.

Check the output:

```bash
head -5 dist/esm/components/accordion/accordion.js
```

Expected: imports from `@chakra-ui/styled-system/jsx` and
`@chakra-ui/styled-system/recipes`.

- [ ] **Step 6: Commit**

```bash
git add packages/react-next/
git commit -m "refactor(react-next): import from @chakra-ui/styled-system instead of relative paths"
```

---

## Task 3: Add `init` and `codegen` commands to the CLI

**Files:**

- Create: `packages/cli/src/commands/init.ts`
- Create: `packages/cli/src/commands/codegen.ts`
- Modify: `packages/cli/src/index.ts`
- Modify: `packages/cli/package.json` (add @pandacss/dev dependency if needed)

- [ ] **Step 1: Create the `init` command**

Create `packages/cli/src/commands/init.ts`:

```ts
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

    // 4. Create CSS entry point
    const cssPath = resolve(cwd, "src/index.css")
    if (!existsSync(cssPath)) {
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
```

- [ ] **Step 2: Create the `codegen` command**

Create `packages/cli/src/commands/codegen.ts`:

```ts
import * as p from "@clack/prompts"
import { Command } from "commander"
import { execSync } from "node:child_process"

export const CodegenCommand = new Command("codegen")
  .description("Generate Panda CSS styled-system output")
  .option("--clean", "Clean output directory before generating")
  .option("--watch", "Watch for changes and regenerate")
  .action(async (opts) => {
    const cwd = process.cwd()
    const flags = [opts.clean && "--clean", opts.watch && "--watch"]
      .filter(Boolean)
      .join(" ")

    const cmd = `npx panda codegen ${flags}`.trim()

    p.log.step(`Running: ${cmd}`)
    try {
      execSync(cmd, { cwd, stdio: "inherit" })
      p.log.success("Codegen complete")
    } catch {
      p.log.error("Codegen failed")
      process.exit(1)
    }
  })
```

- [ ] **Step 3: Register both commands in the CLI entry point**

In `packages/cli/src/index.ts`, add:

```ts
import { CodegenCommand } from "./commands/codegen.js"
import { InitCommand } from "./commands/init.js"
```

And register them:

```ts
program
  .addCommand(TypegenCommand)
  .addCommand(SnippetCommand)
  .addCommand(BlocksCommand)
  .addCommand(EjectCommand)
  .addCommand(InitCommand)
  .addCommand(CodegenCommand)
```

- [ ] **Step 4: Build the CLI**

```bash
cd packages/cli && pnpm build
```

- [ ] **Step 5: Test locally**

```bash
cd /tmp && mkdir test-chakra && cd test-chakra
npm init -y
npx tsx /path/to/packages/cli/src/index.ts init
```

Verify: `panda.config.ts`, `postcss.config.cjs`, `src/index.css` created,
tsconfig updated.

- [ ] **Step 6: Commit**

```bash
git add packages/cli/
git commit -m "feat(cli): add init and codegen commands for v4 Panda CSS setup"
```

---

## Task 4: End-to-end test with a real React project

**Files:**

- Create: `sandbox/vite-panda/` (temporary test project)

- [ ] **Step 1: Scaffold a Vite React project**

```bash
cd /Users/lope/Desktop/open-source/chakra/chakra-ui
npm create vite@latest sandbox/vite-panda -- --template react-ts
cd sandbox/vite-panda
pnpm install
```

- [ ] **Step 2: Install the local packages**

```bash
pnpm add @chakra-ui/react-next@workspace:* @chakra-ui/styled-system@workspace:* @chakra-ui/panda-preset@workspace:* @pandacss/dev @pandacss/postcss
```

- [ ] **Step 3: Run chakra init**

```bash
npx tsx ../../packages/cli/src/index.ts init
```

Verify the files were created.

- [ ] **Step 4: Write a test page using Chakra components**

Replace `src/App.tsx`:

```tsx
import { Accordion, Badge, chakra } from "@chakra-ui/react-next"
import "./index.css"

function App() {
  return (
    <chakra.div p="8" maxW="600px" mx="auto">
      <chakra.h1 fontSize="2xl" fontWeight="bold" mb="4">
        Chakra UI v4 Test
      </chakra.h1>

      <Badge variant="solid" mb="4">
        Experimental
      </Badge>

      <Accordion.Root>
        <Accordion.Item value="one">
          <Accordion.ItemTrigger>Section One</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <chakra.p p="4">Content for section one</chakra.p>
          </Accordion.ItemContent>
        </Accordion.Item>
        <Accordion.Item value="two">
          <Accordion.ItemTrigger>Section Two</Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <chakra.p p="4">Content for section two</chakra.p>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </chakra.div>
  )
}

export default App
```

- [ ] **Step 5: Start the dev server and verify**

```bash
pnpm dev
```

Open the browser. Verify:

- Components render
- Styles are applied (accordion expands/collapses, badge has colors)
- No console errors

- [ ] **Step 6: Test customization**

Edit `panda.config.ts` to add a custom token:

```ts
theme: {
  extend: {
    tokens: {
      colors: {
        brand: { 500: { value: "#6366f1" } }
      }
    }
  }
}
```

Run `npx chakra codegen`, restart dev server, verify the token is available.

- [ ] **Step 7: Commit the sandbox (or clean up)**

If keeping:

```bash
git add sandbox/vite-panda/
git commit -m "test(v4): add Vite sandbox to verify end-to-end flow"
```

---

## Summary

| Package                    | Ships                                       | Purpose                                        |
| -------------------------- | ------------------------------------------- | ---------------------------------------------- |
| `@chakra-ui/panda-preset`  | tokens, recipes, slot-recipes               | Design system config                           |
| `@chakra-ui/styled-system` | Panda runtime JS (css, jsx, recipes, types) | Shared runtime, overridable via tsconfig paths |
| `@chakra-ui/react-next`    | Pre-built components (dist/)                | Accordion, Badge, Carousel, Dialog             |
| `@chakra-ui/cli`           | CLI binary                                  | `chakra init` + `chakra codegen`               |

**User flow:**

```bash
npm install @chakra-ui/react-next @pandacss/dev
npx chakra init          # creates config, tsconfig paths, runs codegen
# → use components, customize via theme.extend, run codegen again
```
