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
        <PinInput.Control>
          <PinInput.Input index={0} />
          <PinInput.Input index={1} />
          <PinInput.Input index={2} />
          <PinInput.Input index={3} />
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
