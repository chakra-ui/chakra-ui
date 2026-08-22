import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@chakra-ui/react"
import { describe, expect, it } from "vitest"
import { generateThemeAugmentationTypes } from "../src/utils/generate-theme-augmentation-types"

const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        colors: { brand: { 500: { value: "#f00" } } },
        spacing: { gutter: { value: "24px" } },
      },
      recipes: {
        fancyButton: defineRecipe({
          base: { color: "brand.500" },
          variants: {
            tone: { solid: {}, ghost: {} },
            big: { true: {} },
          },
          defaultVariants: { tone: "solid" },
        }),
      },
      slotRecipes: {
        fancyCard: defineSlotRecipe({
          slots: ["root", "title", "body"],
          variants: { density: { compact: {}, cozy: {} } },
        }),
      },
    },
    conditions: {
      supermodern: "@supports (display: grid)",
    },
  }),
)

describe("typegen --augment", () => {
  const out = generateThemeAugmentationTypes(system, {
    strict: false,
    outdir: "./typings",
  })

  it("augments the @chakra-ui/react module via the Register interface", async () => {
    const code = await out
    expect(code).toContain('declare module "@chakra-ui/react"')
    expect(code).toContain("interface Register")
    // maps to the keys register.ts reads (configRecipes/configSlotRecipes/...)
    expect(code).toContain("configRecipes")
    expect(code).toContain("configSlotRecipes")
    expect(code).toContain("configRecipeSlots")
    expect(code).toContain("conditions")
    expect(code).toContain("tokens")
    expect(code).toContain("systemProperties")
    expect(code).toContain("utilityValues")
  })

  it("includes custom theme entries merged with the base config", async () => {
    const code = await out
    // custom recipe / slot recipe / condition / token from the config above
    expect(code).toContain("fancyButton")
    expect(code).toContain("fancyCard")
    expect(code).toContain("_supermodern")
    expect(code).toContain("colors.brand.500")
    // base config still present (merge, not replace)
    expect(code).toContain("button")
  })
})
