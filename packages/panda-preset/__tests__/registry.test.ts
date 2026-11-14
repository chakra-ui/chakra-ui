/// <reference types="vite/client" />
import { recipes } from "../src/recipes"
import { slotRecipes } from "../src/slot-recipes"

// Every recipe file must be registered in its index, or Panda never emits its CSS.
const cases = [
  {
    name: "recipes",
    registry: recipes,
    files: import.meta.glob(["../src/recipes/*.ts", "!**/index.ts"], {
      eager: true,
    }),
  },
  {
    name: "slotRecipes",
    registry: slotRecipes,
    files: import.meta.glob(["../src/slot-recipes/*.ts", "!**/index.ts"], {
      eager: true,
    }),
  },
]

describe.each(cases)("$name", ({ registry, files }) => {
  const registered = new Set<unknown>(Object.values(registry))

  test.each(Object.entries(files))("%s is registered", (_file, mod) => {
    const exported = Object.values(mod as Record<string, unknown>)
    expect(exported.every((recipe) => registered.has(recipe))).toBe(true)
  })
})
