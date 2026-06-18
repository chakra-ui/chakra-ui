import { deepMerge } from "@/lib/deep-merge"
import { extractTypes } from "@/utils/extract-types"
import {
  getComponentDir,
  getComponentList,
  staticComponentList,
} from "@/utils/get-component-list"
import { getRecipeTypes } from "@/utils/get-recipe-types"
import { exampleOnlyComponents } from "@/utils/project-sdk"
import {
  chartComponents,
  filterEmpty,
  isEmptyObject,
  toComponentCase,
} from "@/utils/shared"
import { defaultSystem } from "@chakra-ui/react/preset"
import { ensureDirSync } from "fs-extra"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { camelCase, kebabCase } from "scule"
import ts from "typescript"

const fetchArkComponents = async <T>(arg = ""): Promise<T> => {
  const prom = await fetch(`http://ark-ui.com/api/types/react${arg}`)
  return prom.json()
}

async function getArkComponentProps() {
  const arkComponents = await fetchArkComponents<string[]>()
  const entries = await Promise.all(
    arkComponents.map(async (dir) => [
      dir,
      await fetchArkComponents<Record<string, any>>(`/${dir}`),
    ]),
  )
  return Object.fromEntries(entries)
}

async function getRecipeProps() {
  const componentDirs = await getComponentList()
  const entries = componentDirs.map((dir) => {
    const recipeKey = camelCase(dir)
    let props = getRecipeTypes(defaultSystem, recipeKey)

    if (defaultSystem.isRecipe(recipeKey)) {
      return [
        kebabCase(dir),
        filterEmpty({ [toComponentCase(recipeKey)]: { props } }),
      ]
    }

    if (defaultSystem.isSlotRecipe(recipeKey)) {
      return [kebabCase(dir), filterEmpty({ Root: { props } })]
    }

    return [kebabCase(dir), {}]
  })

  return Object.fromEntries(entries)
}

async function getComponentDirectories() {
  const componentList = await getComponentList()
  return Array.from(new Set([...componentList, ...staticComponentList]))
}

function extractDefaultPropsFromSource(
  filePath: string,
): Record<string, Record<string, any>> {
  const content = readFileSync(filePath, "utf-8")
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
  )

  const result: Record<string, Record<string, any>> = {}

  function visit(node: ts.Node) {
    // Look for call expressions like withRootProvider(...) or withContext(...)
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text.startsWith("with") ||
        node.expression.text === "forwardRef")
    ) {
      // For withRootProvider, withContext, etc., the config is typically the 2nd or 3rd argument
      let configArg: ts.Expression | undefined

      if (node.expression.text === "forwardRef" && node.arguments.length > 0) {
        // forwardRef((props, ref) => ...) - skip
        return
      }

      if (node.expression.text.startsWith("with")) {
        // withRootProvider(Component, { defaultProps: ... })
        // withContext(Component, "slot", { defaultProps: ... })
        configArg = node.arguments[node.arguments.length - 1]

        if (!configArg || !ts.isObjectLiteralExpression(configArg)) {
          ts.forEachChild(node, visit)
          return
        }

        // Extract the slot name for withContext (2nd argument is the slot name)
        let slotName = "Root"
        if (
          node.expression.text === "withContext" &&
          node.arguments.length >= 2
        ) {
          const slotArg = node.arguments[1]
          if (ts.isStringLiteral(slotArg)) {
            slotName = toComponentCase(slotArg.text)
          }
        }

        // Find the defaultProps property
        const defaultPropsProp = (
          configArg as ts.ObjectLiteralExpression
        ).properties.find(
          (prop) =>
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            prop.name.text === "defaultProps",
        )

        if (
          defaultPropsProp &&
          ts.isPropertyAssignment(defaultPropsProp) &&
          ts.isObjectLiteralExpression(defaultPropsProp.initializer)
        ) {
          const defaults: Record<string, any> = {}

          ;(
            defaultPropsProp.initializer as ts.ObjectLiteralExpression
          ).properties.forEach((prop) => {
            if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
              return
            }

            const propName = prop.name.text
            const initializer = prop.initializer

            // Only extract primitive values (boolean, string, number literals)
            if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
              defaults[propName] = true
            } else if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
              defaults[propName] = false
            } else if (ts.isStringLiteral(initializer)) {
              defaults[propName] = initializer.text
            } else if (ts.isNumericLiteral(initializer)) {
              defaults[propName] = Number(initializer.text)
            }
            // Skip non-primitive values (JSX, function refs, etc.)
          })

          if (Object.keys(defaults).length > 0) {
            result[slotName] = defaults
          }
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return result
}

async function writeIndexFile(outDir: string) {
  const allDirs = await getComponentDirectories()
  const indexContent = JSON.stringify(
    {
      components: allDirs.concat(...exampleOnlyComponents, "hstack", "vstack"),
      charts: chartComponents,
    },
    null,
    2,
  )
  writeFileSync(`${outDir}/index.json`, indexContent)
}

const arkPropsMap: Record<string, string> = {
  drawer: "dialog",
  "action-bar": "popover",
  "radio-card": "radio-group",
  "checkbox-card": "checkbox",
}

const omittedParts: Record<string, string[]> = {
  toast: ["Store"],
}

function getValueExports(code: string) {
  const exported = new Set<string>()
  const exportedValueRegex = /export\s*{([^}]+)}/g
  let match = exportedValueRegex.exec(code)

  while (match != null) {
    const values = match[1].split(",").map((value) => value.trim())
    values.forEach((value) => {
      const [name, alias] = value.split(/\s+as\s+/)
      exported.add(alias ?? name)
    })
    match = exportedValueRegex.exec(code)
  }

  return exported
}

function getNamespaceAliases(componentDir: string) {
  const file = join(componentDir, "namespace.ts")
  const aliases = new Map<string, string>()
  if (!existsSync(file)) return aliases

  const content = readFileSync(file, "utf-8")
  const exportedValueRegex = /export\s*{([^}]+)}/g
  let match = exportedValueRegex.exec(content)

  while (match != null) {
    const values = match[1].split(",").map((value) => value.trim())
    values.forEach((value) => {
      const [name, alias] = value.split(/\s+as\s+/)
      if (alias) aliases.set(name, alias)
    })
    match = exportedValueRegex.exec(content)
  }

  return aliases
}

async function extractComponents(components?: string[]) {
  const outDir = join("public", "r", "types")

  const componentDir = getComponentDir()
  const allDirs = await getComponentDirectories()
  const arkProps = await getArkComponentProps()
  const recipeProps = await getRecipeProps()

  ensureDirSync(outDir)

  // Filter directories based on specific components if provided
  const dirs =
    components && components.length > 0
      ? allDirs.filter((dir) => components.includes(dir))
      : allDirs

  if (components && components.length > 0) {
    const notFound = components.filter((comp) => !allDirs.includes(comp))
    if (notFound.length > 0) {
      console.error(
        `Component(s) "${notFound.join(", ")}" not found. Available components:`,
      )
      console.error(allDirs.join(", "))
      process.exit(1)
    }
  }

  for await (const dir of dirs) {
    const recipeKey = camelCase(dir)
    console.log(`Extracting ${dir}...`)

    let inPath = join(componentDir, dir, "index.ts")
    if (!existsSync(inPath)) {
      inPath = join(componentDir, dir, "index.tsx")
    }

    const content = readFileSync(inPath, "utf-8")
    const valueExports = getValueExports(content)
    const namespaceAliases = getNamespaceAliases(join(componentDir, dir))
    const props = await extractTypes(inPath)

    const json = deepMerge(
      {},
      wrapInProps(props, recipeKey, valueExports, namespaceAliases),
      arkProps[arkPropsMap[dir] || dir],
      recipeProps[dir],
    )

    omittedParts[dir]?.forEach((part) => {
      Reflect.deleteProperty(json, part)
    })

    // Extract and merge default props from component source
    const componentMainPath = join(componentDir, dir)
    const mainFiles = [
      join(componentMainPath, `${dir}.tsx`),
      join(componentMainPath, `${dir}.ts`),
      join(componentMainPath, "index.tsx"),
      join(componentMainPath, "index.ts"),
    ]
    const mainFile = mainFiles.find(existsSync)

    if (mainFile) {
      const defaultPropsPerPart = extractDefaultPropsFromSource(mainFile)
      for (const [partName, defaults] of Object.entries(defaultPropsPerPart)) {
        if (json[partName]?.props) {
          for (const [propName, defaultValue] of Object.entries(defaults)) {
            // Only set default if prop already exists in the extracted types
            if (propName in json[partName].props) {
              json[partName].props[propName].defaultValue = defaultValue
            }
          }
        }
      }
    }

    writeFileSync(`${outDir}/${dir}.json`, JSON.stringify(json, null, 2))
  }

  // Static props are now extracted programmatically from component source code
  // The writeStaticProps function is no longer needed
}

const commonProps = {
  as: {
    type: "React.ElementType",
    isRequired: false,
    description: "The underlying element to render.",
  },
  asChild: {
    type: "boolean",
    isRequired: false,
    description:
      "Use the provided child element as the default rendered element, combining their props and behavior.",
  },
}

const unstyledProps = {
  unstyled: {
    type: "boolean",
    isRequired: false,
    description: "Whether to remove the component's style.",
  },
}

function wrapInProps(
  obj: any,
  recipeKey: string,
  valueExports: Set<string>,
  namespaceAliases: Map<string, string>,
) {
  const isSlotRecipe = defaultSystem.isSlotRecipe(recipeKey)
  const componentName = toComponentCase(recipeKey)
  const result: Record<string, any> = {}
  const slots = isSlotRecipe
    ? defaultSystem
        .getSlotRecipe(recipeKey)
        .slots.map((slot: string) => toComponentCase(slot))
    : []

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("Use")) continue
    if (key.endsWith("Base")) continue

    let part = key

    const alias = namespaceAliases.get(key)
    if (alias) {
      part = alias
    } else if (isSlotRecipe) {
      if (!key.startsWith(componentName)) continue

      part = key.slice(componentName.length)

      if (!slots.includes(part)) {
        if (!valueExports.has(key)) continue
        if (!/^[A-Z]/.test(part)) continue
      }
    }

    result[part] = isEmptyObject(value) ? { props: {} } : { props: value }
  }

  if (isSlotRecipe) {
    result.Root ||= { props: {} }
    result.Root.props ||= {}

    for (const key in result) {
      if (key.startsWith("Use")) {
        Reflect.deleteProperty(result, key)
        continue
      }

      if (key === "Root") {
        Object.assign(result.Root.props, { ...commonProps, ...unstyledProps })
        continue
      }

      result[key].props ||= {}
      Object.assign(result[key].props, commonProps)
    }
  } else {
    if (namespaceAliases.size === 0) {
      result[componentName] ||= { props: {} }
      Object.assign(result[componentName].props, commonProps)
    }
  }

  return result
}

// Get the specific components from command line arguments
const specificComponents = process.argv.slice(2).filter((arg) => arg.length > 0)

async function run() {
  const outDir = join("public", "r", "types")

  // Generate types for components
  await extractComponents(
    specificComponents.length > 0 ? specificComponents : undefined,
  )

  // Always generate the index file
  await writeIndexFile(outDir)
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
