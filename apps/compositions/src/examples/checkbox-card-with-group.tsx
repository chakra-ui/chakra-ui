import { CheckboxCard, CheckboxGroup, Flex, Text } from "@chakra-ui/react"

export const CheckboxCardWithGroup = () => {
  return (
    <CheckboxGroup defaultValue={["next"]}>
      <Text textStyle="sm" fontWeight="medium">
        Select framework(s)
      </Text>
      <Flex gap="2">
        {items.map((item) => (
          <CheckboxCard.Root key={item.value} value={item.value}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <CheckboxCard.Label>{item.title}</CheckboxCard.Label>
                <CheckboxCard.Description>
                  {item.description}
                </CheckboxCard.Description>
              </CheckboxCard.Content>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </Flex>
    </CheckboxGroup>
  )
}

const items = [
  { value: "next", title: "Next.js", description: "Best for apps" },
  { value: "vite", title: "Vite", description: "Best for SPAs" },
  { value: "astro", title: "Astro", description: "Best for static sites" },
]
