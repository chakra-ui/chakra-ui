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
import { useFieldContext } from "./field-context"

export interface HelpTextProps
  extends HTMLChakraProps<"div">,
    RecipeProps<"label">,
    UnstyledProp {}

export const HelpText = forwardRef<HTMLDivElement, HelpTextProps>(
  function HelpText({ unstyled, ...props }, ref) {
    const recipe = useRecipe("helpText", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)
    const field = useFieldContext()

    return (
      <chakra.div
        {...field?.getHelpTextProps(localProps, ref)}
        className={cx("chakra-help-text", props.className)}
        css={[styles, props.css]}
      />
    )
  },
)
