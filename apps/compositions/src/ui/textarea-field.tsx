import type { TextareaProps } from "@chakra-ui/react"
import {
  ErrorMessage,
  Field,
  HelpText,
  Label,
  RequiredIndicator,
  Textarea,
  splitFieldProps,
} from "@chakra-ui/react"
import { forwardRef } from "react"

export interface TextareaFieldProps extends TextareaProps {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  rootProps?: React.ComponentProps<typeof Field>
  asterisk?: boolean
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(function TextareaField(props, ref) {
  const [fieldProps, localProps] = splitFieldProps(props)
  const { label, description, error, asterisk, ...rest } = localProps
  return (
    <Field {...fieldProps}>
      {label && (
        <Label>
          {label} {asterisk && <RequiredIndicator />}
        </Label>
      )}
      <Textarea ref={ref} {...rest} />
      {description && <HelpText>{description}</HelpText>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Field>
  )
})
