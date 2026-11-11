"use client"

import {
  Button,
  Field,
  Input,
  Stack,
  type TourStep,
  useTour,
  waitForElementValue,
  waitForEvent,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourWaitForAction = () => {
  const tour = useTour({ steps })

  return (
    <Stack gap="4" maxW="sm">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <Field.Root>
        <Field.Label>Workspace name</Field.Label>
        <Input id="workspace-name" placeholder="Type acme" />
      </Field.Root>

      <Button id="create-workspace" variant="outline" alignSelf="flex-start">
        Create workspace
      </Button>

      <Tour tour={tour} />
    </Stack>
  )
}

const steps: TourStep[] = [
  {
    id: "name",
    type: "tooltip",
    target: () => document.querySelector<HTMLInputElement>("#workspace-name"),
    title: "Name your workspace",
    description: 'Type "acme" to continue.',
    effect({ next, show }) {
      show()
      const [promise, cancel] = waitForElementValue(
        () => document.querySelector<HTMLInputElement>("#workspace-name"),
        "acme",
        { timeout: 60_000 },
      )
      promise.then(next)
      return cancel
    },
  },
  {
    id: "create",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#create-workspace"),
    title: "Create it",
    description: "Click the button to finish.",
    effect({ next, show, target }) {
      show()
      const [promise, cancel] = waitForEvent(target, "click")
      promise.then(next)
      return cancel
    },
  },
  {
    id: "done",
    type: "dialog",
    title: "You're all set",
    description: "The tour moved on each time you did the thing it asked for.",
    actions: [{ label: "Done", action: "dismiss" }],
  },
]
