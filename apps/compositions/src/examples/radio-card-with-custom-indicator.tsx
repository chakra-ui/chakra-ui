import { HStack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardItemIndicator,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuCheck } from "react-icons/lu"

export const RadioCardWithCustomIndicator = () => {
  return (
    <RadioCardRoot defaultValue="next">
      <RadioCardLabel>Select framework</RadioCardLabel>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCardItem
            label={item.title}
            indicator={
              <RadioCardItemIndicator
                color="fg"
                borderWidth="0"
                checked={<LuCheck />}
              />
            }
            key={item.value}
            value={item.value}
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
