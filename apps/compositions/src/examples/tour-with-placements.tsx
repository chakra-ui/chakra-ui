"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithPlacements = () => {
  const steps = [
    {
      id: "step-top",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#placement-top"),
      placement: "top-start" as const,
      title: "Top Start",
      description: "Tooltip placed at top-start.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-right",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#placement-right"),
      placement: "right" as const,
      title: "Right",
      description: "Tooltip placed to the right.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-bottom",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#placement-bottom"),
      placement: "bottom-end" as const,
      title: "Bottom End",
      description: "Tooltip placed at bottom-end.",
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
        Start Placement Tour
      </Button>

      <Tour.RootProvider tour={tour}>
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

      <Stack gap={4} p={6}>
        <HStack>
          <Button id="placement-top">Top Start Target</Button>
          <Button id="placement-right">Right Target</Button>
          <Button id="placement-bottom">Bottom End Target</Button>
        </HStack>
      </Stack>
    </Box>
  )
}
