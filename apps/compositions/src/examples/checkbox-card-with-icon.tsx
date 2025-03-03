import {
  CheckboxCard,
  CheckboxGroup,
  Float,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react"
import { HiGlobeAlt, HiLockClosed, HiShieldCheck, HiUser } from "react-icons/hi"

export const CheckboxCardWithIcon = () => {
  return (
    <CheckboxGroup defaultValue={["Guest"]}>
      <SimpleGrid minChildWidth="200px" gap="2">
        {items.map((item) => (
          <CheckboxCard.Root align="center" key={item.label}>
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Content>
                <Icon fontSize="2xl" mb="2">
                  {item.icon}
                </Icon>
                <CheckboxCard.Label>{item.label}</CheckboxCard.Label>
                <CheckboxCard.Description>
                  {item.description}
                </CheckboxCard.Description>
              </CheckboxCard.Content>
              <Float placement="top-end" offset="6">
                <CheckboxCard.Indicator />
              </Float>
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        ))}
      </SimpleGrid>
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
