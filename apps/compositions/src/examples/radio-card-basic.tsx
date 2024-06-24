import { HStack, Stack, Text } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

const items = [
  {
    value: "next",
    title: "Next.js",
    description: "Best for apps",
  },
  {
    value: "vite",
    title: "Vite",
    description: "Best for SPAs",
  },
  {
    value: "astro",
    title: "Astro",
    description: "Best for static sites",
  },
]

export const RadioCardBasic = () => {
  return (
    <RadioCardRoot width="full" defaultValue="next">
      <RadioCardLabel>Select framework</RadioCardLabel>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <RadioCardItem key={item.value} value={item.value} flex="1">
            <Stack gap="0" flex="1">
              <RadioCardLabel as="div">{item.title}</RadioCardLabel>
              <Text color="fg.muted">{item.description}</Text>
            </Stack>
          </RadioCardItem>
        ))}
      </HStack>
    </RadioCardRoot>
  )
}
