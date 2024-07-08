import { Box, For, HStack, Text, VStack } from "@chakra-ui/react"
import {
  CheckboxCardGroup,
  CheckboxCardItem,
  CheckboxCardLabel,
} from "compositions/ui/checkbox-card"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"

export const CheckboxCardWithIcon = () => {
  const items = [
    {
      icon: <HiShieldCheck />,
      label: "Admin",
      description: "Give full access",
    },
    {
      icon: <HiUser />,
      label: "User",
      description: "Give limited access",
    },
    {
      icon: <HiGlobeAlt />,
      label: "Guest",
      description: "Give read-only access",
    },
    {
      icon: <HiLockClosed />,
      label: "Blocked",
      description: "No access",
    },
  ]

  return (
    <CheckboxCardGroup>
      <HStack mt="2">
        <For each={items}>
          {(item) => (
            <CheckboxCardItem
              variant="subtle"
              defaultChecked={item.label === "Guest"}
              flex={1}
            >
              <VStack gap="1" flex="1" textAlign="center">
                <Box mb="2" css={{ "& svg": { fontSize: "2xl" } }}>
                  {item.icon}
                </Box>
                <CheckboxCardLabel color="inherit!">
                  {item.label}
                </CheckboxCardLabel>
                <Text fontSize="xs">{item.description}</Text>
              </VStack>
            </CheckboxCardItem>
          )}
        </For>
      </HStack>
    </CheckboxCardGroup>
  )
}
