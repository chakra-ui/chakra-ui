"use client"

import {
  Alert,
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceLazyMount = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Alert.Root>
        <Alert.Indicator />
        <Alert.Title>
          Check the DOM to see that the element not mounted initially
        </Alert.Title>
      </Alert.Root>
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        lazyMount
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
