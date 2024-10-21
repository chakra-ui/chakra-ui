import { HStack, Icon } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuArrowRight, LuCircleOff, LuLock } from "react-icons/lu"

export const RadioCardWithIcon = () => {
  return (
    <RadioCardRoot defaultValue="next">
      <RadioCardLabel>Select permission</RadioCardLabel>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCardItem
            icon={
              <Icon fontSize="2xl" color="fg.muted" mb="2">
                {item.icon}
              </Icon>
            }
            label={item.title}
            description={item.description}
            key={item.value}
            value={item.value}
          />
        ))}
      </HStack>
    </RadioCardRoot>
  )
}

const items = [
  {
    icon: <LuArrowRight />,
    value: "allow",
    title: "Allow",
    description: "This user can access the system",
  },
  {
    icon: <LuCircleOff />,
    value: "deny",
    title: "Deny",
    description: "This user will be denied access to the system",
  },
  {
    icon: <LuLock />,
    value: "lock",
    title: "Lock",
    description: "This user will be locked out of the system",
  },
]
