import { HStack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

export const RadioCardWithAddon = () => {
  return (
    <RadioCardRoot defaultValue="next">
      <RadioCardLabel>Select framework</RadioCardLabel>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCardItem
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
            addon="Some addon text"
          />
        ))}
      </HStack>
    </RadioCardRoot>
  )
}

const items = [
  { value: "next", title: "Next.js", description: "Best for apps" },
  { value: "vite", title: "Vite", description: "Best for SPAs" },
  { value: "astro", title: "Astro", description: "Best for static sites" },
]
