import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import {
  chakra,
  PropsOf,
  forwardRef,
  useStyleConfig,
  omitThemingProps,
} from "@chakra-ui/system"
import * as React from "react"
import { __DEV__, cx } from "@chakra-ui/utils"

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

export type TextareaProps = Omit<
  PropsOf<typeof chakra.textarea>,
  "disabled" | "required" | "readOnly"
> &
  FormControlOptions

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
  const { className, ...htmlProps } = omitThemingProps(props)
  const textarea = useFormControl<HTMLTextAreaElement>(htmlProps)
  const _className = cx("chakra-textarea", className)
  return (
    <chakra.textarea
      className={_className}
      ref={ref}
      {...textarea}
      __css={styles.Textarea}
    />
  )
})

if (__DEV__) {
  Textarea.displayName = "Textarea"
}
