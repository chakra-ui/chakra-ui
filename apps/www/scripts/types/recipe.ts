import consola from "consola"
import { ensureDirSync } from "fs-extra"
import { writeFile } from "node:fs/promises"
import { camelCase, kebabCase } from "scule"
import { defaultSystem } from "../../../../packages/react/src/preset"
import { getComponentList } from "../get-component-list"
import { getRecipeTypes } from "../get-recipe-types"
import { stringify, toComponentCase } from "../shared"

export const main = async () => {
  const dirs = await getComponentList()

  consola.box("Fetching types for", dirs.length, "components")

  ensureDirSync("public/types/recipe")

  const proms = [...dirs, "heading"].flatMap(async (dir) => {
    const recipeKey = camelCase(dir)
    const outPath = `public/types/recipe/${kebabCase(dir)}.json`

    const props = getRecipeTypes(defaultSystem, recipeKey)
    consola.info("Writing", outPath)

    if (defaultSystem.isRecipe(recipeKey)) {
      return writeFile(
        outPath,
        stringify({ [toComponentCase(recipeKey)]: { props } }),
      )
    }

    if (defaultSystem.isSlotRecipe(recipeKey)) {
      return writeFile(outPath, stringify({ Root: { props } }))
    }
  })

  await Promise.all(proms)

  consola.success("Done ✅")
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
