"use client"

import {
  Box,
  Button,
  HStack,
  IconButton,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useRef } from "react"
import { FaBold, FaItalic, FaPlay, FaUnderline } from "react-icons/fa"

export const TourWithPlacements = () => {
  const boldRef = useRef<HTMLButtonElement | null>(null)
  const italicRef = useRef<HTMLButtonElement | null>(null)
  const underlineRef = useRef<HTMLButtonElement | null>(null)

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
      target: () => boldRef.current,
      placement: "top",
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
      target: () => italicRef.current,
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
      target: () => underlineRef.current,
      placement: "right",
      title: "Underline Tool",
      description: "Click to underline text for emphasis.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box p={6} rounded="2xl" maxW="lg" mx="auto">
      <HStack gap={4} mb={6} justify="center">
        <IconButton
          ref={boldRef}
          aria-label="Bold"
          variant="outline"
          colorScheme="teal"
          size="sm"
        >
          <FaBold />
        </IconButton>

        <IconButton
          ref={italicRef}
          aria-label="Italic"
          variant="outline"
          colorScheme="teal"
          size="sm"
        >
          <FaItalic />
        </IconButton>

        <IconButton
          ref={underlineRef}
          aria-label="Underline"
          variant="outline"
          colorScheme="teal"
          size="sm"
        >
          <FaUnderline />
        </IconButton>
      </HStack>

      <Button onClick={() => tour.start()} colorScheme="teal" w="full">
        <FaPlay />
        Start Tour
      </Button>

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow>
              <Tour.ArrowTip />
            </Tour.Arrow>
            <Tour.CloseTrigger />
            <Tour.Title fontWeight="bold" />
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

export default TourWithPlacements
