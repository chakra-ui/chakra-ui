import { Group, RadioCard } from "@chakra-ui/react"

export const RadioCardComposition = () => {
  return (
    <RadioCard.Root defaultValue="next" gap="4" maxW="sm">
      <RadioCard.Label>How well do you know React?</RadioCard.Label>
      <Group attached orientation="vertical">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value} width="full">
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemIndicator />
              <RadioCard.ItemContent>
                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                <RadioCard.ItemDescription>
                  {item.description}
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </Group>
    </RadioCard.Root>
  )
}

const items = [
  {
    value: "advanced",
    title: "Advanced",
    description: "I love complex things",
  },
  {
    value: "professional",
    title: "Professional",
    description: "I can hack simple things",
  },
  {
    value: "beginner",
    title: "Beginner",
    description: "I don't write code",
  },
]
