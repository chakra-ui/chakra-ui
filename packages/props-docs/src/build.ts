import "regenerator-runtime/runtime"
import glob from "glob"
import path from "path"
import { promisify } from "util"
import { writeFileSync } from "fs"
import * as docgen from "react-docgen-typescript"
import { ComponentDoc } from "react-docgen-typescript"
import mkdirp from "mkdirp"
import { propNames } from "@chakra-ui/styled-system"

type ComponentInfo = {
  def: ComponentDoc
  displayName: string
  fileName: string
  exportName: string
  importPath: string
}

const globAsync = promisify(glob)

const excludedPropNames = propNames.concat(["as", "apply", "sx", "__css"])

const basePath = path.join(__dirname, "../../..")
const componentsDir = path.join(__dirname, "..", "components")
const tsConfigPath = path.join(basePath, "..", "tsconfig.json")

export async function main() {
  const componentFiles = await findComponentFiles()

  if (componentFiles.length) {
    await mkdirp(componentsDir)
  }

  log("Parsing files for component types...")
  const parsedInfo = parseInfo(componentFiles)

  log("Extracting component info...")
  const componentInfo = extractComponentInfo(parsedInfo)

  log("Writing component info files...")
  writeComponentInfoFiles(componentInfo)

  log("Writing index files...")
  writeIndexCJS(componentInfo)
  writeIndexESM(componentInfo)

  log(`Processed ${componentInfo.length} components`)
}

if (require.main === module) {
  // run main function if called via cli
  main().catch(console.error)
}

/**
 * Find all TypeScript files which could contain component definitions
 */
async function findComponentFiles() {
  const tsFiles = await globAsync("core/**/src/**/*.@(ts|tsx)", {
    cwd: basePath,
  })

  return tsFiles.filter((f) => !f.includes("stories"))
}

/**
 * Parse files with react-doc-gen-typescript
 */
function parseInfo(filePaths: string[]) {
  const { parse } = docgen.withCustomConfig(tsConfigPath, {
    propFilter: (prop) => {
      const isStyledSystemProp = excludedPropNames.includes(prop.name)
      const isHTMLElementProp =
        prop.parent?.fileName.includes("node_modules") ?? false

      return !(isStyledSystemProp || isHTMLElementProp)
    },
  })

  return filePaths.flatMap((file) => {
    const absoluteFilePath = path.join(basePath, file)
    return parse(absoluteFilePath)
  })
}

/**
 * Extract meta data of component docs
 */
function extractComponentInfo(docs: ComponentDoc[]) {
  return docs.reduce((acc, def) => {
    if (!Object.keys(def.props || {}).length) {
      return acc
    }

    function createUniqueName(displayName: string) {
      const existing = acc.filter(
        (prev) =>
          String(prev.def.displayName).toLowerCase() ===
          displayName.toLowerCase(),
      )

      if (!existing.length) {
        return displayName
      }

      return `${displayName}${existing.length}`
    }

    const exportName = createUniqueName(def.displayName)
    const fileName = `${exportName}.json`

    acc.push({
      def,
      displayName: def.displayName,
      fileName,
      exportName,
      importPath: `../components/${fileName}`,
    })
    return acc
  }, [] as ComponentInfo[])
}

/**
 * Write component info as JSON to disk
 */
function writeComponentInfoFiles(componentInfo: ComponentInfo[]) {
  for (const info of componentInfo) {
    const filePath = path.join(componentsDir, info.fileName)
    const content = JSON.stringify(info.def)
    writeFileSync(filePath, content)
  }
}

/**
 * Create and write the index file in CJS format
 */
function writeIndexCJS(componentInfo: ComponentInfo[]) {
  const cjsIndexFilePath = path.join(__dirname, "index.js")
  const cjsExports = componentInfo.map(
    ({ displayName, importPath }) =>
      `module.exports['${displayName}'] = require('${importPath}')`,
  )
  writeFileSync(cjsIndexFilePath, cjsExports.join("\n"))
}

/**
 * Create and write the index file in ESM format
 */
function writeIndexESM(componentInfo: ComponentInfo[]) {
  const esmIndexFilePath = path.join(__dirname, "..", "esm", "index.js")

  const esmPropImports = componentInfo
    .map(
      ({ exportName, importPath }) =>
        `import ${exportName}Import from '${importPath}'`,
    )
    .join("\n")

  const esmPropExports = componentInfo
    .map(({ exportName }) => `export const ${exportName} = ${exportName}Import`)
    .join("\n")

  writeFileSync(
    esmIndexFilePath,
    `${esmPropImports}
${esmPropExports}`,
  )
}

function log(...args: unknown[]) {
  console.info(`[props-docs]`, ...args)
}
