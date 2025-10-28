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

export const TourWithSpotlightOffset = () => {
  const uploadRef = useRef<HTMLButtonElement | null>(null)
  const saveRef = useRef<HTMLButtonElement | null>(null)
  const moreRef = useRef<HTMLButtonElement | null>(null)

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
      target: () => uploadRef.current,
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
      target: () => saveRef.current,
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
      target: () => moreRef.current,
      title: "More Actions",
      description: "Offset helps highlight multiple elements clearly.",
      offset: { mainAxis: 16, crossAxis: 16 },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

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
