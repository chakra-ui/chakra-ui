import { Button, Fieldset, Input } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const FieldsetBasic = () => {
  return (
    <Fieldset.Root>
      <Fieldset.Legend>Contact details</Fieldset.Legend>

      <Fieldset.Content>
        <Field label="Name">
          <Input name="name" />
        </Field>

        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>

        <Field label="Country">
          <NativeSelectRoot>
            <NativeSelectField
              name="country"
              items={[
                "United Kingdom (UK)",
                "Canada (CA)",
                "United States (US)",
              ]}
            />
          </NativeSelectRoot>
        </Field>
      </Fieldset.Content>

      <Button type="submit">Submit</Button>
    </Fieldset.Root>
  )
}
