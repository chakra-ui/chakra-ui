"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithoutBackdrop = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#no-backdrop-target"),
      title: "No Backdrop",
      description: "Backdrop is disabled for this step.",
      backdrop: false,
      actions: [{ label: "Finish", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Start No-Backdrop Tour
      </Button>

      <Tour.RootProvider tour={tour}>
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
      </Tour.RootProvider>

      <Stack gap={4} p={6}>
        <HStack>
          <Box
            id="no-backdrop-target"
            p={6}
            borderWidth="1px"
            borderRadius="md"
          >
            Focus Target
          </Box>
        </HStack>
      </Stack>
    </Box>
  )
}
