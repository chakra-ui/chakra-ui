import consola from "consola"
import { findUpSync } from "find-up"
import { ensureDirSync } from "fs-extra"
import { existsSync } from "node:fs"
import { unlink, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { camelCase, kebabCase, pascalCase, titleCase } from "scule"
import { defaultSystem } from "../../../../packages/react/src/preset"
import { extractTypes } from "../../utils/extract-types"
import {
  getComponentDir,
  getComponentList,
  staticComponentList,
} from "../../utils/get-component-list"
import {
  filterEmpty,
  isEmptyObject,
  mapEntries,
  stringify,
  uniq,
} from "../../utils/shared"

export const getRootPath = () => {
  const rootPath = findUpSync("pnpm-workspace.yaml")
  if (!rootPath) throw new Error("Not found")
  return rootPath
}

export const main = async () => {
  const componentDir = getComponentDir()
  const componentList = await getComponentList()

  const rootPath = getRootPath()
  const dirs = uniq([...componentList, ...staticComponentList]).flat()

  ensureDirSync("public/types/component")

  consola.box("Generating types for", dirs.length, "components")

  const proms = dirs.map(async (dir) => {
    const recipeKey = camelCase(dir)

    let inPath = join(componentDir, dir, "index.ts")
    if (!existsSync(inPath)) {
      inPath = join(componentDir, dir, "index.tsx")
    }

    const outPath = `public/types/component/${kebabCase(dir)}.json`

    const props = await extractTypes(inPath)
    if (isEmptyObject(filterEmpty(props))) {
      consola.warn("Skipping", dir)
      try {
        await unlink(outPath)
      } catch (error) {}
      return
    }

    consola.info("Writing", outPath)
    return writeFile(outPath, stringify(wrapInProps(props, recipeKey)))
  })

  const indexContent = dirs.map((dir: string) => pascalCase(dir))

  const mcpIndexPath = resolve(
    rootPath,
    "apps",
    "mcp",
    "src",
    "components.json",
  )

  await Promise.all([
    ...proms,
    await writeFile(
      "public/types/component/index.json",
      JSON.stringify(indexContent, null, 2),
    ),
    await writeFile(mcpIndexPath, JSON.stringify(indexContent, null, 2)),
  ])

  consola.success("Done ✅")
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

function wrapInProps(obj: any, recipeKey: string) {
  const isSlotRecipe = defaultSystem.isSlotRecipe(recipeKey)
  const componentName = titleCase(recipeKey)
  const result: Record<string, any> = mapEntries(obj, (key: string, value) => [
    isSlotRecipe ? key.replace(componentName, "") : key,
    isEmptyObject(value) ? value : { props: value },
  ])

  if (isSlotRecipe) {
    result.Root ||= {}
    result.Root.props ||= {}
    Object.assign(result.Root.props, {
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
      unstyled: {
        type: "boolean",
        isRequired: false,
        description: "Whether to remove the component's style.",
      },
    })
  }

  return result
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
