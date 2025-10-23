"use client"

import { Box, Stack, Tour, useTour } from "@chakra-ui/react"
import { useEffect } from "react"

export const TourExplorer = () => {
  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Welcome to the Tour",
      description: "Explore how each component part renders.",
      actions: [{ label: "Start Tour", action: "next" as const }],
    },
    {
      id: "step-2",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#explorer-target-1"),
      title: "Backdrop & Spotlight",
      description:
        "The backdrop dims the page, while the spotlight highlights the target.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#explorer-target-2"),
      title: "Content & Arrow",
      description:
        "The content shows the step details, arrow points to the target.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "step-4",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#explorer-target-3"),
      title: "Controls & Actions",
      description: "Progress text and action triggers navigate the tour.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  useEffect(() => {
    tour.start()
  }, [tour])

  return (
    <Box>
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
        <Box id="explorer-target-1" p={6} borderWidth="1px" borderRadius="md">
          <strong>Backdrop & Spotlight</strong>
          <p>Dim and highlight effect</p>
        </Box>
        <Box id="explorer-target-2" p={6} borderWidth="1px" borderRadius="md">
          <strong>Content & Arrow</strong>
          <p>Tooltip content with arrow pointing</p>
        </Box>
        <Box id="explorer-target-3" p={6} borderWidth="1px" borderRadius="md">
          <strong>Controls & Actions</strong>
          <p>Navigation and progress display</p>
        </Box>
      </Stack>
    </Box>
  )
}
