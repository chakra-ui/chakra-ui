import { CheckboxGroup, HStack, Text } from "@chakra-ui/react"
import { CheckboxCard } from "compositions/ui/checkbox-card"

export const CheckboxCardWithGroup = () => {
  return (
    <CheckboxGroup width="full" defaultValue={["next"]}>
      <Text fontWeight="medium" mb="2">
        Select framework(s)
      </Text>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <CheckboxCard
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </CheckboxGroup>
  )
}

const items = [
  { value: "next", title: "Next.js", description: "Best for apps" },
  { value: "vite", title: "Vite", description: "Best for SPAs" },
  { value: "astro", title: "Astro", description: "Best for static sites" },
]
