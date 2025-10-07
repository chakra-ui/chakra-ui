"use client"

import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"

export const FieldsetExplorer = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input placeholder="Jane Doe" />
        </Field.Root>

        <Field.Root invalid>
          <Field.Label>Email address</Field.Label>
          <Input type="email" placeholder="me@example.com" />
          <Fieldset.ErrorText>
            Please enter a valid email address
          </Fieldset.ErrorText>
        </Field.Root>

        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field>
              <For each={["United Kingdom", "Canada", "United States"]}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  )
}
