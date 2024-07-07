"use client"

import { Box, Editable, Heading, Label, VStack } from "@chakra-ui/react"
import React from "react"

export const EditableControlled = () => {
  const [name, setName] = React.useState("")

  return (
    <VStack alignItems="start">
      <Label>Controlled</Label>
      <Box>
        <Heading>Name State=[{name}]</Heading>
        <Editable.Root
          value={name}
          onValueChange={(changes) => {
            console.log("onChange called with ", changes.value)
            setName(changes.value)
          }}
          placeholder="Click to edit"
        >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
      </Box>
    </VStack>
  )
}
