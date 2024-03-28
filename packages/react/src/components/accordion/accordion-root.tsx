"use client"

import { useMergeRefs } from "@chakra-ui/hooks"
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
import {
  AccordionContextProvider,
  AccordionStylesProvider,
} from "./accordion-context"
import { splitAccordionProps } from "./accordion-props"
import { UseAccordionProps, useAccordion } from "./use-accordion"

export interface AccordionRootProps
  extends UseAccordionProps,
    HTMLChakraProps<"div", UseAccordionProps>,
    SlotRecipeProps<"Accordion">,
    UnstyledProp {
  /**
   * If `true`, height animation and transitions will be disabled.
   *
   * @default false
   */
  reduceMotion?: boolean
}

/**
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/accordion
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  function AccordionRoot(props, ref) {
    const { reduceMotion, unstyled, ...restProps } = props
    const recipe = useSlotRecipe("Accordion", props.recipe)

    const [variantProps, ownProps] = recipe.splitVariantProps(restProps)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const [accordionProps, htmlProps] = splitAccordionProps(ownProps)
    const context = useAccordion(accordionProps)

    return (
      <AccordionContextProvider
        value={{ ...context, reduceMotion: !!reduceMotion }}
      >
        <AccordionStylesProvider value={styles}>
          <chakra.div
            ref={useMergeRefs(ref, context.rootRef)}
            {...htmlProps}
            className={cx("chakra-accordion", props.className)}
            css={[styles.root, props.css]}
          />
        </AccordionStylesProvider>
      </AccordionContextProvider>
    )
  },
)

AccordionRoot.displayName = "AccordionRoot"
