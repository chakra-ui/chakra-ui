"use client"

import { Box, HStack, Stack, Tour, useTour } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { LuLayers, LuMousePointer, LuSettings } from "react-icons/lu"

export const TourExplorer = () => {
  const backdropRef = useRef<HTMLButtonElement | null>(null)
  const contentRef = useRef<HTMLButtonElement | null>(null)
  const controlsRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Welcome to the Component Explorer",
      description:
        "Learn how each tour component works together to create guided experiences.",
      actions: [{ label: "Start Exploring", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => backdropRef.current,
      title: "Backdrop & Spotlight",
      description:
        "The backdrop dims the page while the spotlight highlights your target element.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => contentRef.current,
      title: "Content & Arrow",
      description:
        "The content displays step information and the arrow points directly to your target.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-4",
      type: "tooltip" as const,
      target: () => controlsRef.current,
      title: "Controls & Actions",
      description:
        "Progress indicators and action buttons help users navigate through your tour.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  useEffect(() => {
    tour.start()
  }, [tour])

  return (
    <Box>
      <Tour.RootProvider tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ProgressText />
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.RootProvider>

      <Stack gap={6} p={6} maxW="600px" mx="auto">
        <HStack gap={3} justify="center">
          <Button ref={backdropRef} variant="outline">
            <LuLayers />
            Backdrop
          </Button>
          <Button ref={contentRef} variant="outline" colorPalette="blue">
            <LuMousePointer />
            Content
          </Button>
          <Button ref={controlsRef} variant="outline" colorPalette="green">
            <LuSettings />
            Controls
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
