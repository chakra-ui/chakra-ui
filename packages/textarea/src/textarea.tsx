import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  PropsOf,
  forwardRef,
  useStyleConfig,
  omitThemingProps,
  ThemingProps,
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

type Omitted = "disabled" | "required" | "readOnly"

export type TextareaProps = Omit<PropsOf<typeof chakra.textarea>, Omitted> &
  FormControlOptions &
  ThemingProps

/**
 * Textarea
 *
 * React component used to enter an amount of text that's longer than a single line
 *
 * @see Docs https://chakra-ui.com/components/textarea
 */
export const Textarea = forwardRef<TextareaProps>(function Textarea(
  props,
  ref,
) {
  const styles = useStyleConfig("Textarea", props)
  const { className, rows, ...rest } = omitThemingProps(props)
  const textarea = useFormControl<HTMLTextAreaElement>(rest)
  const _className = cx("chakra-textarea", className)
  const textareaStyles = rows
    ? omit(styles.field as any, ["height", "minHeight"])
    : styles.field

  return (
    <chakra.textarea
      className={_className}
      ref={ref}
      rows={rows}
      {...textarea}
      __css={textareaStyles}
    />
  )
})

if (__DEV__) {
  Textarea.displayName = "Textarea"
}
