"use client"

import {
  Button,
  HStack,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourWithKeyboard = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-one" variant="outline" size="sm">
          One
        </Button>
        <Button id="step-two" variant="outline" size="sm">
          Two
        </Button>
        <Button id="step-three" variant="outline" size="sm">
          Three
        </Button>
      </HStack>

      <Tour tour={tour} />
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "one",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-one"),
    title: "Step One",
    description: "Use the left and right arrow keys to navigate between steps.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "two",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-two"),
    title: "Step Two",
    description: "Press Escape to close the tour at any time.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "three",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-three"),
    title: "Step Three",
    description: "Keyboard navigation makes tours accessible.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
