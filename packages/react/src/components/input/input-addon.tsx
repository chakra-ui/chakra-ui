import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface InputAddonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"InputAddon"> {}

export const InputAddon = forwardRef<InputAddonProps, "div">(
  function InputAddon(props, ref) {
    const recipe = useRecipe("InputAddon", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)
    return <chakra.div ref={ref} {...localProps} css={[styles, props.css]} />
  },
)

InputAddon.displayName = "InputAddon"
