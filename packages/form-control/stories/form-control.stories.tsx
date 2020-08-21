import { chakra, PropsOf, useMultiStyleConfig } from "@chakra-ui/system"
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

type InputProps = Omit<PropsOf<"input">, OmittedTypes> &
  FormControlOptions & {
    // Input component as `size` by default so it resolves to `never`
    // Omitted it from types in Line 16 and added back here.
    size?: string
  }

// Create an input that consumes useFormControl
type Props = { focusBorderColor?: string; errorBorderColor?: string }

const Input = React.forwardRef<HTMLInputElement, InputProps & Props>(
  (props, ref) => {
    const styles = useMultiStyleConfig("Input", props)
    const inputProps = useFormControl<HTMLInputElement>(props)
    return <chakra.input ref={ref} __css={styles.field} {...inputProps} />
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

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const styles = useMultiStyleConfig("Textarea", props)
    const inputProps = useFormControl<HTMLTextAreaElement>(props)
    return <chakra.textarea ref={ref} __css={styles} {...inputProps} />
  },
)

export const TextAreaExample: React.FC = () => (
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

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const styles = useMultiStyleConfig("Select", props)
    const inputProps = useFormControl<HTMLSelectElement>(props)
    return <chakra.select ref={ref} __css={styles.field} {...inputProps} />
  },
)

export const SelectExample: React.FC = () => (
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
export const StylingFocus: React.FC = () => (
  <FormControl id="first-name">
    <FormLabel _focus={{ color: "blue.600" }}>First name</FormLabel>
    <Input placeholder="First Name" width="100%" />
    <FormErrorMessage>Your First name is invalid</FormErrorMessage>
  </FormControl>
)
