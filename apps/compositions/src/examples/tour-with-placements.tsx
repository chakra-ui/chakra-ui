"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { FaBold, FaItalic, FaPlay, FaUnderline } from "react-icons/fa"

export const TourWithPlacements = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
        <FaPlay />
        Begin Tour
      </Button>

      <ActionButtons />

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
            <Tour.Control justifyContent="flex-end" gap="4">
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </VStack>
  )
}

export const ActionButtons = () => {
  return (
    <HStack gap={3}>
      {buttons.map((btn) => (
        <Button key={btn.id} id={btn.id} variant="outline">
          {btn.icon} {btn.label}
        </Button>
      ))}
    </HStack>
  )
}

const buttons = [
  { id: "btn-bold", label: "Upload", icon: <FaBold /> },
  { id: "btn-italic", label: "Save", icon: <FaItalic /> },
  { id: "btn-underline", label: "More", icon: <FaUnderline /> },
]

const steps: TourStep[] = [
  {
    id: "intro",
    type: "dialog",
    title: "Welcome to the Editor!",
    description:
      "This short tour will walk you through the text formatting tools.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "bold",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-bold"),
    placement: "left",
    title: "Bold Tool",
    description: "Click here to make selected text bold.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "italic",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-italic"),
    placement: "bottom",
    title: "Italic Tool",
    description: "Use this to italicize your text.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "underline",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-underline"),
    placement: "right",
    title: "Underline Tool",
    description: "Click to underline text for emphasis.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]
