"use client"

import { Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"
import { LuRefreshCw, LuSettings, LuSparkles, LuZap } from "react-icons/lu"

export const TourWithImmediate = () => {
  const syncRef = useRef<HTMLButtonElement | null>(null)
  const refreshRef = useRef<HTMLButtonElement | null>(null)
  const settingsRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "welcome",
      type: "dialog" as const,
      title: "Immediate Sync Mode",
      description:
        "This tour demonstrates immediate state synchronization without frame delays.",
      actions: [{ label: "Start", action: "next" as const }],
    },
    {
      id: "sync",
      type: "tooltip" as const,
      target: () => syncRef.current,
      title: "Instant Sync",
      description:
        "Changes apply immediately in the current frame without deferring.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "refresh",
      type: "tooltip" as const,
      target: () => refreshRef.current,
      title: "Real-time Updates",
      description:
        "State changes reflect instantly without waiting for the next render cycle.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "settings",
      type: "tooltip" as const,
      target: () => settingsRef.current,
      title: "Performance Mode",
      description:
        "Enable immediate mode for time-critical UI updates and animations.",
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
        <LuSparkles />
        Start Tour
      </Button>

      <HStack gap={3} mt={4}>
        <Button ref={syncRef}>
          <LuZap />
          Sync
        </Button>
        <Button ref={refreshRef} colorPalette="blue">
          <LuRefreshCw />
          Refresh
        </Button>
        <Button ref={settingsRef}>
          <LuSettings />
          Settings
        </Button>
      </HStack>

      <Tour.Root tour={tour} immediate={true}>
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
      </Tour.Root>
    </Box>
  )
}
