import * as React from "react"
import { Form, FormControlOptions, useFormControl } from "."
import { PropsOf, chakra, useMultiStyleConfig } from "../system"

export default {
  title: "Components / Forms / FormControl",
  decorators: [
    (story: Function) => (
      <chakra.div mx="auto" mt="40px" maxW="400px">
        {story()}
      </chakra.div>
    ),
  ],
}

/* -----------------------------------------------------------------------------
 * Setup
 * -----------------------------------------------------------------------------*/

type OmittedTypes = "disabled" | "required" | "readOnly" | "size"

type InputProps = Omit<PropsOf<"input">, OmittedTypes> &
  FormControlOptions & {
    // Input component as `size` by default, so it resolves to `never`
    // Omitted it from types in Line 16 and added back here.
    size?: string
  }

// Create an input that consumes useFormControl
interface Props {
  focusBorderColor?: string
  errorBorderColor?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps & Props>(
  function Input(props, ref) {
    const styles = useMultiStyleConfig("Input", props)
    const inputProps = useFormControl<HTMLInputElement>(props)
    return <chakra.input ref={ref} __css={styles.field} {...inputProps} />
  },
)

// ------------------

type TextAreaProps = Omit<PropsOf<"textarea">, OmittedTypes> &
  FormControlOptions

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function Textarea(props, ref) {
    const styles = useMultiStyleConfig("Textarea", props)
    const inputProps = useFormControl<HTMLTextAreaElement>(props)
    return <chakra.textarea ref={ref} __css={styles} {...inputProps} />
  },
)

// ------------------

type SelectProps = Omit<PropsOf<"select">, OmittedTypes> & FormControlOptions

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const styles = useMultiStyleConfig("Select", props)
    const inputProps = useFormControl<HTMLSelectElement>(props)
    return <chakra.select ref={ref} __css={styles.field} {...inputProps} />
  },
)

/* -----------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------*/

export const WithInput = () => (
  <Form.Control id="first-name" isRequired isInvalid>
    <Form.Label>First name</Form.Label>
    <Input placeholder="First Name" />
    <Form.HelperText>Keep it very short and sweet!</Form.HelperText>
    <Form.ErrorMessage>Your First name is invalid</Form.ErrorMessage>
  </Form.Control>
)

export const WithTextarea = () => (
  <Form.Control id="first-name" isInvalid>
    <Form.Label>First name</Form.Label>
    <Textarea placeholder="First Name" />
    <Form.HelperText>Keep it very short and sweet!</Form.HelperText>
    <Form.ErrorMessage>
      <Form.ErrorIcon />
      Your First name is invalid
    </Form.ErrorMessage>
  </Form.Control>
)

export const WithSelect = () => (
  <Form.Control id="first-name" isInvalid>
    <Form.Label>First name</Form.Label>
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
    <Form.HelperText>Keep it very short and sweet!</Form.HelperText>
    <Form.ErrorMessage>
      <Form.ErrorIcon />
      Your First name is invalid
    </Form.ErrorMessage>
  </Form.Control>
)

export const WithFocusStyle = () => (
  <Form.Control id="first-name">
    <Form.Label _focus={{ color: "blue.600" }}>First name</Form.Label>
    <Input placeholder="First Name" width="100%" />
    <Form.ErrorMessage>Your First name is invalid</Form.ErrorMessage>
  </Form.Control>
)

export const WithLabel = () => (
  <Form.Label fontWeight="bold" color="blue">
    Not wrapped by FormControl
  </Form.Label>
)
