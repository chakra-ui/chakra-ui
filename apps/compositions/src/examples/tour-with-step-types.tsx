"use client"

import {
  Button,
  HStack,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

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
      { label: "Prev", action: "prev" },
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
