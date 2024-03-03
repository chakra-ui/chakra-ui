import { cx, omit } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useRecipe,
} from "../../styled-system"
import { FieldOptions, useField } from "../field"
import { splitFieldProps } from "../field/field-props"

interface TextareaOptions {
  /**
   * The border color when the textarea is focused. Use color keys in `theme.colors`
   * @example
   * focusBorderColor = "blue.500"
   */
  focusBorderColor?: string
  /**
   * The border color when the textarea is invalid. Use color keys in `theme.colors`
   * @example
   * errorBorderColor = "red.500"
   */
  errorBorderColor?: string
}

type Omitted = "disabled" | "required" | "readOnly"

const omitted = ["h", "minH", "height", "minHeight"] as const

export interface TextareaProps
  extends Omit<HTMLChakraProps<"textarea">, Omitted>,
    TextareaOptions,
    FieldOptions,
    SystemRecipeProps<"Textarea"> {}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see Docs https://chakra-ui.com/textarea
 */
export const Textarea = forwardRef<TextareaProps, "textarea">((props, ref) => {
  const recipe = useRecipe("Textarea")

  const [variantProps, localProps] = recipe.splitVariantProps(props)
  const styles = recipe(variantProps)

  const [useFieldProps, elementProps] = splitFieldProps(localProps)
  const fieldProps = useField<HTMLTextAreaElement>(useFieldProps)

  const textareaStyles = localProps.rows ? omit(styles, omitted) : styles

  return (
    <chakra.textarea
      ref={ref}
      {...elementProps}
      {...fieldProps}
      className={cx("chakra-textarea", localProps.className)}
      css={textareaStyles}
    />
  )
})

Textarea.displayName = "Textarea"
