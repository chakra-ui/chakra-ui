"use client"

import { Box, Button, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithLazyMount = () => {
  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Lazy Mount",
      description:
        "Use lazyMount={true} to delay DOM mounting until the tour starts.",
      actions: [{ label: "Close", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Start Tour (Lazy Mount)
      </Button>

      <Tour.Root tour={tour} lazyMount={true}>
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
          Tour elements are only mounted when needed, improving initial load
          time.
        </Box>
      </Stack>
    </Box>
  )
}
