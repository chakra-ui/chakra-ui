"use client"

import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  EMPTY_STYLES,
  HTMLChakraProps,
  RecipeProps,
  UnstyledProp,
  chakra,
  useRecipe,
} from "../../styled-system"

interface ButtonOptions {
  /**
   * If `true`, the button will be styled in its active state.
   * @default false
   */
  active?: boolean
}

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    RecipeProps<"Button">,
    UnstyledProp {}

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.
 *
 * @see Docs https://chakra-ui.com/docs/components/button
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ unstyled, active, ...props }, ref) {
    const recipe = useRecipe("Button", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = unstyled ? EMPTY_STYLES : recipe(variantProps)

    return (
      <chakra.button
        ref={ref}
        type="button"
        data-active={dataAttr(active)}
        {...localProps}
        css={[styles, props.css]}
        className={cx("chakra-button", localProps.className)}
      />
    )
  },
)

Button.displayName = "Button"
