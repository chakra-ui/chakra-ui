import { defineSystem } from "@chakra-ui/react"
import { globalCss } from "./global-css"
import { recipes } from "./recipes"
import { slotRecipes } from "./slot-recipes"

export const preset = defineSystem({
  cssVarsPrefix: "chakra",
  globalCss: globalCss,
  theme: {
    recipes: recipes,
    slotRecipes: slotRecipes,
  },
})
