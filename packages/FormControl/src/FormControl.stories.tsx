import { createChakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import {
  ErrorText,
  Field,
  HelpText,
  Label,
  useField,
  ControlProps,
} from "./FormControl"

export default {
  title: "FormControl",
}

type OmittedTypes = "disabled" | "required" | "readOnly"
type InputProps = Omit<PropsOf<typeof StyledInput>, OmittedTypes> & ControlProps

// Create an input that consumes useField
const StyledInput = createChakra<
  "input",
  { focusBorderColor?: string; errorBorderColor?: string }
>("input", { themeKey: "Input" })

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const inputProps = useField<HTMLInputElement>(props)
  return <StyledInput ref={ref} {...inputProps} />
})

type TextAreaProps = Omit<PropsOf<"textarea">, OmittedTypes> & ControlProps

// Create a textarea that consumes useField
const StyledTextarea = createChakra("textarea")
const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const inputProps = useField<HTMLTextAreaElement>(props)
    return <StyledTextarea ref={ref} {...inputProps} />
  },
)

export const InputExample = () => (
  <Field id="first-name" isRequired isInvalid>
    <Label>First name:</Label>
    <Input placeholder="First Name" />
    <HelpText>Keep it very short and sweet!</HelpText>
    <ErrorText>Your First name is invalid</ErrorText>
  </Field>
)

export const TextAreaExample = () => (
  <Field id="first-name" isInvalid>
    <Label>First name:</Label>
    <br />
    <Textarea placeholder="First Name" />
    <HelpText>Keep it very short and sweet!</HelpText>
    <ErrorText>Your First name is invalid</ErrorText>
  </Field>
)

export const Styled = () => (
  <Field id="first-name" isInvalid>
    <Label>First name:</Label>
    <br />
    <Input
      variant="outline"
      variantSize="sm"
      placeholder="First Name"
      width="100%"
      focusBorderColor="red.200"
    />
    <ErrorText>Your First name is invalid</ErrorText>
  </Field>
)
