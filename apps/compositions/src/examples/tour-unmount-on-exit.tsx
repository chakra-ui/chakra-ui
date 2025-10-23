"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"
import { useState } from "react"

export const TourUnmountOnExit = () => {
  const [unmountOnExit, setUnmountOnExit] = useState(false)

  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Unmount on Exit",
      description:
        "Use unmountOnExit to remove DOM elements when the tour closes.",
      actions: [{ label: "Close", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <HStack gap={4} mb={4}>
        <Button onClick={() => tour.start()}>Start Tour</Button>
        <Button
          onClick={() => setUnmountOnExit(!unmountOnExit)}
          variant={unmountOnExit ? "solid" : "outline"}
        >
          Unmount on Exit: {unmountOnExit ? "ON" : "OFF"}
        </Button>
      </HStack>

      <Tour.Root tour={tour} unmountOnExit={unmountOnExit}>
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
          When enabled, tour DOM is removed when tour closes.
        </Box>
      </Stack>
    </Box>
  )
}
