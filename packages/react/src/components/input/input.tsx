import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"

interface InputOptions {
  /**
   * The native HTML `size` attribute to be passed to the `input`
   */
  htmlSize?: number
  /**
   * If `true`, the input will be unstyled
   */
  unstyled?: boolean
}

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface InputProps
  extends Omit<HTMLChakraProps<"input">, Omitted>,
    InputOptions,
    SystemRecipeProps<"Input">,
    FieldOptions {}

/**
 * Input
 *
 * Element that allows users enter single valued data.
 *
 * @see Docs https://chakra-ui.com/docs/components/input
 */
export const Input = forwardRef<InputProps, "input">(
  function Input(props, ref) {
    const { htmlSize, unstyled, ...restProps } = props

    const recipe = useRecipe("Input")
    const [variantProps, localProps] = recipe.splitVariantProps(restProps)
    const styles = recipe(variantProps)

    const [fieldProps, elementProps] = splitFieldProps(localProps)
    const inputProps = useField<HTMLInputElement>(fieldProps)

    return (
      <chakra.input
        size={htmlSize}
        {...elementProps}
        {...inputProps}
        css={[!unstyled ? styles : { bg: "inherit" }, props.css]}
        ref={ref}
        className={cx("chakra-input", props.className)}
      />
    )
  },
)

Input.displayName = "Input"
