import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface CodeProps
  extends HTMLChakraProps<"code">,
    SystemRecipeProps<"Code"> {}

/**
 * React component to render inline code snippets.
 *
 * @see Docs https://chakra-ui.com/code
 */
export const Code = forwardRef<CodeProps, "code">(function Code(props, ref) {
  const recipe = useRecipe("Code")
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  return (
    <chakra.code
      ref={ref}
      {...localProps}
      className={cx("chakra-code", localProps.className)}
      css={{ display: "inline-block", ...styles }}
    />
  )
})

Code.displayName = "Code"
