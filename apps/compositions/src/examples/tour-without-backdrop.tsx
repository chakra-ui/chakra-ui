"use client"

import {
  Button,
  HStack,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourWithoutBackdrop = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-a" variant="outline" size="sm">
          Upload
        </Button>
        <Button id="step-b" variant="outline" size="sm">
          Save
        </Button>
      </HStack>

      <Tour tour={tour} />
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "a",
    type: "tooltip",
    backdrop: false,
    target: () => document.querySelector<HTMLElement>("#step-a"),
    title: "Upload",
    description: "This tour has no backdrop overlay.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "b",
    type: "tooltip",
    backdrop: false,
    target: () => document.querySelector<HTMLElement>("#step-b"),
    title: "Save",
    description: "The page remains fully interactive.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
