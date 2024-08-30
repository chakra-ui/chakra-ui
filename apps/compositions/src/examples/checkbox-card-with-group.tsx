import { CheckboxGroup, HStack, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"

export const CheckboxCardWithGroup = () => {
  return (
    <CheckboxGroup width="full" defaultValue={["next"]}>
      <Text fontWeight="medium" mb="2">
        Select framework(s)
      </Text>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <CheckboxCardRoot key={item.value} value={item.value} flex="1">
            <CheckboxCardControl>
              <Stack gap="0" flex="1">
                <CheckboxCardLabel>{item.title}</CheckboxCardLabel>
                <Text color="fg.subtle">{item.description}</Text>
              </Stack>
            </CheckboxCardControl>
          </CheckboxCardRoot>
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
