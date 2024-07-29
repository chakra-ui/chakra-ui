"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface ContainerProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"container">,
    UnstyledProp {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ unstyled, ...props }, ref) {
    const recipe = useRecipe("container", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)
    return (
      <chakra.div
        ref={ref}
        {...localProps}
        className={cx("chakra-container", props.className)}
        css={[styles, props.css]}
      />
    )
  },
)
