"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourWithCustomActions = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-inbox" variant="outline" size="sm">
          Inbox
        </Button>
        <Button id="step-settings" variant="outline" size="sm">
          Settings
        </Button>
      </HStack>

      <Tour.Root tour={tour}>
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
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "inbox",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-inbox"),
    title: "Inbox",
    description: "This is your inbox. Confirm to continue.",
    actions: [
      {
        label: "Confirm & Continue",
        action: (actionMap) => {
          console.log("User confirmed inbox step")
          actionMap.next()
        },
      },
    ],
  },
  {
    id: "settings",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-settings"),
    title: "Settings",
    description: "Manage your preferences here.",
    actions: [
      { label: "Prev", action: "prev" },
      {
        label: "Skip to End",
        action: (actionMap) => actionMap.dismiss(),
      },
      { label: "Done", action: "dismiss" },
    ],
  },
]
