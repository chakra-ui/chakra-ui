import { HStack, RadioGroup } from "@chakra-ui/react"

export const RadioDisabled = () => {
  return (
    <RadioGroup.Root defaultValue="2">
      <HStack gap="6">
        {items.map((item) => (
          <RadioGroup.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </HStack>
    </RadioGroup.Root>
  )
}

const items = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2", disabled: true },
  { label: "Option 3", value: "3" },
]
