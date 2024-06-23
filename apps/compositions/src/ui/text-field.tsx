import {
  ErrorMessage,
  Field,
  HelpText,
  Input,
  type InputProps,
  Label,
  RequiredIndicator,
  splitFieldProps,
} from "@chakra-ui/react"
import { forwardRef } from "react"

export interface TextFieldProps extends InputProps {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  rootProps?: React.ComponentProps<typeof Field>
  asterisk?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const [fieldProps, localProps] = splitFieldProps(props)
    const { label, description, error, asterisk, ...rest } = localProps
    return (
      <Field {...fieldProps}>
        {label && (
          <Label>
            {label} {asterisk && <RequiredIndicator />}
          </Label>
        )}
        <Input ref={ref} {...rest} />
        {description && <HelpText>{description}</HelpText>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Field>
    )
  },
)
