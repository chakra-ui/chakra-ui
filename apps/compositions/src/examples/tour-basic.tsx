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

export const TourBasic = () => {
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
    title: "Welcome to Your Tour!",
    description:
      "This tour will guide you through the main actions in the UI: uploading files, saving changes, and accessing more options.",
    actions: [{ label: "Start", action: "next" }],
  },
  {
    id: "upload",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-upload"),
    title: "Upload Setlist",
    description:
      "Click the Upload button to add your setlist files to the system.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "save",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#btn-save"),
    title: "Save Changes",
    description:
      "Click Save to store your edits and make sure your changes are not lost.",
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
    description:
      "Click More to access additional options such as sharing, scheduling, and other tools.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Finish", action: "dismiss" },
    ],
  },
]
