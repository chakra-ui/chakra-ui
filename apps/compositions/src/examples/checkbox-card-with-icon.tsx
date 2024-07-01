import {
  Box,
  CheckboxCard,
  CheckboxGroup,
  Float,
  For,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
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
    <CheckboxGroup>
      <HStack mt="2">
        <For each={items}>
          {(item) => (
            <CheckboxCard.Root
              variant="subtle"
              defaultChecked={item.label === "Guest"}
              flex={1}
            >
              <CheckboxCard.Control>
                <VStack gap="1" flex="1" textAlign="center">
                  <Box mb="2" css={{ "& svg": { fontSize: "2xl" } }}>
                    {item.icon}
                  </Box>
                  <CheckboxCard.Label color="inherit!">
                    {item.label}
                  </CheckboxCard.Label>
                  <Text>{item.description}</Text>
                </VStack>

                <CheckboxCard.HiddenInput />
                <Float placement="top-end" offset="4">
                  <CheckboxCard.Indicator />
                </Float>
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          )}
        </For>
      </HStack>
    </CheckboxGroup>
  )
}
