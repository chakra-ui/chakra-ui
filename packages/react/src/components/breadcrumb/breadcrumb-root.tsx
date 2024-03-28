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
import { BreadcrumbStylesProvider } from "./breadcrumb-context"

export interface BreadcrumbRootProps
  extends HTMLChakraProps<"nav">,
    SlotRecipeProps<"Breadcrumb">,
    UnstyledProp {}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
export const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(
  function BreadcrumbRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Breadcrumb", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    return (
      <BreadcrumbStylesProvider value={styles}>
        <chakra.nav
          ref={ref}
          aria-label="breadcrumb"
          {...localProps}
          className={cx("chakra-breadcrumb", props.className)}
          css={[styles.root, props.css]}
        >
          {localProps.children}
        </chakra.nav>
      </BreadcrumbStylesProvider>
    )
  },
)

BreadcrumbRoot.displayName = "Breadcrumb"
