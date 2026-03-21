"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

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

      <Tour.Root tour={tour}>
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
    id: "a",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-a"),
    title: "Upload",
    description: "This tour has no backdrop overlay.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "b",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-b"),
    title: "Save",
    description: "The page remains fully interactive.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
