import { Group } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"

export const RadioCardComposition = () => {
  return (
    <RadioCardRoot defaultValue="next" gap="4" maxW="sm">
      <RadioCardLabel>How well do you know React?</RadioCardLabel>
      <Group attached orientation="vertical">
        {items.map((item) => (
          <RadioCardItem
            width="full"
            indicatorPlacement="start"
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
          />
        ))}
      </Group>
    </RadioCardRoot>
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
