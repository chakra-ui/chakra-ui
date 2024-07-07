"use client"

import { Editable, Label, VStack } from "@chakra-ui/react"

export const EditableWithDoubleClick = () => (
  <VStack alignItems="start">
    <Label>With Double Click</Label>
    <Editable.Root
      textAlign="start"
      defaultValue="Double click to edit"
      fontSize="xl"
      activationMode="dblclick"
    >
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  </VStack>
)
