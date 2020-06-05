import { FormControlOptions, useFormControl } from "@chakra-ui/form-control"
import { chakra, PropsOf } from "@chakra-ui/system"
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

/**
 * Textarea - Theming
 *
 * To style the textarea component globally, change the styles in
 * `theme.components.Textarea`
 */
const StyledTextarea = chakra<"textarea", TextareaOptions>("textarea", {
  themeKey: "Textarea",
  shouldForwardProp: (prop) =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

type Omitted = "disabled" | "required" | "readOnly"

export type TextareaProps = Omit<PropsOf<typeof StyledTextarea>, Omitted> &
  FormControlOptions

/**
 * Textarea
 *
 * React component used to enter an amount of text that's longer than a single line
 *
 * @see Docs https://chakra-ui.com/components/textarea
 */
export const Textarea = React.forwardRef(
  (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const { className, ...htmlProps } = props
    const fieldProps = useFormControl<HTMLTextAreaElement>(htmlProps)
    const _className = cx("chakra-textarea", className)
    return <StyledTextarea className={_className} ref={ref} {...fieldProps} />
  },
)

if (__DEV__) {
  Textarea.displayName = "Textarea"
}
