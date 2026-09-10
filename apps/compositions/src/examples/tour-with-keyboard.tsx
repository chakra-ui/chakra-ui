"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourWithKeyboard = () => {
  const tour = useTour({ steps, keyboardNavigation: true })

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
      { label: "Prev", action: "prev" },
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
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
