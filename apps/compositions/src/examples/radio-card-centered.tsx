import { HStack } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuClock, LuDollarSign, LuTrendingUp } from "react-icons/lu"

export const RadioCardCentered = () => {
  return (
    <RadioCardRoot width="full" defaultValue="next">
      <RadioCardLabel>Select contract type</RadioCardLabel>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <RadioCardItem
            vertical
            align="center"
            icon={item.icon}
            label={item.title}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCardRoot>
  )
}

const items = [
  { icon: <LuDollarSign />, value: "fixed", title: "Fixed Rate" },
  { icon: <LuTrendingUp />, value: "milestone", title: "Milestone" },
  { icon: <LuClock />, value: "hourly", title: "Hourly" },
]
