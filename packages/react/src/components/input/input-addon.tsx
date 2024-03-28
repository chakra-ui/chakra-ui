"use client"

import { forwardRef } from "react"
import {
  EMPTY_SLOT_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

export interface InputAddonProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"InputAddon">,
    UnstyledProp {}

export const InputAddon = forwardRef<HTMLDivElement, InputAddonProps>(
  function InputAddon({ unstyled, ...props }, ref) {
    const recipe = useRecipe("InputAddon", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_SLOT_STYLES : recipe(variantProps)
    return <chakra.div ref={ref} {...localProps} css={[styles, props.css]} />
  },
)

InputAddon.displayName = "InputAddon"
