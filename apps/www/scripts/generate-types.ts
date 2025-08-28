import { deepMerge } from "@/lib/deep-merge"
import { extractTypes } from "@/utils/extract-types"
import {
  getComponentDir,
  getComponentList,
  staticComponentList,
} from "@/utils/get-component-list"
import { getRecipeTypes } from "@/utils/get-recipe-types"
import {
  chartComponents,
  filterEmpty,
  isEmptyObject,
  mapEntries,
  toComponentCase,
} from "@/utils/shared"
import { defaultSystem } from "@chakra-ui/react/preset"
import { ensureDirSync } from "fs-extra"
import { existsSync, globSync, readFileSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"
import { camelCase, kebabCase } from "scule"

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
    const props = getRecipeTypes(defaultSystem, recipeKey)

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

async function writeStaticProps(outDir: string) {
  const files = globSync("scripts/static-props/**/*.json")
  files.forEach((file) => {
    const name = basename(file, ".json")
    const props = JSON.parse(readFileSync(file, "utf-8"))
    writeFileSync(`${outDir}/${name}.json`, JSON.stringify(props, null, 2))
  })
}

async function writeIndexFile(outDir: string) {
  const allDirs = await getComponentDirectories()
  const indexContent = JSON.stringify(
    {
      components: allDirs.concat("password-input", "hstack", "vstack"),
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

    const props = await extractTypes(inPath)

    const json = deepMerge(
      {},
      wrapInProps(props, recipeKey),
      arkProps[arkPropsMap[dir] || dir],
      recipeProps[dir],
    )

    writeFileSync(`${outDir}/${dir}.json`, JSON.stringify(json, null, 2))
  }

  // Only write static props if processing all components
  if (!components || components.length === 0) {
    writeStaticProps(outDir)
  }
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

function wrapInProps(obj: any, recipeKey: string) {
  const isSlotRecipe = defaultSystem.isSlotRecipe(recipeKey)
  const componentName = toComponentCase(recipeKey)
  const result: Record<string, any> = mapEntries(obj, (key: string, value) => [
    isSlotRecipe ? key.replace(componentName, "") : key,
    isEmptyObject(value) ? { props: {} } : { props: value },
  ])

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
    result[componentName] ||= { props: {} }
    Object.assign(result[componentName].props, commonProps)
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
