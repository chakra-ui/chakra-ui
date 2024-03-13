import { cx, dataAttr } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"

interface ButtonOptions {
  /**
   * If `true`, the button will be styled in its active state.
   * @default false
   */
  isActive?: boolean
  /**
   * If `true`, the button will be disabled.
   * @default false
   */
  isDisabled?: boolean
}

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    RecipeProps<"Button"> {
  unstyled?: boolean
}

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a Dialog, canceling an action, or performing a delete operation.
 *
 * @see Docs https://chakra-ui.com/docs/components/button
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(passedProps, ref) {
    const { unstyled, ...props } = passedProps

    const recipe = useRecipe("Button", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const { isDisabled, isActive, type, className, as, ...restProps } =
      localProps

    return (
      <chakra.button
        ref={ref}
        as={as}
        type="button"
        data-active={dataAttr(isActive)}
        {...restProps}
        css={[!unstyled && styles, props.css]}
        disabled={isDisabled}
        className={cx("chakra-button", className)}
      />
    )
  },
)

Button.displayName = "Button"
