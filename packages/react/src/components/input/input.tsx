import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  mergeProps,
  useRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface InputProps
  extends Omit<HTMLChakraProps<"input">, Omitted>,
    RecipeProps<"Input">,
    FieldOptions {
  /**
   * If `true`, the input will be unstyled
   */
  unstyled?: boolean
}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 *
 * @see Docs https://chakra-ui.com/docs/components/input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const { unstyled, ...restProps } = props

    const recipe = useRecipe("Input", props.recipe)
    const [variantProps, localProps] = recipe.splitVariantProps(restProps)
    const styles = recipe(variantProps)

    const [fieldProps, elementProps] = splitFieldProps(localProps)
    const inputProps = useField<HTMLInputElement>(fieldProps)

    return (
      <chakra.input
        {...mergeProps(elementProps, inputProps)}
        css={[!unstyled ? styles : { bg: "inherit" }, props.css]}
        ref={ref}
        className={cx("chakra-input", props.className)}
      />
    )
  },
)

Input.displayName = "Input"
