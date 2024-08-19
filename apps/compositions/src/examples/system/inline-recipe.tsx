import type {
  HTMLChakraProps,
  RecipeVariantProps,
  UnstyledProp,
} from "@chakra-ui/react"
import { createRecipeContext, defineRecipe } from "@chakra-ui/react"

const button = defineRecipe({
  className: "button",
  base: {
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "red",
    color: "white",
  },
  variants: {
    bold: {
      true: {
        fontWeight: "bold",
      },
    },
  },
})

interface ButtonProps
  extends HTMLChakraProps<"button", RecipeVariantProps<typeof button>>,
    UnstyledProp {}

const Button = createRecipeContext<HTMLButtonElement, ButtonProps>(
  "button",
  button,
)

export const SystemInlineRecipe = () => {
  return <Button bold>Welcome</Button>
}
