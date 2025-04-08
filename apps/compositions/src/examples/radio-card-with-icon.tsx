import { HStack, Icon, RadioCard } from "@chakra-ui/react"
import { LuArrowRight, LuCircleOff, LuLock } from "react-icons/lu"

export const RadioCardWithIcon = () => {
  return (
    <RadioCard.Root defaultValue="next">
      <RadioCard.Label>Select permission</RadioCard.Label>
      <HStack align="stretch">
        {items.map((item) => (
          <RadioCard.Item key={item.value} value={item.value}>
            <RadioCard.ItemHiddenInput />
            <RadioCard.ItemControl>
              <RadioCard.ItemContent>
                <Icon fontSize="2xl" color="fg.muted" mb="2">
                  {item.icon}
                </Icon>
                <RadioCard.ItemText>{item.title}</RadioCard.ItemText>
                <RadioCard.ItemDescription>
                  {item.description}
                </RadioCard.ItemDescription>
              </RadioCard.ItemContent>
              <RadioCard.ItemIndicator />
            </RadioCard.ItemControl>
          </RadioCard.Item>
        ))}
      </HStack>
    </RadioCard.Root>
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
