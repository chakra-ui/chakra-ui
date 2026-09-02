import { Field, HStack, Input, NativeSelect } from "@chakra-ui/react"

export const FieldWithTargetControl = () => {
  return (
    <Field.Root target="amount" maxW="sm">
      <Field.Label>Price</Field.Label>
      <HStack gap="2">
        <Field.Item value="currency">
          <NativeSelect.Root width="150px">
            <NativeSelect.Field aria-label="Currency" defaultValue="USD">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Item>
        <Field.Item value="amount">
          <Input type="number" placeholder="0.00" />
        </Field.Item>
      </HStack>
    </Field.Root>
  )
}
