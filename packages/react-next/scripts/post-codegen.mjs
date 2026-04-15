/**
 * Post-codegen script for @chakra-ui/react-next
 *
 * Runs after `panda codegen` to patch the generated styled-system output:
 *
 * 1. Copies manually-written createRecipeContext / createSlotRecipeContext
 *    files (mjs + d.ts) into styled-system/jsx/
 *
 * 2. Ensures styled-system/jsx/index.mjs and index.d.ts re-export them
 *
 * Usage: node scripts/post-codegen.mjs
 */

import { copyFileSync, readFileSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

const TEMP_DIR = resolve(root, "src/temp")
const JSX_DIR = resolve(root, "../styled-system-next/jsx")

// --- Step 1: Copy manual files into styled-system/jsx/ ---

const filesToCopy = [
  "create-recipe-context.mjs",
  "create-recipe-context.d.ts",
  "create-slot-recipe-context.mjs",
  "create-slot-recipe-context.d.ts",
]

for (const file of filesToCopy) {
  const src = resolve(TEMP_DIR, file)
  const dest = resolve(JSX_DIR, file)
  copyFileSync(src, dest)
  console.log(`  copied ${file} → styled-system/jsx/`)
}

// --- Step 2: Ensure index.mjs has the re-exports ---

const reExportsMjs = [
  'export * from "./create-recipe-context.mjs";',
  'export * from "./create-slot-recipe-context.mjs";',
]

const indexMjsPath = resolve(JSX_DIR, "index.mjs")
let indexMjs = readFileSync(indexMjsPath, "utf-8")

for (const line of reExportsMjs) {
  if (!indexMjs.includes(line)) {
    indexMjs = indexMjs.trimEnd() + "\n" + line + "\n"
    console.log(`  added re-export to index.mjs: ${line}`)
  }
}

writeFileSync(indexMjsPath, indexMjs)

// --- Step 3: Ensure index.d.ts has the re-exports ---

const reExportsDts = [
  'export * from "./create-recipe-context";',
  'export * from "./create-slot-recipe-context";',
]

const indexDtsPath = resolve(JSX_DIR, "index.d.ts")
let indexDts = readFileSync(indexDtsPath, "utf-8")

for (const line of reExportsDts) {
  if (!indexDts.includes(line)) {
    indexDts = indexDts.trimEnd() + "\n" + line + "\n"
    console.log(`  added re-export to index.d.ts: ${line}`)
  }
}

writeFileSync(indexDtsPath, indexDts)

console.log("post-codegen done ✓")
