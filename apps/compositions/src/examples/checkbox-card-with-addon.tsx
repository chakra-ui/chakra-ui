"use client"

import { Badge, Box, Stack, Text } from "@chakra-ui/react"
import {
  CheckboxCardItem,
  CheckboxCardLabel,
} from "compositions/ui/checkbox-card"

const Addon = () => {
  return (
    <Box>
      Some supporting text
      <Badge ms="2" colorPalette="purple">
        New
      </Badge>
    </Box>
  )
}

export const CheckboxCardWithAddon = () => {
  return (
    <CheckboxCardItem width="300px" colorPalette="purple" addon={<Addon />}>
      <Stack gap="0" flex="1">
        <CheckboxCardLabel>With Addon</CheckboxCardLabel>
        <Text>Some description</Text>
      </Stack>
    </CheckboxCardItem>
  )
}
