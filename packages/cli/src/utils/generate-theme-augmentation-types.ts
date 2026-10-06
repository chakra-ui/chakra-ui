import type { SystemContext } from "@chakra-ui/react"
import type { CodegenFlags } from "../commands/typegen.js"
import { generateConditionBodyForRegister } from "./generate-conditions.js"
import { generatePropTypesBodyForRegister } from "./generate-prop-types.js"
import {
  generateRecipeConfigBodyForRegister,
  generateRecipeSlotsBodyForRegister,
  generateSlotRecipeConfigBodyForRegister,
} from "./generate-recipe.js"
import { generateSystemTypesBodyForRegister } from "./generate-system-types.js"
import {
  generateColorPaletteForRegister,
  generateTokenUnionForRegister,
  generateTokensBodyForRegister,
} from "./generate-tokens.js"
import { pretty } from "./pretty.js"

export function generateThemeAugmentationImports() {
  return `import type { AnyString, ConditionalValue, CssProperties, CssVars, SystemRecipeFn, SystemSlotRecipeFn } from "@chakra-ui/react"`
}

export function generateThemeAugmentationTypes(
  sys: SystemContext,
  flags: CodegenFlags,
) {
  const result = `
      ${generateThemeAugmentationImports()}

      declare module '@chakra-ui/react' {
        export interface Register {
          conditions: {
            ${generateConditionBodyForRegister(sys)}
          }
          configRecipes: {
            ${generateRecipeConfigBodyForRegister(sys)}
          }
          configSlotRecipes: {
            ${generateSlotRecipeConfigBodyForRegister(sys, flags.strict)}
          }
          configRecipeSlots: {
            ${generateRecipeSlotsBodyForRegister(sys)}
          }
          tokens: {
            ${generateTokensBodyForRegister(sys)}
          }
          token: ${generateTokenUnionForRegister(sys)}
          colorPalette: ${generateColorPaletteForRegister(sys)}
          utilityValues: {
            ${generatePropTypesBodyForRegister(sys)}
          }
          systemProperties: {
            ${generateSystemTypesBodyForRegister(sys)}
          }
        }
      }
      `
  return pretty(result)
}
