import { createChakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import { ErrorText, Field, HelpText, Label } from "./Field"
import { ControlProps, useField } from "./Field.base"

export default {
  title: "FormControl",
}

type OmittedTypes = "disabled" | "required" | "readOnly"
type BaseInputProps = Omit<PropsOf<"input">, OmittedTypes> & ControlProps

const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const inputProps = useField<HTMLInputElement>(props)
    return <input ref={ref} {...inputProps} />
  },
)

const Input = createChakra<
  typeof BaseInput,
  { focusBorderColor?: string; errorBorderColor?: string }
>(BaseInput)

type BaseTextAreaProps = Omit<PropsOf<"textarea">, OmittedTypes> & ControlProps

const BaseTextarea = React.forwardRef<HTMLTextAreaElement, BaseTextAreaProps>(
  (props, ref) => {
    const inputProps = useField<HTMLTextAreaElement>(props)
    return <textarea ref={ref} {...inputProps} />
  },
)

const Textarea = createChakra(BaseTextarea)

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
