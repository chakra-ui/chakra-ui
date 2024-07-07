"use client"

import { Editable, HStack, Label, VStack } from "@chakra-ui/react"

export const EditableWithTextarea = () => {
  return (
    <VStack alignItems="start">
      <Label>With Textarea</Label>
      <Editable.Root
        defaultValue="Click to edit"
        fontSize="xl"
        textAlign="start"
        submitMode="enter"
        onValueChange={console.log}
      >
        <Editable.Preview />
        <Editable.Textarea />

        <Editable.Control>
          <Editable.EditTrigger>Edit</Editable.EditTrigger>
          <HStack gap={2}>
            <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
            <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
          </HStack>
        </Editable.Control>
      </Editable.Root>
    </VStack>
  )
}
