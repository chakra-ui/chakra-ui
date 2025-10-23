"use client"

import { Badge, Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"
import { LuMaximize2, LuMinimize2, LuMusic } from "react-icons/lu"

export const TourWithSizes = () => {
  const smRef = useRef<HTMLButtonElement | null>(null)
  const mdRef = useRef<HTMLButtonElement | null>(null)
  const lgRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "welcome",
      type: "dialog" as const,
      title: "Tour Sizes",
      description: "See how small, medium, and large tour content looks.",
      actions: [{ label: "Start", action: "next" as const }],
    },
    {
      id: "sm",
      type: "tooltip" as const,
      target: () => smRef.current,
      title: "Small",
      description: "Compact player UI.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "md",
      type: "tooltip" as const,
      target: () => mdRef.current,
      title: "Medium",
      description: "Balance between size and detail.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "lg",
      type: "tooltip" as const,
      target: () => lgRef.current,
      title: "Large",
      description: "Full detail for immersive content experiences like lyrics.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Begin Tour
      </Button>

      <HStack gap={3} flexWrap="wrap" mt={2}>
        <Button ref={smRef} size="sm">
          <LuMinimize2 /> Queue <Badge size="sm">SM</Badge>
        </Button>
        <Button ref={mdRef} size="md">
          <LuMusic /> Playlist <Badge>MD</Badge>
        </Button>
        <Button ref={lgRef} size="lg">
          <LuMaximize2 /> Lyrics <Badge size="lg">LG</Badge>
        </Button>
      </HStack>

      <Tour.RootProvider tour={tour} colorPalette="teal">
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ProgressText />
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.RootProvider>
    </Box>
  )
}
