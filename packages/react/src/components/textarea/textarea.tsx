import { cx, omit } from "@chakra-ui/utils"
import { forwardRef } from "react"
import {
  HTMLChakraProps,
  RecipeProps,
  chakra,
  useRecipe,
} from "../../styled-system"
import { FieldOptions, splitFieldProps, useField } from "../field"

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
    RecipeProps<"Textarea"> {}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see Docs https://chakra-ui.com/textarea
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const recipe = useRecipe("Textarea", props.recipe)
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
        css={[textareaStyles, localProps.css]}
      />
    )
  },
)

Textarea.displayName = "Textarea"
