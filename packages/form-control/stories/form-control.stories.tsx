import { chakra, PropsOf } from "@chakra-ui/system"
import * as React from "react"
import {
  FormControlOptions,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  useFormControl,
} from "../src"

export default {
  title: "FormControl",
  decorators: [
    (story: Function) => (
      <chakra.div mx="auto" mt="40px" maxW="400px">
        {story()}
      </chakra.div>
    ),
  ],
}

type OmittedTypes = "disabled" | "required" | "readOnly" | "size"

type InputProps = Omit<PropsOf<typeof StyledInput>, OmittedTypes> &
  FormControlOptions & {
    // Input component as `size` by default so it resolves to `never`
    // Omitted it from types in Line 16 and added back here.
    size?: string
  }

// Create an input that consumes useFormControl
type Props = { focusBorderColor?: string; errorBorderColor?: string }

const StyledInput = chakra<"input", Props>("input", {
  themeKey: "Input",
})

const Input = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const inputProps = useFormControl<HTMLInputElement>(props)
    return <StyledInput ref={ref} {...inputProps} />
  },
)

export const InputExample = () => (
  <FormControl id="first-name" isRequired isInvalid>
    <FormLabel>First name</FormLabel>
    <Input placeholder="First Name" />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
)

type TextAreaProps = Omit<PropsOf<"textarea">, OmittedTypes> &
  FormControlOptions

// Create a textarea that consumes useFormControl
const StyledTextarea = chakra<"textarea", Props>("textarea", {
  baseStyle: {
    paddingY: "8px",
    minHeight: "80px",
    lineHeight: "short",
  },
  themeKey: "Textarea",
})

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLTextAreaElement>(props)
    return <StyledTextarea ref={ref} {...inputProps} />
  },
)

export const TextAreaExample = () => (
  <FormControl id="first-name" isInvalid>
    <FormLabel>First name</FormLabel>
    <Textarea placeholder="First Name" />
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>
      <FormErrorIcon />
      Your First name is invalid
    </FormErrorMessage>
  </FormControl>
)

type SelectProps = Omit<PropsOf<"select">, OmittedTypes> & FormControlOptions

const StyledSelect = chakra<"select", Props>("select", {
  themeKey: "Textarea",
})

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const inputProps = useFormControl<HTMLSelectElement>(props)
    return <StyledSelect ref={ref} {...inputProps} />
  },
)

export const SelectExample = () => (
  <FormControl id="first-name" isInvalid>
    <FormLabel>First name</FormLabel>
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
    <FormHelperText>Keep it very short and sweet!</FormHelperText>
    <FormErrorMessage>
      <FormErrorIcon />
      Your First name is invalid
    </FormErrorMessage>
  </FormControl>
)

/**
 * You can style the label when the input is focused,
 * simply pass the `_focus` pseudo prop
 */
export const StylingFocus = () => (
  <FormControl id="first-name">
    <FormLabel _focus={{ color: "blue.300" }}>First name</FormLabel>
    <Input placeholder="First Name" width="100%" />
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
)
