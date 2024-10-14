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

export interface CheckmarkProps
  extends HTMLChakraProps<"svg", RecipeProps<"checkmark">>,
    UnstyledProp {
  /**
   * Whether the checkmark is checked
   */
  checked?: boolean
  /**
   * Whether the checkmark is indeterminate
   */
  indeterminate?: boolean
  /**
   * Whether the checkmark is disabled
   */
  disabled?: boolean
}

export const Checkmark = forwardRef<SVGSVGElement, CheckmarkProps>(
  function Checkmark(props, ref) {
    const recipe = useRecipe({ key: "checkmark", recipe: props.recipe })
    const [variantProps, restProps] = recipe.splitVariantProps(props)

    const { checked, indeterminate, disabled, unstyled, children, ...rest } =
      restProps

    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    return (
      <chakra.svg
        ref={ref}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3px"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-state={
          indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"
        }
        data-disabled={dataAttr(disabled)}
        css={[styles, props.css]}
        {...rest}
      >
        {indeterminate ? (
          <path d="M5 12h14" />
        ) : checked ? (
          <polyline points="20 6 9 17 4 12" />
        ) : null}
      </chakra.svg>
    )
  },
)
