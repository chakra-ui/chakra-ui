"use client"

import {
  Button,
  Checkbox,
  HStack,
  Progress,
  Stack,
  Text,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"
import { useState } from "react"

export const TourWithChecklist = () => {
  const [done, setDone] = useState<string[]>([])

  const tour = useTour({
    steps,
    onStatusChange({ status, stepId }) {
      if (status === "dismissed" && stepId) {
        setDone((prev) => (prev.includes(stepId) ? prev : [...prev, stepId]))
      }
    },
  })

  return (
    <Stack gap="5" maxW="md">
      <Stack gap="3" borderWidth="1px" rounded="l3" p="4">
        <Text fontWeight="medium">Get started</Text>
        <Progress.Root size="xs" value={(done.length / steps.length) * 100}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
        {steps.map((step) => (
          <HStack key={step.id} justify="space-between">
            <Checkbox.Root checked={done.includes(step.id)} readOnly>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{step.title}</Checkbox.Label>
            </Checkbox.Root>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => tour.start(step.id)}
            >
              Show me
            </Button>
          </HStack>
        ))}
      </Stack>

      <HStack gap="3">
        <Button id="checklist-invite" size="sm" variant="outline">
          Invite team
        </Button>
        <Button id="checklist-import" size="sm" variant="outline">
          Import data
        </Button>
        <Button id="checklist-billing" size="sm" variant="outline">
          Billing
        </Button>
      </HStack>

      <Tour tour={tour} />
    </Stack>
  )
}

const steps: TourStep[] = [
  {
    id: "invite",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#checklist-invite"),
    title: "Invite your team",
    description: "Add teammates so you can work on projects together.",
    actions: [{ label: "Got it", action: "dismiss" }],
  },
  {
    id: "import",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#checklist-import"),
    title: "Import your data",
    description: "Bring in a CSV or connect a source.",
    actions: [{ label: "Got it", action: "dismiss" }],
  },
  {
    id: "billing",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#checklist-billing"),
    title: "Set up billing",
    description: "Add a payment method before your trial ends.",
    actions: [{ label: "Got it", action: "dismiss" }],
  },
]
