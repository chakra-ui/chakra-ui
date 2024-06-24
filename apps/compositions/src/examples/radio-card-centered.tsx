import { HStack, Icon, Text, VStack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardItemIndicator,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuClock, LuDollarSign, LuTrendingUp } from "react-icons/lu"

const items = [
  {
    icon: <LuDollarSign />,
    value: "fixed",
    title: "Fixed Rate",
    description: "Contracts with a fixed rate",
  },
  {
    icon: <LuTrendingUp />,
    value: "milestone",
    title: "Milestone",
    description: "Contracts with milestone payments",
  },
  {
    icon: <LuClock />,
    value: "hourly",
    title: "Hourly",
    description: "Contracts with hourly rates",
  },
]

export const RadioCardCentered = () => {
  return (
    <RadioCardRoot width="full" defaultValue="next">
      <RadioCardLabel>Select contract type</RadioCardLabel>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <RadioCardItem
            showIndicator={false}
            key={item.value}
            value={item.value}
            flex="1"
            rounded="lg"
          >
            <VStack flex="1">
              <Icon asChild fontSize="2xl" color="fg.subtle" my="2">
                {item.icon}
              </Icon>
              <RadioCardLabel as="div">{item.title}</RadioCardLabel>
              <Text color="fg.muted">{item.description}</Text>
              <RadioCardItemIndicator />
            </VStack>
          </RadioCardItem>
        ))}
      </HStack>
    </RadioCardRoot>
  )
}
