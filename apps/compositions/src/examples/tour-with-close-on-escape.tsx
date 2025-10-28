"use client"

import {
  Box,
  Button,
  HStack,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useRef } from "react"
import { LuSave, LuSparkles, LuUpload } from "react-icons/lu"
import { MdMoreHoriz } from "react-icons/md"

export const TourWithCloseOnEscape = () => {
  const uploadRef = useRef<HTMLButtonElement | null>(null)
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const moreRef = useRef<HTMLButtonElement | null>(null)

  const steps: TourStep[] = [
    {
      id: "welcome",
      type: "dialog",
      title: "Close on Escape",
      description: "Press the Escape key at any time to close the tour.",
      actions: [{ label: "Start", action: "next" }],
    },
    {
      id: "upload",
      type: "tooltip",
      target: () => uploadRef.current,
      title: "Upload",
      description: "Try pressing Escape to dismiss the tour.",
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
      description: "You can close this at any time with Escape.",
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
      description: "Test the Escape key functionality.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps, closeOnEscape: true })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        <LuSparkles />
        Begin Tour
      </Button>

      <HStack gap={3} mt={4}>
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
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ProgressText />
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </Box>
  )
}
