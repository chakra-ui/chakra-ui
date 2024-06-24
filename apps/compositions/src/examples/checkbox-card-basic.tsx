"use client"

import { CheckboxGroup, HStack, Label, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardItem,
  CheckboxCardLabel,
} from "compositions/ui/checkbox-card"

const items = [
  {
    value: "next",
    title: "Next.js",
    description: "Best for apps",
  },
  {
    value: "vite",
    title: "Vite",
    description: "Best for SPAs",
  },
  {
    value: "astro",
    title: "Astro",
    description: "Best for static sites",
  },
]

export const CheckboxCardBasic = () => {
  return (
    <CheckboxGroup
      width="full"
      defaultValue={["next", "vite"]}
      onValueChange={(value) => console.log(value)}
    >
      <Label>Select framework(s)</Label>
      <HStack mt="2" align="stretch" width="full">
        {items.map((item) => (
          <CheckboxCardItem key={item.value} value={item.value} flex="1">
            <Stack gap="0" flex="1">
              <CheckboxCardLabel>{item.title}</CheckboxCardLabel>
              <Text color="fg.muted">{item.description}</Text>
            </Stack>
          </CheckboxCardItem>
        ))}
      </HStack>
    </CheckboxGroup>
  )
}
