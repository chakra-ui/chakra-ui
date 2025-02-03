"use client"

import {
  Button,
  ButtonGroup,
  PinInput,
  Stack,
  usePinInput,
} from "@chakra-ui/react"

export const PinInputWithStore = () => {
  const store = usePinInput()
  return (
    <Stack align="flex-start">
      <PinInput.RootProvider value={store}>
        <PinInput.Control display="flex" gap="2">
          {Array.from({ length: 4 }).map((_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.RootProvider>

      <ButtonGroup variant="outline" size="sm">
        <Button onClick={() => store.setValue(["1", "2", "3", "4"])}>
          Set value
        </Button>
        <Button onClick={() => store.clearValue()}>Clear value</Button>
      </ButtonGroup>
    </Stack>
  )
}
