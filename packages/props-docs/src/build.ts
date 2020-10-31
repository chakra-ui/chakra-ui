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

  const indexArray: {
    displayName: string
    filePath: string
    exportName: string
  }[] = []

  function createUniqueName(displayName: string) {
    const existing = indexArray.filter(
      (prev) =>
        String(prev.displayName).toLowerCase() === displayName.toLowerCase(),
    )

    if (!existing.length) {
      return displayName
    }

    return `${displayName}${existing.length}`
  }

  console.info(`Start processing ${componentFiles.length} files`)
  componentFiles.forEach((file, index, all) => {
    const absoluteFilePath = path.join(basePath, file)
    const propsDefs = parse(absoluteFilePath)

    for (const def of propsDefs) {
      const exportName = createUniqueName(def.displayName)
      const fileName = `${exportName}.json`
      const filePath = path.join(componentsDir, fileName)
      if (!Object.keys(def.props || {}).length) {
        continue
      }

      const content = JSON.stringify(def)

      writeFileSync(filePath, content)

      indexArray.push({
        displayName: def.displayName,
        exportName,
        filePath: `../components/${fileName}`,
      })

      console.info(
        `${String(index + 1).padStart(String(all.length).length)}/${
          all.length
        } ${file} ${def.displayName}`,
      )
    }
  })

  const cjsIndexFilePath = path.join(__dirname, "index.js")
  const cjsExports = indexArray.map(
    ({ displayName, filePath }) =>
      `module.exports['${displayName}'] = require('${filePath}')`,
  )
  writeFileSync(cjsIndexFilePath, cjsExports.join("\n"))

  const esmIndexFilePath = path.join(__dirname, "..", "esm", "index.js")
  const esmPropImports = indexArray
    .map(
      ({ exportName, filePath }) =>
        `import ${exportName}Import from '${filePath}'`,
    )
    .join("\n")
  const esmPropExports = indexArray
    .map(({ exportName }) => `export const ${exportName} = ${exportName}Import`)
    .join("\n")

  writeFileSync(
    esmIndexFilePath,
    `${esmPropImports}
${esmPropExports}`,
  )

  console.info(`Processed ${componentFiles.length} files`)
}

if (require.main === module) {
  main().catch(console.error)
}
