"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  SlotRecipeProps,
  SystemStyleObject,
  UnstyledProp,
  chakra,
  useSlotRecipe,
} from "../../styled-system"
import { CardStylesProvider } from "./card-context"

export interface CardOptions {
  /**
   * The flex direction of the card
   */
  direction?: SystemStyleObject["flexDirection"]
  /**
   * The flex alignment of the card
   */
  align?: SystemStyleObject["alignItems"]
  /**
   * The flex distribution of the card
   */
  justify?: SystemStyleObject["justifyContent"]
}

export interface CardRootProps
  extends HTMLChakraProps<"div", CardOptions>,
    SlotRecipeProps<"Card">,
    UnstyledProp {}

export const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  function CardRoot({ unstyled, ...props }, ref) {
    const recipe = useSlotRecipe("Card", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)

    const {
      children,
      direction = "column",
      justify,
      align,
      ...rest
    } = localProps

    return (
      <CardStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...rest}
          className={cx("chakra-card", props.className)}
          flexDirection={direction}
          justifyContent={justify}
          alignItems={align}
          css={[styles.root, props.css]}
        >
          {children}
        </chakra.div>
      </CardStylesProvider>
    )
  },
)
