import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface MarkProps
  extends SystemRecipeProps<"Mark">,
    HTMLChakraProps<"mark"> {}

export const Mark = forwardRef<MarkProps, "mark">(function Mark(props, ref) {
  const recipe = useRecipe("Mark")
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
