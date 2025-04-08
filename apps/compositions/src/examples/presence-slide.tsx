"use client"

import {
  Button,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"

export const PresenceSlide = () => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4">
      <Button alignSelf="flex-start" onClick={onToggle}>
        Click Me
      </Button>
      <Presence
        position="fixed"
        bottom="0"
        insetX="0"
        present={open}
        animationName={{
          _open: "slide-from-bottom-full",
          _closed: "slide-to-bottom-full",
        }}
        animationDuration="moderate"
      >
        <Center p="10" roundedTop="md" layerStyle="fill.muted">
          Slide
        </Center>
      </Presence>
    </Stack>
  )
}
