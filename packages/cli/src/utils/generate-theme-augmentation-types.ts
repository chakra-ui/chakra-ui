import type { SystemContext } from "@chakra-ui/react"
import type { CodegenFlags } from "../commands/typegen.js"
import { generateConditionResult } from "./generate-conditions.js"
import { generatePropTypesResultForAugmentation } from "./generate-prop-types.js"
import {
  generateRecipeResultForAugmentation,
  generateSlotRecipeResultForAugmentation,
} from "./generate-recipe.js"
import { generateSystemTypesResultForAugmentation } from "./generate-system-types.js"
import { generateTokensResultForAugmentation } from "./generate-tokens.js"
import { pretty } from "./pretty.js"

export function generateThemeAugmentationImports() {
  return `import type { ConditionalValue, CssProperties, SystemRecipeFn, SystemSlotRecipeFn } from "@chakra-ui/react"`
}

export function generateThemeAugmentationTypes(
  sys: SystemContext,
  flags: CodegenFlags,
) {
  const result = `
      ${generateThemeAugmentationImports()}

      declare module '@chakra-ui/react' {
        ${generateConditionResult(sys)}
        ${generateRecipeResultForAugmentation(sys)}
        ${generateSlotRecipeResultForAugmentation(sys, flags.strict)}
        ${generateTokensResultForAugmentation(sys)}
        ${generatePropTypesResultForAugmentation(sys)}
        ${generateSystemTypesResultForAugmentation(sys)}
      }
      `
  return pretty(result)
}
