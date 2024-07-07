import { mapEntries, uniq } from "@chakra-ui/utils"
import consola from "consola"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "fs/promises"
import { join } from "path"
import { camelCase, kebabCase } from "scule"
import { defaultSystem } from "../../../packages/react/src/preset"
import { extractTypes } from "./extract-types"
import {
  getArkComponent,
  getArkComponentList,
  getComponentDir,
  getComponentList,
  getStaticComponentList,
} from "./get-component-list"
import { getRecipeTypes } from "./get-recipe-types"

async function getArkComponents() {
  const arkList = await getArkComponentList()
  const entries = await Promise.all(
    arkList.map(async (dir) => [dir, await getArkComponent(dir)]),
  )
  return Object.fromEntries(entries)
}

export const main = async () => {
  const basePath = getComponentDir()

  const arkList = await getArkComponentList()
  const listOfDirs = await getComponentList()
  const staticList = getStaticComponentList()

  const arkJson = await getArkComponents()
  console.log(arkJson)

  const dirs = uniq([...listOfDirs, ...staticList]).flat()

  ensureDirSync("public/types")

  const proms = dirs.flatMap(async (dir) => {
    const recipeKey = camelCase(dir)
    const recipeTypes = getRecipeTypes(defaultSystem, recipeKey)
    const outPath = `public/types/${kebabCase(dir)}.json`

    if (arkList.includes(dir)) {
      const propTypes = arkJson[dir]

      propTypes.Root ||= { props: {} }
      Object.assign(propTypes.Root.props, recipeTypes)

      consola.info("[generate:types]: writing", outPath)
      return writeFile(outPath, stringify(propTypes))
    }

    if (staticList.includes(dir)) {
      const inPath = join(basePath, dir, "index.ts")
      const propTypes = await extractTypes(inPath)
      consola.info("[generate:types]: writing", outPath)
      return writeFile(outPath, stringify(wrapInProps(propTypes)))
    }

    const inPath = join(basePath, dir, "index.ts")
    let propTypes = await extractTypes(inPath)

    if (defaultSystem.isSlotRecipe(recipeKey)) {
      propTypes = mapEntries(propTypes, (key, value) => [
        key,
        key.includes("Root") ? { ...value, ...recipeTypes } : value,
      ])
      consola.info("[generate:types]: writing", outPath)
      return writeFile(outPath, stringify(wrapInProps(propTypes)))
    }

    propTypes = mapEntries(propTypes, (key, value) => [
      key,
      { ...value, ...recipeTypes },
    ])

    consola.info("[generate:types]: writing", outPath)
    return writeFile(outPath, stringify(wrapInProps(propTypes)))
  })

  await Promise.all(proms)

  consola.success("All done")
}

function stringify(obj: any) {
  return JSON.stringify(filterEmpty(obj), null, 2)
}

function filterEmpty(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      if (value === null) return false
      if (typeof value === "object") return Object.keys(value).length > 0
      return true
    }),
  )
}

function wrapInProps(obj: any) {
  return mapEntries(obj, (key, value) => [key, { props: value }])
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
