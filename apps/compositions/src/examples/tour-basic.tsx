"use client"

import { Box, Button, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourBasic = () => {
  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Welcome!",
      description: "Let's take a quick tour of the key features.",
      actions: [{ label: "Start Tour", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#step-1"),
      title: "Step 1",
      description: "This is the first step of our tour.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#step-2"),
      title: "Step 2",
      description: "Here's another important feature to know about.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-4",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#step-3"),
      title: "Step 3",
      description: "This is the final step of the tour.",
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
        Start Tour
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
        <Box id="step-1" p={6} borderWidth="1px" borderRadius="md">
          <strong>Feature 1</strong>
          <p>This is the first feature area.</p>
        </Box>
        <Box id="step-2" p={6} borderWidth="1px" borderRadius="md">
          <strong>Feature 2</strong>
          <p>This is the second feature area.</p>
        </Box>
        <Box id="step-3" p={6} borderWidth="1px" borderRadius="md">
          <strong>Feature 3</strong>
          <p>This is the third feature area.</p>
        </Box>
      </Stack>
    </Box>
  )
}
