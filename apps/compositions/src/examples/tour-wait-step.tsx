"use client"

import { Box, Button, HStack, Stack, Tour, useTour } from "@chakra-ui/react"

export const TourWaitStep = () => {
  const steps = [
    {
      id: "step-1",
      type: "dialog" as const,
      title: "Wait for Interaction",
      description: "Click the target button to continue the tour.",
      actions: [],
    },
    {
      id: "wait-step",
      type: "wait" as const,
      title: "Waiting for your action",
      description: "Click the button to proceed.",
      effect({ next }: { next: () => void }) {
        const btn = document.querySelector<HTMLButtonElement>("#wait-target")
        const handler = () => next()
        if (btn) {
          btn.addEventListener("click", handler)
          return () => btn.removeEventListener("click", handler)
        }
        return () => {}
      },
    },
    {
      id: "step-3",
      type: "tooltip" as const,
      target: () => document.querySelector<HTMLElement>("#wait-target"),
      title: "Nice!",
      description: "You clicked the button. Tour can proceed.",
      actions: [{ label: "Finish", action: "dismiss" as const }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Start Wait Tour
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
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.RootProvider>

      <Stack gap={4} p={6}>
        <HStack>
          <Button id="wait-target" colorPalette="teal">
            Click me to continue
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}
