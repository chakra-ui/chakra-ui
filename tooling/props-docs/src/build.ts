import { findUpSync } from "find-up"
import { ensureFileSync, readFile, writeFile } from "fs-extra"
import glob from "glob"
import { basename, dirname, join } from "path"

type ComponentInfo = {
  componentName: string
  fileName: string
  distJsonName: string
  distJsonPath: string
  content: string
}

function startCase(string: string) {
  const toStartCase = (s: string) => s.charAt(0).toUpperCase() + s.substring(1)
  return string
    .split(/\W/g)
    .reduce((str, x) => `${str.trim()}${toStartCase(x)}`, "")
    .trim()
}

const outputPath = join(process.cwd(), "dist", "components")
const basePath = "dist"

const paths = {
  cjs: join(basePath, "index.js"),
  mjs: join(basePath, "index.mjs"),
  dts: join(basePath, "index.d.ts"),
}

async function writeJsonFiles(componentInfo: ComponentInfo[]) {
  return Promise.all(
    componentInfo.map(({ content, distJsonPath }) => {
      ensureFileSync(distJsonPath)
      return writeFile(distJsonPath, content)
    }),
  )
}

async function writeIndexMJS(componentInfo: ComponentInfo[]) {
  const esmPropImports = componentInfo
    .map(
      ({ componentName, distJsonName }) =>
        `import ${componentName}Json from './${distJsonName}'`,
    )
    .join("\n")

  const esmPropExports = componentInfo
    .map(
      ({ componentName }) =>
        `export const ${componentName} = ${componentName}Json`,
    )
    .join("\n")

  return writeFile(paths.mjs, `${esmPropImports}\n${esmPropExports}`)
}

async function writeIndexCJS(componentInfo: ComponentInfo[]) {
  const cjsExports = componentInfo.map(
    ({ componentName, distJsonName }) =>
      `module.exports['${componentName}'] = require('./${distJsonName}')`,
  )
  return writeFile(paths.cjs, cjsExports.join("\n"))
}

async function writeIndexDTS(componentInfo: ComponentInfo[]) {
  const typeExports = componentInfo
    .map(
      ({ componentName }) => `export declare const ${componentName}: PropDoc`,
    )
    .join("\n")

  const baseType = `

  export type Prop = {
    type: string
    defaultValue?: string | null
    required: boolean
    description?: string
  }
  
  export type PropDoc = {
    [componentOrHook: string]: Prop
  }
  `

  return writeFile(paths.dts, `${baseType}\n${typeExports}`)
}

export async function main() {
  const lockFile = findUpSync("pnpm-lock.yaml")

  const componentFiles = glob.sync("packages/!(node_modules)/*/docs.json", {
    cwd: lockFile ? dirname(lockFile) : undefined,
    absolute: true,
  })

  const componentInfo = await Promise.all(
    componentFiles.map(async (file) => {
      const fileContent = await readFile(file, "utf8")
      const baseName = basename(dirname(file))
      const componentName = startCase(baseName)
      const fileName = join(baseName, `${componentName}.json`)
      return {
        componentName,
        fileName,
        distJsonName: join("components", `${componentName}.json`),
        distJsonPath: join(outputPath, `${componentName}.json`),
        content: fileContent,
      }
    }),
  )

  await Promise.all([
    writeJsonFiles(componentInfo),
    writeIndexMJS(componentInfo),
    writeIndexCJS(componentInfo),
    writeIndexDTS(componentInfo),
  ])

  console.log("Props extracted for all components 🎉")
}

main()
