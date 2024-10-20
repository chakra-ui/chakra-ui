import { Fieldset, Input, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const FieldsetWithDisabled = () => {
  return (
    <Fieldset.Root size="lg" disabled>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Field label="Street address">
        <Input name="address" />
      </Field>
      <Field label="Country">
        <NativeSelectRoot>
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
        </NativeSelectRoot>
      </Field>
      <Field label="Delivery notes">
        <Textarea name="notes" />
      </Field>
    </Fieldset.Root>
  )
}
