"use client"

import { HStack, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardGroup,
  CheckboxCardItem,
  CheckboxCardLabel,
} from "compositions/ui/checkbox-card"

const states = [
  {
    disabled: true,
    label: "Disabled",
    description: "This is a disabled checkbox",
  },
  {
    readOnly: true,
    label: "Readonly",
    description: "This is a readonly checkbox",
  },
] as const

export const CheckboxCardStates = () => {
  return (
    <CheckboxCardGroup>
      <HStack mt="2">
        {states.map(({ label, description, ...states }, index) => (
          <CheckboxCardItem key={index} value={label} {...states} flex="1">
            <Stack gap="0">
              <CheckboxCardLabel>{label}</CheckboxCardLabel>
              <Text>{description}</Text>
            </Stack>
          </CheckboxCardItem>
        ))}
      </HStack>
    </CheckboxCardGroup>
  )
}
