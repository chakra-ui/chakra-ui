import { createChakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import {
  FormErrorMessage,
  FormControl,
  FormHelperText,
  FormLabel,
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
  <FormControl id="first-name" isRequired isInvalid>
    <FormLabel>First name:</FormLabel>
    <Input placeholder="First Name" />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
)

export const TextAreaExample = () => (
  <FormControl id="first-name" isInvalid>
    <FormLabel>First name:</FormLabel>
    <Textarea placeholder="First Name" />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
)

export const Styled = () => (
  <FormControl id="first-name" isInvalid>
    <FormLabel>First name:</FormLabel>
    <Input
      variant="outline"
      variantSize="sm"
      placeholder="First Name"
      width="100%"
      focusBorderColor="red.200"
    />
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
)
