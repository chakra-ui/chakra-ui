import { HStack, RadioGroup } from "@chakra-ui/react"

export const RadioBasic = () => {
  return (
    <RadioGroup.Root defaultValue="1">
      <HStack gap="6">
        <RadioGroup.Item value="1">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 1</RadioGroup.ItemText>
        </RadioGroup.Item>

        <RadioGroup.Item value="2">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 2</RadioGroup.ItemText>
        </RadioGroup.Item>

        <RadioGroup.Item value="3">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemIndicator />
          <RadioGroup.ItemText>Option 3</RadioGroup.ItemText>
        </RadioGroup.Item>
      </HStack>
    </RadioGroup.Root>
  )
}
