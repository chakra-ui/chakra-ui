"use client"

import {
  Button,
  Field,
  Input,
  Stack,
  Textarea,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourFormGuide = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start" maxW="sm">
      <Button size="sm" onClick={() => tour.start()}>
        Start Form Guide
      </Button>

      <Stack gap="4" w="full">
        <Field.Root id="field-name">
          <Field.Label>Name</Field.Label>
          <Input placeholder="Enter your name" />
        </Field.Root>

        <Field.Root id="field-email">
          <Field.Label>Email</Field.Label>
          <Input type="email" placeholder="you@example.com" />
        </Field.Root>

        <Field.Root id="field-bio">
          <Field.Label>Bio</Field.Label>
          <Textarea placeholder="Tell us about yourself" />
        </Field.Root>

        <Button id="field-submit" size="sm">
          Submit
        </Button>
      </Stack>

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.ProgressText />
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
    title: "Complete Your Profile",
    description:
      "We'll guide you through each field to set up your profile. Let's get started.",
    actions: [{ label: "Begin", action: "next" }],
  },
  {
    id: "name",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#field-name"),
    title: "Your Name",
    description:
      "Enter your full name. This will be displayed on your profile and in team mentions.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "email",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#field-email"),
    title: "Email Address",
    description:
      "We'll use this for account recovery and important notifications.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "wait-for-name",
    type: "wait",
    title: "Fill in your name",
    description: "Type your name in the field above to continue.",
    effect: ({ next }) => {
      const input =
        document.querySelector<HTMLInputElement>("#field-name input")
      const handler = () => {
        if (input && input.value.length > 0) next()
      }
      input?.addEventListener("input", handler)
      return () => input?.removeEventListener("input", handler)
    },
  },
  {
    id: "bio",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#field-bio"),
    title: "Bio",
    description:
      "Write a short bio. This is optional but helps your team get to know you.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "submit",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#field-submit"),
    title: "Submit",
    description:
      "Once you've filled in the fields, click Submit to save your profile.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
