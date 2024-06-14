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

export interface LabelProps
  extends HTMLChakraProps<"label">,
    RecipeProps<"label">,
    UnstyledProp {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { unstyled, ...props },
  ref,
) {
  const recipe = useRecipe("label", props.recipe)
  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

  const { className, children, ...rest } = localProps

  const field = useFieldContext()
  const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest }

  return (
    <chakra.label
      {...ownProps}
      className={cx("chakra-field__label", className)}
      css={[styles, rest.css]}
    >
      {children}
    </chakra.label>
  )
})
