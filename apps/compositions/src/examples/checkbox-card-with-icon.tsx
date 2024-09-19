import { CheckboxGroup, Float, HStack } from "@chakra-ui/react"
import {
  CheckboxCard,
  CheckboxCardIndicator,
} from "compositions/ui/checkbox-card"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"

export const CheckboxCardWithIcon = () => {
  return (
    <CheckboxGroup width="full" defaultValue={["Guest"]}>
      <HStack>
        {items.map((item) => (
          <CheckboxCard
            flex="1"
            align="center"
            key={item.label}
            variant="subtle"
            colorPalette="teal"
            icon={item.icon}
            iconColor="inherit"
            label={item.label}
            description={item.description}
            indicator={
              <Float placement="top-end" offset="4">
                <CheckboxCardIndicator />
              </Float>
            }
          />
        ))}
      </HStack>
    </CheckboxGroup>
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
