"use client"

import { Box, Button, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithImmediate = () => {
  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Immediate Sync",
      description:
        "Use immediate={true} to sync state changes in the current frame.",
      actions: [{ label: "Close", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Start Tour (Immediate)
      </Button>

      <Tour.Root tour={tour} immediate={true}>
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
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>

      <Stack gap={4} p={6}>
        <Box p={6} borderWidth="1px" borderRadius="md">
          State changes sync immediately without deferring to next frame.
        </Box>
      </Stack>
    </Box>
  )
}
