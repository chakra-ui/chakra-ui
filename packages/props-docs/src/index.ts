import { globSync } from "glob"
import { existsSync, mkdirSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { outdent } from "outdent"

interface ComponentInfo {
  componentName: string
  fileName: string
  distJsonName: string
  distJsonPath: string
  content: string
}

const toStartCase = (s: string) => s.charAt(0).toUpperCase() + s.substring(1)

const startCase = (s: string) =>
  s
    .split(/\W/g)
    .reduce((str, x) => `${str.trim()}${toStartCase(x)}`, "")
    .trim()

const ensureFileSync = (path: string) => {
  const dir = dirname(path)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

const paths = {
  cjs: join("dist", "index.js"),
  mjs: join("dist", "index.mjs"),
  dts: join("dist", "index.d.ts"),
}

async function writeJsonFiles(info: ComponentInfo[]) {
  return Promise.all(
    info.map(({ content, distJsonPath }) => {
      ensureFileSync(distJsonPath)
      return writeFile(distJsonPath, content)
    }),
  )
}

async function writeIndexMJS(info: ComponentInfo[]) {
  const allComponents = info.map((v) => `${v.componentName}`).join(",\n")

  const esmPropImports = info
    .map(
      ({ componentName, distJsonName }) =>
        `import ${componentName}Json from './${distJsonName}'`,
    )
    .join("\n")

  const esmPropExports = info
    .map(
      ({ componentName }) =>
        `export const ${componentName} = ${componentName}Json`,
    )
    .concat(
      outdent`

    const json = {
    ${allComponents}
    }

    export const allPropDocs = Object.fromEntries(
      Object.values(json).flatMap((doc) => Object.entries(doc)),
    )

    export const getPropDoc = (name) => allPropDocs[name]
    `,
    )
    .join("\n")

  ensureFileSync(paths.mjs)
  return writeFile(paths.mjs, `${esmPropImports}\n\n${esmPropExports}`)
}

async function writeIndexCJS(info: ComponentInfo[]) {
  const allComponents = info.map((v) => `${v.componentName}`).join(",\n")

  const cjsExports = info.map(
    ({ componentName, distJsonName }) =>
      `const ${componentName} = require('./${distJsonName}')`,
  ).concat(outdent`

      const json = {
        ${allComponents}
      }

      const allPropDocs = Object.fromEntries(
        Object.values(json).flatMap((doc) => Object.entries(doc)),
      )

      const getPropDoc = (name) => allPropDocs[name]

      module.exports = {
        allPropDocs,
        getPropDoc,
        ${allComponents}
      }
  `)

  ensureFileSync(paths.mjs)
  return writeFile(paths.cjs, cjsExports.join("\n"))
}

async function writeIndexDTS(info: ComponentInfo[]) {
  const typeExports = info
    .map(
      ({ componentName }) =>
        outdent`export declare const ${componentName}: PropDoc`,
    )
    .join("\n")

  const baseType = outdent`
    export interface Prop {
      type: string
      defaultValue?: string | null
      required: boolean
      description?: string
    }

    export interface PropDoc {
      [componentOrHook: string]: Prop
    }

  `

  const getterTypes = outdent`  

  export declare const allPropDocs: Record<string, Prop>

  export declare function getPropDoc(name: string): PropDoc | undefined
  `

  ensureFileSync(paths.mjs)
  return writeFile(paths.dts, `${baseType}\n${typeExports}\n${getterTypes}`)
}

export async function main() {
  const files = globSync("generated/*.json")

  const outputPath = join("dist", "components")

  const info = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, "utf8")
      // baseName is the name of the file without the extension
      const baseName = basename(file, ".json")
      const componentName = startCase(baseName)

      const fileName = join(baseName, `${componentName}.json`)
      const distJsonName = join("components", `${componentName}.json`)
      const distJsonPath = join(outputPath, `${componentName}.json`)

      return {
        componentName,
        fileName,
        distJsonName,
        distJsonPath,
        content,
      }
    }),
  )

  await Promise.all([
    writeJsonFiles(info),
    writeIndexMJS(info),
    writeIndexCJS(info),
    writeIndexDTS(info),
  ])

  console.log("Props extracted for all components 🎉")
}

main()
