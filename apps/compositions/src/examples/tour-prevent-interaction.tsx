"use client"

import {
  Button,
  HStack,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"
import { useRef } from "react"
import { LuSave, LuSparkles, LuUpload } from "react-icons/lu"
import { MdMoreHoriz } from "react-icons/md"

export const TourPreventInteraction = () => {
  const uploadRef = useRef<HTMLButtonElement | null>(null)
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const moreRef = useRef<HTMLButtonElement | null>(null)

  const steps: TourStep[] = [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome to your Tour!",
      description: "Click through the buttons below to see their actions.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "upload",
      type: "tooltip",
      target: () => uploadRef.current,
      title: "Upload",
      description: "Click this button to upload your setlist.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "save",
      type: "tooltip",
      target: () => saveRef.current,
      title: "Save",
      description: "Click here to save your edits.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "more",
      type: "tooltip",
      target: () => moreRef.current,
      title: "More",
      description: "Click this for additional options.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({
    steps,
    preventInteraction: true,
    closeOnInteractOutside: false,
  })

  return (
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
        <LuSparkles />
        Begin Tour
      </Button>

      <HStack gap={3}>
        <Button ref={uploadRef} variant="outline">
          <LuUpload />
          Upload
        </Button>
        <Button ref={saveRef} variant="outline" colorScheme="blue">
          <LuSave />
          Save
        </Button>
        <Button ref={moreRef} variant="outline">
          <MdMoreHoriz />
          More
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
