import { globby } from "globby"
import { readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join, normalize, relative, resolve } from "node:path"
import { format } from "prettier"
import { cleanFiles } from "./shared"

/** Bare CSS keyword `black` in shadow strings → `{colors.black}` (not `colors.black`, not `{black/…}`). */
const RE_SHADOW_BARE_BLACK = /(?<![.{])black\b/g

const RE_RECIPES_CONTAINER_IMPORT =
  /^\s*import\s*\{\s*containerRecipe\s*\}\s*from\s*["']\.\/container["']\s*\r?\n/m

const RE_RECIPES_CONTAINER_ENTRY = /^\s*container:\s*containerRecipe,\s*\r?\n/m

/**
 * Chakra → Panda adjustments: shadow token refs, and drop the `container`
 * recipe (Panda already provides a `container` pattern).
 */
function applyPandaThemeMappings(
  content: string,
  relativeFile: string,
): string {
  let out = content.replaceAll("{black/", "{colors.black/")

  // Scoped to shadows file so comments elsewhere stay untouched.
  if (
    normalize(relativeFile) === normalize(join("semantic-tokens", "shadows.ts"))
  ) {
    out = out.replace(RE_SHADOW_BARE_BLACK, "{colors.black}")
  }

  if (normalize(relativeFile) === normalize(join("recipes", "index.ts"))) {
    out = out
      .replace(RE_RECIPES_CONTAINER_IMPORT, "")
      .replace(RE_RECIPES_CONTAINER_ENTRY, "")
  }

  return out
}

async function main() {
  const clean = process.argv.includes("--clean")

  if (clean) {
    await cleanFiles()
  }

  const files = await globby("src/**/*.{ts,tsx}", {
    ignore: ["src/index.ts", "src/recipes/container.ts"],
  })
  const defFile = join("src", "def.ts")

  const configPath = resolve("../../.prettierrc")
  const prettierConfig = JSON.parse(await readFile(configPath, "utf8"))

  const promises = files.map(async (file) => {
    const content = await readFile(file, "utf8")

    let relativePath = relative(dirname(file), defFile)
    relativePath = relativePath === "def.ts" ? "./def.ts" : relativePath

    const fileFromSrc = relative("src", file)

    let updatedContent = content
      .replaceAll("@chakra-ui/react", relativePath.replace(".ts", ""))
      .replaceAll("chakra-", "")
      .replaceAll("switch:", "swittch:")
    updatedContent = applyPandaThemeMappings(updatedContent, fileFromSrc)

    updatedContent = await format(updatedContent, {
      parser: "typescript",
      ...prettierConfig,
    })

    return writeFile(file, updatedContent)
  })

  await Promise.all(promises)

  await rm(join("src", "recipes", "container.ts"), { force: true })

  // Update src/index.ts to match exports
  const indexContent = `import { animationStyles } from "./animation-styles"
import { breakpoints } from "./breakpoints"
import { definePreset } from "./def"
import { globalCss } from "./global-css"
import { keyframes } from "./keyframes"
import { layerStyles } from "./layer-styles"
import { recipes } from "./recipes"
import { semanticTokens } from "./semantic-tokens"
import { slotRecipes } from "./slot-recipes"
import { textStyles } from "./text-styles"
import { tokens } from "./tokens"
import { utilities } from "./utilities"

export default definePreset({
  name: "@chakra-ui/panda-preset",
  globalCss,
  theme: {
    breakpoints,
    keyframes,
    tokens,
    semanticTokens,
    recipes,
    slotRecipes,
    textStyles,
    layerStyles,
    animationStyles,
  },
  utilities: {
    extend: utilities,
  },
  conditions: {
    extend: {
      icon: "& :where(svg)",
    },
  },
})`

  await writeFile("src/index.ts", indexContent)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
