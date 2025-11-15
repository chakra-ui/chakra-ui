"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { LuSave, LuSparkles, LuUpload } from "react-icons/lu"
import { MdMoreHoriz } from "react-icons/md"

export const TourSpotlightOffset = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
        <LuSparkles />
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
        <Button
          key={btn.id}
          id={btn.id}
          variant="outline"
          colorScheme={btn.colorScheme}
        >
          {btn.icon} {btn.label}
        </Button>
      ))}
    </HStack>
  )
}

const buttons = [
  { id: "btn-upload", label: "Upload", icon: <LuUpload /> },
  { id: "btn-save", label: "Save", icon: <LuSave />, colorScheme: "blue" },
  { id: "btn-more", label: "More", icon: <MdMoreHoriz /> },
]

const steps: TourStep[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Spotlight Offset",
    description: "The spotlight has a custom offset around the target.",
    actions: [{ label: "Start", action: "next" }],
  },
  {
    id: "upload",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-upload"),
    title: "Upload",
    description: "Extra padding around the spotlight gives breathing room.",
    offset: { mainAxis: 8, crossAxis: 8 },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "save",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-save"),
    title: "Save",
    description: "Different steps can have different offsets.",
    offset: { mainAxis: 12, crossAxis: 12 },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "more",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-more"),
    title: "More Actions",
    description: "Offset helps highlight multiple elements clearly.",
    offset: { mainAxis: 20, crossAxis: 90 },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]
