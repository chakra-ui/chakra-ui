"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceScaleFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        present={open}
        animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Scale Fade
        </Center>
      </Presence>
    </Stack>
  )
}
