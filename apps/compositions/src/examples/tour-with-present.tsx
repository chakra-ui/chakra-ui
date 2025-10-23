"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"
import { useState } from "react"

export const TourWithPresent = () => {
  const [present, setPresent] = useState(false)

  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Present Prop",
      description: "Control tour visibility with the present prop.",
      actions: [],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <HStack gap={4} mb={4}>
        <Button onClick={() => tour.start()}>Start Tour</Button>
        <Button
          onClick={() => setPresent(!present)}
          variant={present ? "solid" : "outline"}
        >
          Present: {present ? "ON" : "OFF"}
        </Button>
      </HStack>

      <Tour.Root tour={tour} present={present}>
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
          Toggle the Present button to show/hide the tour externally.
        </Box>
      </Stack>
    </Box>
  )
}
