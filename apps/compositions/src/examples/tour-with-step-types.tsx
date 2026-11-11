"use client"

import {
  Button,
  HStack,
  Text,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourWithStepTypes = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-feature" variant="outline" size="sm">
          Feature
        </Button>
        <Button id="step-continue" variant="outline" size="sm">
          Continue
        </Button>
      </HStack>

      {tour.step?.type === "wait" && (
        <Text textStyle="sm" color="fg.muted">
          Click the "Continue" button to proceed...
        </Text>
      )}

      <Tour tour={tour} />
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "intro",
    type: "dialog",
    title: "Dialog Step",
    description:
      "This is a dialog step. It appears in the center and is not attached to any element.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "tooltip",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-feature"),
    title: "Tooltip Step",
    description:
      "This is a tooltip step. It points to a specific element on the page.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "wait",
    type: "wait",
    title: "Wait Step",
    description: "This step pauses the tour until the user takes an action.",
    effect: ({ next }) => {
      const btn = document.querySelector<HTMLElement>("#step-continue")
      const handler = () => next()
      btn?.addEventListener("click", handler, { once: true })
      return () => btn?.removeEventListener("click", handler)
    },
  },
  {
    id: "floating",
    type: "floating",
    title: "Floating Step",
    description:
      "This is a floating step. It appears in a fixed position without targeting any element.",
    actions: [{ label: "Done", action: "dismiss" }],
  },
]
