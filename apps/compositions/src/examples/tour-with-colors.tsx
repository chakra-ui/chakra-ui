"use client"

import { Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"

export const TourWithColors = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#red-box"),
      title: "Red Feature",
      description: "This is the red feature box with important functionality.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#blue-box"),
      title: "Blue Feature",
      description: "Explore the blue feature box with advanced options.",
      actions: [
        { label: "Previous", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#green-box"),
      title: "Green Feature",
      description: "Complete your tour with the green feature box.",
      actions: [
        { label: "Previous", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Start Tour
      </Button>

      <HStack gap={4} mb={8} p={6}>
        <Box
          id="red-box"
          p={8}
          bg="red.100"
          borderRadius="md"
          borderWidth="2px"
          borderColor="red.500"
        >
          Red Box
        </Box>
        <Box
          id="blue-box"
          p={8}
          bg="blue.100"
          borderRadius="md"
          borderWidth="2px"
          borderColor="blue.500"
        >
          Blue Box
        </Box>
        <Box
          id="green-box"
          p={8}
          bg="green.100"
          borderRadius="md"
          borderWidth="2px"
          borderColor="green.500"
        >
          Green Box
        </Box>
      </HStack>

      <Tour.RootProvider tour={tour} colorPalette="red">
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
