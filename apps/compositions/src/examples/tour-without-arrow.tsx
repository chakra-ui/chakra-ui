"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithoutArrow = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#no-arrow-target"),
      title: "No Arrow",
      description: "This tooltip has the arrow hidden.",
      arrow: false,
      actions: [{ label: "Finish", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Start No-Arrow Tour
      </Button>

      <Tour.RootProvider tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
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
          <Box id="no-arrow-target" p={6} borderWidth="1px" borderRadius="md">
            Hover Target
          </Box>
        </HStack>
      </Stack>
    </Box>
  )
}
