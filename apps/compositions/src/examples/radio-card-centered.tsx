import { HStack, Icon, VStack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardItemIndicator,
  RadioCardItemText,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuClock, LuDollarSign, LuTrendingUp } from "react-icons/lu"

const items = [
  {
    icon: <LuDollarSign />,
    value: "fixed",
    title: "Fixed Rate",
  },
  {
    icon: <LuTrendingUp />,
    value: "milestone",
    title: "Milestone",
  },
  {
    icon: <LuClock />,
    value: "hourly",
    title: "Hourly",
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
            <VStack textAlign="center" flex="1">
              <Icon asChild fontSize="2xl" color="fg.subtle">
                {item.icon}
              </Icon>
              <RadioCardItemText fontWeight="medium">
                {item.title}
              </RadioCardItemText>
              <RadioCardItemIndicator />
            </VStack>
          </RadioCardItem>
        ))}
      </HStack>
    </RadioCardRoot>
  )
}
