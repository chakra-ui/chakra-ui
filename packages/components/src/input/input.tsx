import { cx } from "@chakra-ui/utils"
import { FieldOptions, splitFieldProps, useField } from "../field"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../styled-system"

interface InputOptions {
  /**
   * The border color when the input is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the input is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
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

    const recipe = useSlotRecipe("Input")
    const [variantProps, localProps] = recipe.splitVariantProps(restProps)
    const styles = recipe(variantProps)

    const [fieldProps, elementProps] = splitFieldProps(localProps)
    const inputProps = useField<HTMLInputElement>(fieldProps)
    const _className = cx("chakra-input", props.className)

    return (
      <chakra.input
        size={htmlSize}
        {...elementProps}
        {...inputProps}
        css={[!unstyled && styles.field, props.css]}
        ref={ref}
        className={_className}
      />
    )
  },
)

Input.displayName = "Input"

// This is used in `input-group.tsx`
//@ts-ignore
Input.id = "Input"
