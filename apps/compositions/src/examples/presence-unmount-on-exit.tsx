"use client"

import {
  Alert,
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceUnmountOnExit = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Alert.Root>
        <Alert.Indicator />
        <Alert.Title>
          Check the DOM to see that the element is removed when not present.
        </Alert.Title>
      </Alert.Root>
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
