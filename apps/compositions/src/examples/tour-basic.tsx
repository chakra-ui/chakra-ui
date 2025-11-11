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

export const TourBasic = () => {
  const uploadRef = useRef<HTMLButtonElement | null>(null)
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const moreRef = useRef<HTMLButtonElement | null>(null)

  const steps: TourStep[] = [
    {
      id: "welcome",
      type: "dialog",
      title: "Welcome to your Tour!",
      description: "Let's walk through key actions for your next concert drop.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "upload",
      type: "tooltip",
      target: () => uploadRef.current,
      title: "Upload Setlist",
      description: "Add the setlist you'll perform tonight.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "save",
      type: "tooltip",
      target: () => saveRef.current,
      title: "Save Changes",
      description: "Keep your edits synced for collaborators.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "more",
      type: "tooltip",
      target: () => moreRef.current,
      title: "More Actions",
      description: "Share the drop, schedule publish, and more.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

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
        <Button ref={saveRef} variant="outline" colorPalette="blue">
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
