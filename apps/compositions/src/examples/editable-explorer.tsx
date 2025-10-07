"use client"

import { Editable, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

export const EditableExplorer = () => {
  return (
    <VStack p="6" maxW="600px" mx="auto" gap="6" align="stretch">
      <Editable.Root defaultValue="Click to edit" defaultEdit>
        <VStack align="stretch" gap="3">
          <Editable.Label>
            <Text fontSize="sm" color="fg.muted">
              Editable Label
            </Text>
          </Editable.Label>

          <Editable.Area>
            <Editable.Preview p="2" minH="40px" />
            <Editable.Input p="2" mt="1" />
          </Editable.Area>

          <Editable.Textarea
            placeholder="Editable textarea"
            minH="80px"
            data-part="textarea"
            border={"1px solid"}
            borderColor="fg.muted"
            p="2"
          />

          <Editable.Control>
            <HStack justify="flex-end" gap="2">
              <Editable.EditTrigger asChild>
                <IconButton size="sm" aria-label="Edit">
                  <LuPencilLine />
                </IconButton>
              </Editable.EditTrigger>
              <Editable.CancelTrigger asChild>
                <IconButton size="sm" aria-label="Cancel">
                  <LuX />
                </IconButton>
              </Editable.CancelTrigger>
              <Editable.SubmitTrigger asChild>
                <IconButton size="sm" aria-label="Submit">
                  <LuCheck />
                </IconButton>
              </Editable.SubmitTrigger>
            </HStack>
          </Editable.Control>
        </VStack>
      </Editable.Root>
    </VStack>
  )
}
