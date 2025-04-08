import {
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Textarea,
} from "@chakra-ui/react"

export const FieldsetWithDisabled = () => {
  return (
    <Fieldset.Root size="lg" disabled>
      <Fieldset.Legend>Shipping details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Street address</Field.Label>
        <Input name="address" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Country</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field name="country">
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
      <Field.Root>
        <Field.Label>Delivery notes</Field.Label>
        <Textarea name="notes" />
      </Field.Root>
    </Fieldset.Root>
  )
}
