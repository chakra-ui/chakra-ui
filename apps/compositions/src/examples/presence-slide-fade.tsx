"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceSlideFade = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        present={open}
        animationName={{
          _open: "slide-from-bottom, fade-in",
          _closed: "slide-to-bottom, fade-out",
        }}
        animationDuration="moderate"
      >
        <Center p="10" layerStyle="fill.muted">
          Slide Fade
        </Center>
      </Presence>
    </Stack>
  )
}
