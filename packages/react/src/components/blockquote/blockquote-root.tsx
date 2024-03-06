import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { BlockquoteStylesProvider } from "./blockquote-context"

export interface BlockquoteRootProps
  extends HTMLChakraProps<"figure">,
    SlotRecipeProps<"Blockquote"> {}

export const BlockquoteRoot = forwardRef<HTMLElement, BlockquoteRootProps>(
  function BlockquoteRoot(props, ref) {
    const recipe = useSlotRecipe("Blockquote", props.recipe)

    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <BlockquoteStylesProvider value={styles}>
        <chakra.figure
          ref={ref}
          {...localProps}
          className={cx("chakra-blockquote", props.className)}
          css={styles.root}
        />
      </BlockquoteStylesProvider>
    )
  },
)

BlockquoteRoot.displayName = "BlockquoteRoot"
