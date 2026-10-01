import { checkmarkRecipe as pandaCheckmarkRecipe } from "../../panda-preset/src/recipes/checkmark"
import { checkboxSlotRecipe as pandaCheckboxSlotRecipe } from "../../panda-preset/src/slot-recipes/checkbox"
import { checkboxCardSlotRecipe as pandaCheckboxCardSlotRecipe } from "../../panda-preset/src/slot-recipes/checkbox-card"
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "../src"

const checkedSelector =
  "&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])"
const defaultStateSelector =
  "&:where([data-state=checked], [data-state=indeterminate])"
const highSpecificityStateSelector =
  "&:is([data-state=checked], [data-state=indeterminate])"

const customConfig = defineConfig({
  theme: {
    recipes: {
      checkmark: defineRecipe({
        base: {
          _checked: { backgroundColor: "blue.500" },
        },
      }),
    },
    slotRecipes: {
      checkbox: defineSlotRecipe({
        slots: ["control"],
        base: {
          control: {
            _checked: { backgroundColor: "blue.500" },
          },
        },
      }),
      checkboxCard: defineSlotRecipe({
        slots: ["indicator"],
        base: {
          indicator: {
            _checked: { backgroundColor: "blue.500" },
          },
        },
      }),
    },
  },
})

const system = createSystem(defaultConfig, customConfig)

const recipeStyles = [
  ["Checkmark", system.getRecipeFn("checkmark")({ variant: "solid" })],
  [
    "Checkbox",
    system.getSlotRecipeFn("checkbox")({ variant: "solid" }).control,
  ],
  [
    "Checkbox Card",
    system.getSlotRecipeFn("checkboxCard")({ variant: "surface" }).indicator,
  ],
] as const

describe("checkmark state specificity", () => {
  test.each(recipeStyles)(
    "%s allows custom checked styles to override the default variant",
    (_name, result) => {
      const styles = result["@layer recipes"]

      expect(styles[checkedSelector]).toMatchObject({
        backgroundColor: "var(--chakra-colors-blue-500)",
      })
      expect(styles[defaultStateSelector]).toMatchObject({
        borderColor: "var(--chakra-colors-color-palette-solid)",
      })
      expect(styles[highSpecificityStateSelector]).toBeUndefined()
    },
  )

  test("keeps Panda preset state selectors in sync", () => {
    const stateStyles = [
      pandaCheckmarkRecipe.variants?.variant?.solid,
      pandaCheckmarkRecipe.variants?.variant?.outline,
      pandaCheckmarkRecipe.variants?.variant?.subtle,
      pandaCheckmarkRecipe.variants?.variant?.plain,
      pandaCheckmarkRecipe.variants?.variant?.inverted,
      pandaCheckboxSlotRecipe.variants?.variant?.outline?.control,
      pandaCheckboxSlotRecipe.variants?.variant?.solid?.control,
      pandaCheckboxSlotRecipe.variants?.variant?.subtle?.control,
      pandaCheckboxCardSlotRecipe.variants?.variant?.surface?.indicator,
      pandaCheckboxCardSlotRecipe.variants?.variant?.subtle?.indicator,
      pandaCheckboxCardSlotRecipe.variants?.variant?.outline?.indicator,
      pandaCheckboxCardSlotRecipe.variants?.variant?.solid?.indicator,
    ]

    stateStyles.forEach((styles) => {
      const selectors = styles as Record<string, unknown>
      expect(selectors[defaultStateSelector]).toBeDefined()
      expect(selectors[highSpecificityStateSelector]).toBeUndefined()
    })
  })
})
