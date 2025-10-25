"use client"

import { Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"
import { LuSave, LuSparkles, LuUpload } from "react-icons/lu"
import { MdMoreHoriz } from "react-icons/md"

export const TourWithPreventInteraction = () => {
  const uploadRef = useRef<HTMLButtonElement | null>(null)
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const moreRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "welcome",
      type: "dialog" as const,
      title: "Interaction Prevented",
      description:
        "You cannot interact with the page while the tour is active.",
      actions: [{ label: "Start", action: "next" as const }],
    },
    {
      id: "upload",
      type: "tooltip" as const,
      target: () => uploadRef.current,
      title: "Upload",
      description: "Buttons outside the spotlight are disabled.",
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
      description: "Only the highlighted element can be interacted with.",
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
      description: "This prevents accidental interactions during the tour.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps, preventInteraction: true })

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
