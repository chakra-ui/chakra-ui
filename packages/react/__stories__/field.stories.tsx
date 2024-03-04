import * as React from "react"
import { Field, FieldOptions, useField } from "../src/components/field"
import { chakra, useSlotRecipe } from "../src/styled-system"

export default {
  title: "Forms / Field",
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

type InputProps = Omit<React.ComponentProps<"input">, OmittedTypes> &
  FieldOptions & {
    // Input component as `size` by default, so it resolves to `never`
    // Omitted it from types in Line 16 and added back here.
    size?: string
  }

// Create an input that consumes useField
interface Props {
  focusBorderColor?: string
  errorBorderColor?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps & Props>(
  function Input(props, ref) {
    const recipe = useSlotRecipe("Input")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)
    const inputProps = useField(localProps)
    return <chakra.input ref={ref} css={styles.field} {...inputProps} />
  },
)

// ------------------

type TextAreaProps = Omit<React.ComponentProps<"textarea">, OmittedTypes> &
  FieldOptions

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function Textarea(props, ref) {
    const recipe = useSlotRecipe("Textarea")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)
    const inputProps = useField<HTMLTextAreaElement>(localProps)
    return <chakra.textarea ref={ref} css={styles} {...inputProps} />
  },
)

// ------------------

type SelectProps = Omit<React.ComponentProps<"select">, OmittedTypes> &
  FieldOptions

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const recipe = useSlotRecipe("Select")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)
    const inputProps = useField<HTMLSelectElement>(localProps)
    return <chakra.select ref={ref} css={styles.field} {...inputProps} />
  },
)

/* -----------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------*/

export const WithInput = () => (
  <Field.Root id="first-name" isRequired isInvalid>
    <Field.Label>First name</Field.Label>
    <Input placeholder="First Name" />
    <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
    <Field.ErrorMessage>Your First name is invalid</Field.ErrorMessage>
  </Field.Root>
)

export const WithTextarea = () => (
  <Field.Root id="first-name" isInvalid>
    <Field.Label>First name</Field.Label>
    <Textarea placeholder="First Name" />
    <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
    <Field.ErrorMessage>
      <Field.ErrorIcon />
      Your First name is invalid
    </Field.ErrorMessage>
  </Field.Root>
)

export const WithSelect = () => (
  <Field.Root id="first-name" isInvalid>
    <Field.Label>First name</Field.Label>
    <Select>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
    <Field.HelpText>Keep it very short and sweet!</Field.HelpText>
    <Field.ErrorMessage>
      <Field.ErrorIcon />
      Your First name is invalid
    </Field.ErrorMessage>
  </Field.Root>
)

export const WithFocusStyle = () => (
  <Field.Root id="first-name">
    <Field.Label _focus={{ color: "blue.600" }}>First name</Field.Label>
    <Input placeholder="First Name" width="100%" />
    <Field.ErrorMessage>Your First name is invalid</Field.ErrorMessage>
  </Field.Root>
)

export const WithLabel = () => (
  <Field.Label fontWeight="bold" color="blue">
    Not wrapped by FormControl
  </Field.Label>
)
