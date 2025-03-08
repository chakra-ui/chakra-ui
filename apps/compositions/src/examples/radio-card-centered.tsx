import { HStack, Icon, RadioCard } from "@chakra-ui/react"
import { LuClock, LuDollarSign, LuTrendingUp } from "react-icons/lu"

export const RadioCardCentered = () => {
  return (
    <RadioCard.Root orientation="vertical" align="center" defaultValue="next">
      <RadioCard.Label>Select contract type</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <Icon fontSize="2xl" color="fg.muted" mb="2">
                {item.icon}
              </Icon>
              <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
  )
}

const items = [
  { icon: <LuDollarSign />, value: "fixed", title: "Fixed Rate" },
  { icon: <LuTrendingUp />, value: "milestone", title: "Milestone" },
  { icon: <LuClock />, value: "hourly", title: "Hourly" },
]
