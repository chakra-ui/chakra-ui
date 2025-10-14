"use client"

import { PinInput, VStack } from "@chakra-ui/react"

export const PinInputExplorer = () => {
  return (
    <PinInput.Root otp>
      <VStack alignItems="start">
        <PinInput.Label>Enter 4-digit code</PinInput.Label>
        <PinInput.HiddenInput />
        <PinInput.Control>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
          <PinInput.Input index={3} />
        </PinInput.Control>
      </VStack>
    </PinInput.Root>
  )
}
