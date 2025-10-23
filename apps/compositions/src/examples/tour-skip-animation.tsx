"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"
import { useState } from "react"

export const TourSkipAnimation = () => {
  const [skipAnimation, setSkipAnimation] = useState(false)

  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Skip Animation",
      description:
        "Use skipAnimationOnMount to disable the initial appear animation.",
      actions: [{ label: "Close", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <HStack gap={4} mb={4}>
        <Button onClick={() => tour.start()}>Start Tour</Button>
        <Button
          onClick={() => setSkipAnimation(!skipAnimation)}
          variant={skipAnimation ? "solid" : "outline"}
        >
          Skip Animation: {skipAnimation ? "ON" : "OFF"}
        </Button>
      </HStack>

      <Tour.Root tour={tour} skipAnimationOnMount={skipAnimation}>
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
          Restart the tour to see animation toggled on/off.
        </Box>
      </Stack>
    </Box>
  )
}
