"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { BlockquoteStylesProvider } from "./blockquote-context"

export interface BlockquoteRootProps
  extends HTMLChakraProps<"figure">,
    SlotRecipeProps<"blockquote">,
    UnstyledProp {}

export const BlockquoteRoot = forwardRef<HTMLElement, BlockquoteRootProps>(
  function BlockquoteRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("blockquote", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)
    console.log(styles)

    return (
      <BlockquoteStylesProvider value={styles}>
        <chakra.figure
          ref={ref}
          {...localProps}
          className={cx("chakra-blockquote", props.className)}
          css={styles["root"]}
        />
      </BlockquoteStylesProvider>
    )
  },
)

BlockquoteRoot.displayName = "BlockquoteRoot"
