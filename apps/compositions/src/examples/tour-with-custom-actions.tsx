"use client"

import {
  Button,
  HStack,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

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

      <Tour tour={tour} />
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
      { label: "Previous", action: "prev" },
      {
        label: "Skip to End",
        action: (actionMap) => actionMap.dismiss(),
      },
      { label: "Done", action: "dismiss" },
    ],
  },
]
