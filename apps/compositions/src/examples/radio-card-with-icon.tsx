import { HStack, Icon, Stack, Text } from "@chakra-ui/react"
import {
  RadioCardItem,
  RadioCardItemText,
  RadioCardLabel,
  RadioCardRoot,
} from "compositions/ui/radio-card"
import { LuArrowRight, LuCircleOff, LuLock } from "react-icons/lu"

export const RadioCardWithIcon = () => {
  return (
    <RadioCardRoot width="full" defaultValue="next">
      <RadioCardLabel>Select permission</RadioCardLabel>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <RadioCardItem key={item.value} value={item.value} flex="1">
            <Stack flex="1">
              <Icon asChild color="fg.subtle" fontSize="xl">
                {item.icon}
              </Icon>
              <RadioCardItemText fontWeight="medium" mt="2">
                {item.title}
              </RadioCardItemText>
              <Text color="fg.muted" textStyle="sm">
                {item.description}
              </Text>
            </Stack>
          </RadioCardItem>
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
