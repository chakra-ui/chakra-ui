"use client"

import { Editable, Label, VStack } from "@chakra-ui/react"

export const EditableBasic = () => (
  <VStack alignItems="start">
    <Label>Basic</Label>
    <Editable.Root
      textAlign="start"
      defaultValue="Click to edit"
      fontSize="xl"
      onSubmit={() => console.log("onSubmit", Math.random())}
    >
      <Editable.Preview />
      <Editable.Input />
    </Editable.Root>
  </VStack>
)
