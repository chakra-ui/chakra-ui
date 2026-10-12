"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

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
      { label: "Prev", action: "prev" },
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
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
