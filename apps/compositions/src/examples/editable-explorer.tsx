"use client"

import {
  Box,
  Editable,
  HStack,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react"
import { useRef } from "react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

export const EditableExplorer = () => {
  const finalFocusRef = useRef<HTMLInputElement | null>(null)

  return (
    <VStack p="6" maxW="600px" mx="auto" gap="6" align="stretch">
      <Editable.Root defaultValue="Click to edit">
        <VStack align="stretch" gap="3">
          <Box>
            <Editable.Preview
              border="1px solid"
              borderColor="gray.300"
              p="2"
              minH="40px"
              borderRadius="md"
            />
            <Editable.Input
              p="2"
              mt="1"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
            />
          </Box>

          <Box>
            <Editable.Textarea
              placeholder="Editable textarea"
              minH="80px"
              p="2"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
            />
          </Box>

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
        </VStack>
      </Editable.Root>

      <Box>
        <Input
          ref={finalFocusRef}
          placeholder="Final focus input"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          p="2"
        />
      </Box>
    </VStack>
  )
}
