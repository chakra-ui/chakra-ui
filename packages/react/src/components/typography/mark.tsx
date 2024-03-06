import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface MarkProps
  extends RecipeProps<"Mark">,
    HTMLChakraProps<"mark"> {}

export const Mark = forwardRef<MarkProps, "mark">(function Mark(props, ref) {
  const recipe = useRecipe("Mark", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  return (
    <chakra.mark
      ref={ref}
      className="chakra-mark"
      {...localProps}
      css={[recipe(variantProps), localProps.css]}
    />
  )
})
