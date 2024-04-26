import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { HTMLChakraProps, chakra, forwardRef, useStyleConfig } from "../system"
import { cx } from "@chakra-ui/utils/cx"
import { omit } from "@chakra-ui/utils/omit"
import { FormControlOptions, useFormControl } from "../form-control"
import { Text } from "../typography"

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
  /**
   * Whether to show the character counter or not
   */
  showCharacterCounter?: boolean
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
    <chakra.div position={"relative"}>
      <chakra.textarea
        ref={ref}
        rows={rows}
        {...textareaProps}
        className={cx("chakra-textarea", className)}
        __css={textareaStyles}
      />
      {props.showCharacterCounter && (
        <Text
          color="gray.500"
          fontWeight={400}
          position="absolute"
          bottom={3}
          right={3}
        >
          {props.value?.toString().length}
          {props.maxLength && `/${props.maxLength}`}
        </Text>
      )}
    </chakra.div>
  )
})

Textarea.displayName = "Textarea"
