"use client"

import { Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"
import { LuSave, LuSparkles, LuUpload } from "react-icons/lu"
import { MdMoreHoriz } from "react-icons/md"

export const TourWithCloseOnInteractOutside = () => {
  const uploadRef = useRef<HTMLButtonElement | null>(null)
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const moreRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "welcome",
      type: "dialog" as const,
      title: "Close on Outside Click",
      description: "Click outside the tour to close it.",
      actions: [{ label: "Start", action: "next" as const }],
    },
    {
      id: "upload",
      type: "tooltip" as const,
      target: () => uploadRef.current,
      title: "Upload",
      description: "Try clicking outside the tour area.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "save",
      type: "tooltip" as const,
      target: () => saveRef.current,
      title: "Save",
      description: "Clicking outside will dismiss the tour.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "more",
      type: "tooltip" as const,
      target: () => moreRef.current,
      title: "More Actions",
      description: "Click anywhere outside this tooltip to close.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps, closeOnInteractOutside: true })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        <LuSparkles />
        Begin Tour
      </Button>

      <HStack gap={3} mt={4}>
        <Button ref={uploadRef}>
          <LuUpload />
          Upload
        </Button>
        <Button ref={saveRef} colorPalette="blue">
          <LuSave />
          Save
        </Button>
        <Button ref={moreRef}>
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
