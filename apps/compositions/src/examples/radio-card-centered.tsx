import { HStack, Icon } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuClock, LuDollarSign, LuTrendingUp } from "react-icons/lu"

export const RadioCardCentered = () => {
  return (
    <RadioCardRoot orientation="vertical" align="center" defaultValue="next">
      <RadioCardLabel>Select contract type</RadioCardLabel>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCardItem
            icon={
              <Icon fontSize="2xl" color="fg.muted" mb="2">
                {item.icon}
              </Icon>
            }
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
