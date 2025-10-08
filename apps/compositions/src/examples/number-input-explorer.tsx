"use client"

import { InputGroup, NumberInput, Text, VStack } from "@chakra-ui/react"
import { LuArrowRightLeft } from "react-icons/lu"

export const NumberInputExplorer = () => {
  return (
    <VStack p="8" maxW="400px" mx="auto" gap="8" align="stretch">
      <VStack gap="1" align="start">
        <Text fontSize="lg" fontWeight="bold">
          Adjust a Number
        </Text>
        <Text fontSize="sm" color="gray.600">
          Try using the arrows, typing directly, or dragging the scrubber to
          change the value.
        </Text>
      </VStack>

      <NumberInput.Root defaultValue="10" min={1} max={100} width="full">
        <VStack align="start" gap="2" w="full">
          <NumberInput.Label fontSize="sm" fontWeight="medium" color="gray.700">
            Quantity
          </NumberInput.Label>

          <InputGroup
            startElementProps={{ pointerEvents: "auto" }}
            startElement={
              <NumberInput.Scrubber cursor="ew-resize">
                <LuArrowRightLeft />
              </NumberInput.Scrubber>
            }
          >
            <>
              <NumberInput.Input pl="10" />
              <NumberInput.Control>
                <NumberInput.IncrementTrigger />
                <NumberInput.DecrementTrigger />
              </NumberInput.Control>
            </>
          </InputGroup>

          <Text fontSize="xs" color="gray.500">
            Enter a number between 1 and 100.
          </Text>
        </VStack>
      </NumberInput.Root>
    </VStack>
  )
}
