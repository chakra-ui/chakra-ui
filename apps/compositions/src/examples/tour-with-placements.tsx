"use client"

import { Box, Button, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"

export const TourWithPlacements = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "center",
      type: "dialog" as const,
      title: "Center",
      description: "Displayed in the center of screen.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "right",
      type: "tooltip" as const,
      target: () => btnRef.current,
      placement: "right" as const,
      title: "Right",
      description: "On the right of target.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "top",
      type: "tooltip" as const,
      target: () => btnRef.current,
      placement: "top" as const,
      title: "Top",
      description: "On the top of target.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button ref={btnRef} onClick={() => tour.start()} mb={4}>
        Begin Tour
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
    </Box>
  )
}
