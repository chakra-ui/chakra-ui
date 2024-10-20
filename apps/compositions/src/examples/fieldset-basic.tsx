import { Button, Fieldset, Input, Stack } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"

export const FieldsetBasic = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

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

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}
