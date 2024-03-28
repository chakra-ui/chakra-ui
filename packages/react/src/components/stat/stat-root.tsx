"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { StatStylesProvider } from "./stat-context"

export interface StatRootProps
  extends HTMLChakraProps<"div">,
    UnstyledProp,
    SlotRecipeProps<"Stat"> {}

/**
 * The `Stat` component is used to display some statistics.
 *
 * @see Docs https://chakra-ui.com/docs/components/stat
 */
export const StatRoot = forwardRef<HTMLDivElement, StatRootProps>(
  function StatRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Stat", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    return (
      <StatStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...localProps}
          className={cx("chakra-stat", localProps.className)}
          css={[styles.root, localProps.css]}
        >
          <dl>{localProps.children}</dl>
        </chakra.div>
      </StatStylesProvider>
    )
  },
)

StatRoot.displayName = "Stat"
