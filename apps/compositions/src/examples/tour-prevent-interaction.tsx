"use client"

import { Button, HStack, Stack, type TourStep, useTour } from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourPreventInteraction = () => {
  const tour = useTour({
    steps,
    preventInteraction: true,
    closeOnInteractOutside: false,
  })

  return (
    <Stack gap="4" align="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>
      <HStack gap="3">
        <Button
          id="locked-delete"
          size="sm"
          colorPalette="red"
          onClick={() => alert("Deleted")}
        >
          Delete project
        </Button>
        <Button id="locked-archive" size="sm" variant="outline">
          Archive
        </Button>
      </HStack>
      <Tour tour={tour} />
    </Stack>
  )
}

const steps: TourStep[] = [
  {
    id: "delete",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#locked-delete"),
    title: "Delete project",
    description:
      "This removes the project for everyone. The button can't be clicked while the tour is open.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "archive",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#locked-archive"),
    title: "Archive instead",
    description: "Archiving hides the project but keeps its history.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
