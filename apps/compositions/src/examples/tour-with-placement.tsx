"use client"

import {
  Button,
  HStack,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourWithPlacement = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-top" variant="outline" size="sm">
          Top
        </Button>
        <Button id="step-bottom" variant="outline" size="sm">
          Bottom
        </Button>
        <Button id="step-right" variant="outline" size="sm">
          Right
        </Button>
      </HStack>

      <Tour tour={tour} />
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "top",
    type: "tooltip",
    placement: "top",
    target: () => document.querySelector<HTMLElement>("#step-top"),
    title: "Top Placement",
    description: "This tooltip appears above the target element.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "bottom",
    type: "tooltip",
    placement: "bottom",
    target: () => document.querySelector<HTMLElement>("#step-bottom"),
    title: "Bottom Placement",
    description: "This tooltip appears below the target element.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "right",
    type: "tooltip",
    placement: "right",
    target: () => document.querySelector<HTMLElement>("#step-right"),
    title: "Right Placement",
    description: "This tooltip appears to the right of the target element.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
