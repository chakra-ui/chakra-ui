import { describe, expect, test } from "vitest"
import { defineRecipe, defineSlotRecipe } from "../src"
import type {
  RecipeDefinition,
  RecipeVariantProps,
} from "../src/styled-system/recipe.types"

describe("recipe types", () => {
  test("allows default variants on broadly typed recipe definitions", () => {
    const recipe: RecipeDefinition = {
      variants: {
        variant: {
          subtle: {},
          solid: {},
        },
      },
      defaultVariants: {
        variant: "subtle",
      },
    }

    expect(recipe.defaultVariants?.variant).toBe("subtle")
  })
})

const recipe = defineRecipe({
  variants: {
    variant: {
      subtle: {},
      solid: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    variant: "subtle",
    disabled: true,
  },
})

defineRecipe({
  variants: {
    variant: {
      subtle: {},
      solid: {},
    },
  },
  defaultVariants: {
    // @ts-expect-error invalid variant values should still fail
    variant: "ghost",
  },
})

type Props = RecipeVariantProps<typeof recipe>

const validProps: Props = {
  variant: "solid",
  disabled: false,
}

const slotRecipe = defineSlotRecipe({
  slots: ["root", "label"],
  variants: {
    size: {
      sm: { root: {}, label: {} },
      md: { root: {}, label: {} },
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

type SlotProps = RecipeVariantProps<typeof slotRecipe>

const validSlotProps: SlotProps = {
  size: "md",
}

void validProps
void validSlotProps
