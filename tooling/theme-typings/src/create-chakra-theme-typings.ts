import "regenerator-runtime/runtime"
import * as path from "path"
import { program } from "commander"
import { register } from "ts-node"
import {
  createThemeTypingsInterface,
  ThemeKeyOptions,
} from "./create-theme-typings-interface"
import { isObject } from "@chakra-ui/utils"
import { writeFile } from "fs/promises"

const themeKeyConfiguration: ThemeKeyOptions[] = [
  { key: "borders" },
  { key: "breakpoints" },
  { key: "colors", maxScanDepth: 2 },
  { key: "fonts" },
  { key: "fontSizes" },
  { key: "fontWeights" },
  { key: "letterSpacings" },
  { key: "lineHeights" },
  { key: "radii" },
  { key: "shadows" },
  { key: "sizes", maxScanDepth: 2 },
  { key: "space" },
  { key: "textStyles" },
  { key: "transition" },
  { key: "zIndices" },
]

function readTheme(themeFilePath: string) {
  const absoluteThemePath = path.join(process.cwd(), themeFilePath)
  register({
    project: path.join(__dirname, "..", "bin", "tsconfig.json"),
    dir: path.basename(absoluteThemePath),
  })
  const module = require(absoluteThemePath)
  return module.default ?? module.theme
}

async function run() {
  program.requiredOption("-o, --out <path>", "output directory")
  program.on("--help", () => {
    console.info(`Example call:
  $ create-chakra-theme-typings theme.ts --out @types
`)
  })
  program.parse(process.argv)

  const {
    out,
    args: [themeFile],
  } = program

  console.info(`👀 Reading theme file "${themeFile}"...`)
  const theme = readTheme(themeFile)

  if (!isObject(theme)) {
    console.error("❌ Theme not found in default or named `theme` export")
    process.exit(1)
  }

  console.info(`💭 Creating theme interface...`)
  const template = await createThemeTypingsInterface(theme, {
    themeKeys: themeKeyConfiguration,
  })

  const outPath = path.join(process.cwd(), out, "chakra-ui__styled-system.d.ts")
  console.info(`✍️  Write file "${outPath}"...`)
  await writeFile(outPath, template, "utf8")
  console.info(`✅ done`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
