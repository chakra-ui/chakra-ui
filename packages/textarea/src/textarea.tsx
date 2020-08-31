import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  PropsOf,
  forwardRef,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import * as React from "react"
import { __DEV__, cx, omit } from "@chakra-ui/utils"

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
   * If `true`, the textarea element will span the full width of it's parent
   */
  isFullWidth?: boolean
}

export interface TextareaProps
  extends Omit<
      PropsOf<typeof chakra.textarea>,
      "disabled" | "required" | "readOnly"
    >,
    TextareaOptions,
    FormControlOptions,
    ThemingProps {}

/**
 * Textarea is used to enter an amount of text that's longer than a single line
 * @see Docs https://chakra-ui.com/components/textarea
 */
export const Textarea = forwardRef<TextareaProps, "textarea">(function Textarea(
  props,
  ref,
) {
  const styles = useStyleConfig("Textarea", props)
  const { className, rows, ...otherProps } = omitThemingProps(props)

  const textareaProps = useFormControl<HTMLTextAreaElement>(otherProps)

  const omitted = [
    "h",
    "minH",
    "height",
    "minHeight",
  ] as (keyof SystemStyleObject)[]

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

if (__DEV__) {
  Textarea.displayName = "Textarea"
}
