import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"

export interface KbdProps extends HTMLChakraProps<"kbd">, RecipeProps<"Kbd"> {}

/**
 * Semantic component to render a keyboard shortcut
 * within an application.
 *
 * @example
 *
 * ```jsx
 * <Kbd>⌘ + T</Kbd>
 * ```
 *
 * @see Docs https://chakra-ui.com/kbd
 */
export const Kbd = forwardRef<KbdProps, "kbd">(function Kbd(props, ref) {
  const recipe = useRecipe("Kbd", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  return (
    <chakra.kbd
      ref={ref}
      {...localProps}
      className={cx("chakra-kbd", localProps.className)}
      css={[styles, props.css]}
    />
  )
})

Kbd.displayName = "Kbd"