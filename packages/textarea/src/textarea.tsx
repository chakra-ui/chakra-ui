import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import { omit } from "@chakra-ui/object-utils"

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

const omitted = ["h", "minH", "height", "minHeight"]

export interface TextareaProps
  extends Omit<HTMLChakraProps<"textarea">, Omitted>,
    TextareaOptions,
    FormControlOptions,
    ThemingProps<"Textarea"> {}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see Docs https://chakra-ui.com/textarea
 */
export const Textarea = forwardRef<TextareaProps, "textarea">((props, ref) => {
  const styles = useStyleConfig("Textarea", props)
  const { className, rows, ...rest } = omitThemingProps(props)

  const textareaProps = useFormControl<HTMLTextAreaElement>(rest)

  //@ts-ignore
  const textareaStyles = rows ? omit(styles, omitted) : styles

  return (
    <chakra.textarea
      ref={ref}
      rows={rows}
      {...textareaProps}
      className={cx("chakra-textarea", className)}
      __css={textareaStyles}
    />
  )
})

Textarea.displayName = "Textarea"
