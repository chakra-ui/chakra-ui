import { ensureDirSync } from "fs-extra"
import { existsSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"
import { join } from "node:path/posix"
import { resolve } from "path/posix"
import ts, { readConfigFile } from "typescript"

interface ComponentTypeInfo {
  type: string
  defaultValue?: string | boolean | null
  isRequired: boolean
  description?: string
}

interface ComponentTypeProperties {
  [component: string]: ComponentTypeInfo
}

interface TypeSearchOptions {
  shouldIgnoreProperty?: (property: ts.Symbol) => boolean | undefined
}

function formatValue(value: string | undefined) {
  if (!value) return
  // convert "\"column\"", to "column"
  const x = value.replace(/^"(.*)"$/, "$1")
  return x === "true" ? true : x === "false" ? false : x
}

async function extractPropertiesOfTypeName(
  searchTerm: string | RegExp,
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker,
  { shouldIgnoreProperty = () => false }: TypeSearchOptions = {},
) {
  const regexSearchTerm =
    typeof searchTerm === "string" ? `^${searchTerm}$` : searchTerm

  const typeStatements = sourceFile.statements.filter(
    (statement) =>
      (ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement)) &&
      new RegExp(regexSearchTerm).test(statement.name.getText()),
  )

  const results: Record<string, ComponentTypeProperties> = {}

  for (const typeStatement of typeStatements) {
    const properties: ComponentTypeProperties = {}
    const type = typeChecker.getTypeAtLocation(typeStatement)

    for (const property of type.getProperties()) {
      if (shouldIgnoreProperty(property)) {
        continue
      }

      const propertyName = property.getName()
      const type = typeChecker.getTypeOfSymbolAtLocation(property, sourceFile)

      let [, typeString] = property.valueDeclaration?.getText().split(":") ?? []
      typeString = typeString?.trim().replace(";", "")

      const docTags = property.getJsDocTags()

      const defaultValue =
        docTags
          .find((tag) => tag.name === "default")
          ?.text?.map((doc) => doc.text)
          ?.join("\n") || undefined

      const nonNullableType = type.getNonNullableType()

      const typeName = typeChecker.typeToString(nonNullableType)
      const required = nonNullableType === type && typeName !== "any"

      // const prettyType = await tryPrettier(typeName)

      properties[propertyName] = {
        type: typeString,
        defaultValue: formatValue(defaultValue),
        isRequired: required,
        description:
          property
            .getDocumentationComment(typeChecker)
            .map((comment) => comment.text)
            .join("\n") || undefined,
      }
    }

    let typeName = (typeStatement as any).name.getText() as string

    if (/Props$/.test(typeName)) {
      typeName = typeName.replace(/Props$/, "")
      results[typeName] = properties
    } else {
      log("Omitting type", `\`${typeName}\``)
    }
  }

  return Object.keys(results).length ? results : null
}

function createTypeSearch(
  tsConfigPath: string,
  typeSearchOptions: TypeSearchOptions = {},
) {
  const { shouldIgnoreProperty } = typeSearchOptions
  const configFile = readConfigFile(tsConfigPath, ts.sys.readFile)
  const basePath = dirname(tsConfigPath)
  const { fileNames, options } = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    basePath,
  )

  const program = ts.createProgram(fileNames, options)
  const sourceFiles = program.getSourceFiles()

  return async (
    searchTerm: Parameters<typeof extractPropertiesOfTypeName>[0],
  ) => {
    const results: Record<string, ComponentTypeProperties> = {}
    for (const sourceFile of sourceFiles) {
      const typeInfo = await extractPropertiesOfTypeName(
        searchTerm,
        sourceFile,
        program.getTypeChecker(),
        { shouldIgnoreProperty },
      )
      Object.assign(results, typeInfo)
    }
    return results
  }
}

function getSourceFileName(symbol: ts.Symbol): string | undefined {
  const declarations = symbol.getDeclarations()
  if (!declarations || declarations.length === 0) {
    return undefined
  }
  const sourceFile = declarations[0].getSourceFile()
  return sourceFile ? sourceFile.fileName : undefined
}

function extractTypeExports(code: string) {
  type ExportedType = {
    [typeName: string]: any
  }

  const exported: ExportedType = {}

  const exportedTypeRegex = /export type\s*{([^}]+)}/g
  let match = exportedTypeRegex.exec(code)

  while (match != null) {
    const types = match[1].split(",").map((s) => s.trim())
    types.forEach((type) => {
      let [typeName] = type.split(" ") ?? []
      exported[typeName] = true
    })
    match = exportedTypeRegex.exec(code)
  }

  const exportedTypes = Object.keys(exported).filter(Boolean)

  log({ exportedTypes })

  return exportedTypes
}

function shouldIgnoreProperty(property: ts.Symbol) {
  const sourceFileName = getSourceFileName(property)
  const isExternal = /(node_modules|styled-system|@types\/react)/.test(
    sourceFileName ?? "",
  )
  const isExcludedByName = ["children"].includes(property.getName())
  return isExternal || isExcludedByName
}

async function extractDirectory(file: string) {
  if (!existsSync(file)) return {}

  const content = await readFile(file, "utf8")
  const searchType = createTypeSearch("tsconfig.json", { shouldIgnoreProperty })

  const promises = await Promise.all(
    extractTypeExports(content)?.map(searchType),
  )

  return promises
    .filter((value) => Object.keys(value).length !== 0)
    .reduce((acc, value) => ({ ...acc, ...value }), {})
}

const layoutComponents = [
  "aspect-ratio",
  "bleed",
  "box",
  "center",
  "container",
  "flex",
  "float",
  "grid",
  "group",
  "highlight",
  "portal",
  "wrap",
  "for",
  "client-only",
  "show",
  "checkmark",
  "radiomark",
]

const main = async () => {
  const componentPath = resolve("../../packages/react/src/components")

  const dirs = layoutComponents
    .flatMap((dir) => join(componentPath, dir, "index.ts"))
    .flat()

  const result: ComponentTypeProperties = {}

  await Promise.all(
    dirs.map(async (dir) => {
      const typeExports = await extractDirectory(dir)
      Object.assign(result, typeExports)
    }),
  )

  ensureDirSync("public/types")

  await writeFile(
    "public/types/components.json",
    JSON.stringify(result, null, 2),
  )
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

function log(...args: any[]) {
  console.log("[props-docs]: ", ...args)
}
