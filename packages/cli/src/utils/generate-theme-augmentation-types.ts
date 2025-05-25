import type { SystemContext } from "@chakra-ui/react"
import type { CodegenFlags } from "../commands/typegen.js"
import { generateConditionResult } from "./generate-conditions.js"
import { generatePropTypesResult } from "./generate-prop-types.js"
import {
  generateRecipeHelperTypes,
  generateRecipeResult,
  generateSlotRecipeResult,
} from "./generate-recipe.js"
import { generateSystemTypesResult } from "./generate-system-types.js"
import { pretty } from "./pretty.js"

export function generateThemeAugmentationImports() {
  return `import type { ConditionalValue, CssProperties, RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "@chakra-ui/react"`
}

export function generateThemeAugmentationTypes(
  sys: SystemContext,
  flags: CodegenFlags,
) {
  const result = `
      ${generateThemeAugmentationImports()}

      declare module '@chakra-ui/react' {
        ${generateConditionResult(sys)}
        ${generateRecipeResult(sys)}
        ${generateSlotRecipeResult(sys, flags.strict)}
        ${generateRecipeHelperTypes()}
        ${generatePropTypesResult(sys)}
        ${generateSystemTypesResult(sys)}
      }
      `
  return pretty(result)
}
