"use client"

import { Box, Button, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWithSizes = () => {
  const steps = [
    {
      id: "step-1",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#size-sm"),
      title: "Small Tour Step",
      description: "This is a compact tour step.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#size-md"),
      title: "Medium Tour Step",
      description: "This is a medium-sized tour step with more content.",
      actions: [
        { label: "Previous", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#size-lg"),
      title: "Large Tour Step",
      description:
        "This is a large tour step that can accommodate more detailed information and descriptions.",
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

      <Stack gap={4} mb={8} p={6}>
        <Box id="size-sm" p={4} borderWidth="1px" borderRadius="md">
          First Feature
        </Box>
        <Box id="size-md" p={4} borderWidth="1px" borderRadius="md">
          Second Feature
        </Box>
        <Box id="size-lg" p={4} borderWidth="1px" borderRadius="md">
          Third Feature
        </Box>
      </Stack>

      <Tour.RootProvider tour={tour} colorPalette="teal">
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
