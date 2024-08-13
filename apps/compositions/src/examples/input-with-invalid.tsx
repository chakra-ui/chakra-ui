import { Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"

export const InputWithInvalid = () => (
  <Field id="first-name" invalid errorText="First name is required">
    <Input placeholder="Enter first name" />
  </Field>
)
