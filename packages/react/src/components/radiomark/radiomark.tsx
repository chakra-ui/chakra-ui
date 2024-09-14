"use client"

import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  type HTMLChakraProps,
  type RecipeProps,
  type UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"
import { dataAttr } from "../../utils"

export interface RadiomarkProps
  extends HTMLChakraProps<"span", RecipeProps<"radiomark">>,
    UnstyledProp {
  /**
   * Whether the checkmark is checked
   */
  checked?: boolean
  /**
   * Whether the checkmark is disabled
   */
  disabled?: boolean
}

export const Radiomark = forwardRef<HTMLSpanElement, RadiomarkProps>(
  function Radiomark(props, ref) {
    const recipe = useRecipe({ key: "radiomark", recipe: props.recipe })
    const [variantProps, restProps] = recipe.splitVariantProps(props)

    const { checked, disabled, unstyled, children, ...rest } = restProps

    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    const sharedProps = {
      ref,
      "data-checked": dataAttr(checked),
      "data-disabled": dataAttr(disabled),
      ...rest,
      css: [styles, props.css],
    }

    return (
      <chakra.span {...sharedProps}>
        {checked && <span className="dot" />}
      </chakra.span>
    )
  },
)
