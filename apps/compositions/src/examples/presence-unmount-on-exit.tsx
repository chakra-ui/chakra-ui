"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import { Alert } from "compositions/ui/alert"

export const PresenceUnmountOnExit = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Alert title="Check the DOM to see that the element is removed when not present." />
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        unmountOnExit
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Fade
        </Center>
      </Presence>
    </Stack>
  )
}
