import "regenerator-runtime/runtime"
import * as docgen from "react-docgen-typescript"
import glob from "glob"
import path from "path"
import { promisify } from "util"
import { propNames } from "@chakra-ui/styled-system"
import { writeFileSync } from "fs"
import mkdirp from "mkdirp"

const globAsync = promisify(glob)

const excludedPropNames = propNames.concat(["as", "apply", "sx", "__css"])

const basePath = path.join(__dirname, "../../..")
const componentsDir = path.join(__dirname, "..", "components")
const tsConfigPath = path.join(basePath, "..", "tsconfig.json")

const { parse } = docgen.withCustomConfig(tsConfigPath, {
  propFilter: (prop) => {
    const isStyledSystemProp = excludedPropNames.includes(prop.name)
    const isHTMLElementProp =
      prop.parent?.fileName.includes("node_modules") ?? false

    return !(isStyledSystemProp || isHTMLElementProp)
  },
})

export async function main() {
  const tsFiles = await globAsync("core/**/src/**/*.@(ts|tsx)", {
    cwd: basePath,
  })

  const componentFiles = tsFiles.filter(
    (f) => !f.includes("stories") && !f.startsWith("icons/"),
  )

  if (componentFiles.length) {
    await mkdirp(componentsDir)
  }

  const indexArray: { displayName: string; filePath: string }[] = []

  console.info(`Start processing ${componentFiles.length} files`)
  const promises = componentFiles.map(async (file, index, all) => {
    const absoluteFilePath = path.join(basePath, file)
    const propsDefs = parse(absoluteFilePath)

    const writePromises = propsDefs.map(async (def) => {
      const displayName = def.displayName
      const fileName = `${displayName}.json`
      const filePath = path.join(componentsDir, fileName)
      const content = JSON.stringify(def)
      // async write causes empty files ¯\_(ツ)_/¯
      writeFileSync(filePath, content)
      indexArray.push({ displayName, filePath: `../components/${fileName}` })
      console.info(
        `${String(index + 1).padStart(String(all.length).length)}/${
          all.length
        } ${file} ${fileName}`,
      )
    })

    return Promise.all(writePromises)
  })

  await Promise.all(promises)

  writeFileSync(
    path.join(__dirname, "index.js"),
    indexArray
      .map(
        ({ displayName, filePath }) =>
          `module.exports['${displayName}'] = require('${filePath}')`,
      )
      .join("\n"),
  )

  writeFileSync(
    path.join(__dirname, "..", "esm", "index.js"),
    indexArray
      .map(
        ({ displayName, filePath }) =>
          `export * as ${displayName} from '${filePath}'`,
      )
      .join("\n"),
  )
  console.info(`Processed ${componentFiles.length} files`)
}

if (require.main === module) {
  main().catch(console.error)
}
