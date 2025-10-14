import { defaultSystem } from "@chakra-ui/react/preset"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "fs/promises"
import { dirname, join } from "path"
import { kebabCase } from "scule"

const keys = <T extends Record<string, any>>(obj: T) =>
  Object.keys(obj) as (keyof T)[]

const compositionKeys = [
  "textStyles",
  "layerStyles",
  "animationStyles",
] as const

const outputDir = join("public", "r", "theme")
const outputFile = (paths: string[]) =>
  join(outputDir, ...paths.slice(0, -1), `${kebabCase(paths.at(-1)!)}.json`)

export async function main() {
  const themeSpec = defaultSystem.query
  const data = [
    {
      paths: ["index"],
      data: keys(themeSpec).map((key) => ({
        key,
        values:
          key === "tokens" || key === "semanticTokens"
            ? themeSpec[key].list("colors")
            : themeSpec[key].list(),
      })),
    },
    {
      paths: ["tokens"],
      data: themeSpec.tokens.categoryKeys,
    },
    {
      paths: ["semantic-tokens"],
      data: themeSpec.semanticTokens.categoryKeys,
    },
    ...themeSpec.tokens.categoryKeys.map((category) => {
      return {
        paths: ["tokens", category],
        data: themeSpec.tokens.list(category as any),
      }
    }),
    ...themeSpec.semanticTokens.categoryKeys.map((category) => {
      return {
        paths: ["semantic-tokens", category],
        data: themeSpec.semanticTokens.list(category as any),
      }
    }),
    ...compositionKeys.map((style) => {
      return {
        paths: [style],
        data: themeSpec[style].list(),
      }
    }),
  ]

  await Promise.all(
    data.map(({ paths, data }) => {
      const outFile = outputFile(paths)
      ensureDirSync(dirname(outFile))
      return writeFile(outFile, JSON.stringify(data, null, 2))
    }),
  )

  console.log(" 🎉 Theme generated successfully")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
