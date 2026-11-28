"use client"

import { Badge, Button, HStack, type TourStep, useTour } from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"
import { LuSparkles } from "react-icons/lu"

export const TourFeatureAnnouncement = () => {
  const tour = useTour({ steps })

  return (
    <HStack gap="3">
      <Button variant="outline" size="sm">
        Inbox
      </Button>
      <Button
        id="announce-ai"
        variant="outline"
        size="sm"
        onClick={() => tour.start()}
      >
        <LuSparkles /> Ask AI
        <Badge size="xs" colorPalette="purple" variant="solid">
          New
        </Badge>
      </Button>
      <Button variant="outline" size="sm">
        Settings
      </Button>

      <Tour tour={tour} />
    </HStack>
  )
}

const steps: TourStep[] = [
  {
    id: "ai",
    type: "tooltip",
    placement: "bottom",
    target: () => document.querySelector<HTMLElement>("#announce-ai"),
    title: "Ask AI is here",
    description:
      "Summarize threads and draft replies from anywhere in the app.",
    actions: [{ label: "Got it", action: "dismiss" }],
  },
]
