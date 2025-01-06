import { globby } from "globby"
import { readFile, writeFile } from "node:fs/promises"
import { dirname, join, relative, resolve } from "node:path"
import { format } from "prettier"
import { cleanFiles } from "./shared"

async function main() {
  const clean = process.argv.includes("--clean")

  if (clean) {
    await cleanFiles()
  }

  const files = await globby("src/**/*.{ts,tsx}", { ignore: ["src/index.ts"] })
  const defFile = join("src", "def.ts")

  // eslint-disable-next-line import/extensions
  const configPath = resolve("../../.prettierrc")
  const prettierConfig = JSON.parse(await readFile(configPath, "utf8"))

  const promises = files.map(async (file) => {
    const content = await readFile(file, "utf8")

    let relativePath = relative(dirname(file), defFile)
    relativePath = relativePath === "def.ts" ? "./def.ts" : relativePath

    let updatedContent = content
      .replaceAll("@chakra-ui/react", relativePath.replace(".ts", ""))
      .replaceAll("chakra-", "")
      .replaceAll("switch:", "swittch:")

    updatedContent = await format(updatedContent, {
      parser: "typescript",
      ...prettierConfig,
    })

    return writeFile(file, updatedContent)
  })

  await Promise.all(promises)

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
