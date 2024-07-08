import { Box, Float, HStack, Text, VStack } from "@chakra-ui/react"
import {
  CheckboxCardControl,
  CheckboxCardGroup,
  CheckboxCardIndicator,
  CheckboxCardLabel,
  CheckboxCardRoot,
} from "compositions/ui/checkbox-card"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"

export const CheckboxCardWithIcon = () => {
  return (
    <CheckboxCardGroup width="full" defaultValue={["Guest"]}>
      <HStack>
        {items.map((item) => (
          <CheckboxCardRoot variant="subtle" flex="1" key={item.label}>
            <CheckboxCardControl showIndicator={false}>
              <VStack gap="1" flex="1" textAlign="center">
                <Box mb="2" css={{ "& svg": { fontSize: "2xl" } }}>
                  {item.icon}
                </Box>
                <CheckboxCardLabel color="inherit!">
                  {item.label}
                </CheckboxCardLabel>
                <Text fontSize="xs">{item.description}</Text>
              </VStack>
              <Float placement="top-end" offset="4">
                <CheckboxCardIndicator />
              </Float>
            </CheckboxCardControl>
          </CheckboxCardRoot>
        ))}
      </HStack>
    </CheckboxCardGroup>
  )
}

const items = [
  { icon: <HiShieldCheck />, label: "Admin", description: "Give full access" },
  { icon: <HiUser />, label: "User", description: "Give limited access" },
  {
    icon: <HiGlobeAlt />,
    label: "Guest",
    description: "Give read-only access",
  },
  { icon: <HiLockClosed />, label: "Blocked", description: "No access" },
]
