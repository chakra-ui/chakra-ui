"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourControlled = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#controlled-1"),
      title: "Controlled Tour",
      description:
        "This tour is controlled programmatically using the useTour hook.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#controlled-2"),
      title: "Step 2",
      description: "You can control the tour externally with buttons.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#controlled-3"),
      title: "Final Step",
      description: "Use the API to navigate, check progress, and more.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Stack gap={4} mb={6}>
        <HStack>
          <Button onClick={() => tour.start()} colorPalette="blue">
            Start Tour
          </Button>
          <Button onClick={() => tour.next()} disabled={!tour.hasNextStep}>
            Next
          </Button>
          <Button onClick={() => tour.prev()} disabled={!tour.hasPrevStep}>
            Previous
          </Button>
          <Button onClick={() => tour.setStep("step-2")}>Jump to Step 2</Button>
        </HStack>

        <Box p={4} borderWidth="1px" borderRadius="md" bg="bg.muted">
          <strong>Tour State:</strong>
          <p>
            Current Step: {tour.stepIndex + 1} of {tour.totalSteps}
          </p>
          <p>Progress: {tour.getProgressPercent()}%</p>
          <p>Step ID: {tour.step?.id || "None"}</p>
        </Box>
      </Stack>

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
        <Box id="controlled-1" p={6} borderWidth="1px" borderRadius="md">
          <strong>Feature 1</strong>
          <p>First feature to highlight in the tour.</p>
        </Box>
        <Box id="controlled-2" p={6} borderWidth="1px" borderRadius="md">
          <strong>Feature 2</strong>
          <p>Second feature to highlight in the tour.</p>
        </Box>
        <Box id="controlled-3" p={6} borderWidth="1px" borderRadius="md">
          <strong>Feature 3</strong>
          <p>Third feature to highlight in the tour.</p>
        </Box>
      </Stack>
    </Box>
  )
}
