"use client"

import {
  Button,
  HStack,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { Tour } from "compositions/ui/tour"

export const TourBasic = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button size="sm" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <HStack gap="3">
        <Button id="step-upload" variant="outline" size="sm">
          Upload
        </Button>
        <Button id="step-save" variant="outline" size="sm">
          Save
        </Button>
        <Button id="step-share" variant="outline" size="sm">
          Share
        </Button>
      </HStack>

      <Tour tour={tour} />
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome",
    description: "Let's take a quick tour of the main actions.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "upload",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-upload"),
    title: "Upload",
    description: "Use this button to upload your files.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "save",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-save"),
    title: "Save",
    description: "Click here to save your changes.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "share",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-share"),
    title: "Share",
    description: "Share your work with others.",
    actions: [
      { label: "Previous", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
