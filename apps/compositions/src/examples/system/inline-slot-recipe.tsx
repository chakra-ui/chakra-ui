import type { HTMLChakraProps, RecipeVariantProps } from "@chakra-ui/react"
import { createSlotRecipeContext, defineSlotRecipe } from "@chakra-ui/react"

// 1. Define the recipe

const checkbox = defineSlotRecipe({
  className: "checkbox",
  slots: ["root", "label", "control"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "2",
    },
    label: {
      fontWeight: "medium",
    },
    control: {
      width: "4",
      height: "4",
      borderRadius: "md",
      borderWidth: "1px",
      borderColor: "gray.300",
      backgroundColor: "white",
    },
  },
  variants: {
    colored: {
      true: {
        control: {
          accentColor: "pink.500",
        },
      },
    },
  },
})

const { withProvider, withContext } = createSlotRecipeContext({
  recipe: checkbox,
})

// 2. Create the components

interface CheckboxRootProps
  extends HTMLChakraProps<"div", RecipeVariantProps<typeof checkbox>> {}

const CheckboxRoot = withProvider<HTMLDivElement, CheckboxRootProps>(
  "div",
  "root",
)

interface CheckboxLabelProps extends HTMLChakraProps<"label"> {}
const CheckboxLabel = withContext<HTMLLabelElement, CheckboxLabelProps>(
  "label",
  "label",
)

interface CheckboxControlProps extends HTMLChakraProps<"input"> {}
const CheckboxControl = withContext<HTMLInputElement, CheckboxControlProps>(
  "input",
  "control",
)

// 3. Use the components

export const SystemInlineSlotRecipe = () => {
  return (
    <CheckboxRoot colored>
      <CheckboxControl id="checkbox" type="checkbox" defaultChecked />
      <CheckboxLabel htmlFor="checkbox">Checkbox</CheckboxLabel>
    </CheckboxRoot>
  )
}
