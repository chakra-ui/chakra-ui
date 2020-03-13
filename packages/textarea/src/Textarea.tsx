import { ControlProps, useField } from "@chakra-ui/form-control"
import { createChakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"

type OmittedTypes = "disabled" | "required" | "readOnly"

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

const StyledTextarea = createChakra<"textarea", TextareaOptions>("textarea", {
  themeKey: "Textarea",
  shouldForwardProp: prop =>
    !["focusBorderColor", "errorBorderColor"].includes(prop),
})

export type TextareaProps = Omit<PropsOf<typeof StyledTextarea>, OmittedTypes> &
  ControlProps

export const Textarea = React.forwardRef(
  (props: TextareaProps, ref: React.Ref<HTMLTextAreaElement>) => {
    const fieldProps = useField<HTMLTextAreaElement>(props)
    return <StyledTextarea ref={ref} {...fieldProps} />
  },
)

Textarea.displayName = "Input"

Textarea.defaultProps = {
  isFullWidth: true,
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
}
