"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
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
