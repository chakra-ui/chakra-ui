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
import { useState } from "react"

export const TourWithCallbacks = () => {
  const [status, setStatus] = useState("idle")
  const [stepInfo, setStepInfo] = useState("")

  const tour = useTour({
    steps,
    onStatusChange: (details) => setStatus(details.status),
    onStepChange: (details) =>
      setStepInfo(`Step ${details.stepIndex + 1} of ${details.totalSteps}`),
  })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-first" variant="outline" size="sm">
          First
        </Button>
        <Button id="step-second" variant="outline" size="sm">
          Second
        </Button>
      </HStack>

      <VStack gap="1" alignItems="flex-start">
        <Text textStyle="sm">
          Status: <b>{status}</b>
        </Text>
        {stepInfo && (
          <Text textStyle="sm">
            Progress: <b>{stepInfo}</b>
          </Text>
        )}
      </VStack>

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
    id: "first",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-first"),
    title: "First Step",
    description: "Check the status text below as you navigate.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "second",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-second"),
    title: "Second Step",
    description: "The callbacks update on every step change.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
