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
    <VStack gap="4" alignItems="flex-start">
      <Button onClick={() => tour.start()}>
        <FaPlay />
        Begin Tour
      </Button>

      <HStack gap={3}>
        <Button ref={boldRef} variant="outline">
          <FaBold />
          Bold
        </Button>
        <Button ref={italicRef} variant="outline">
          <FaItalic />
          Italic
        </Button>
        <Button ref={underlineRef} variant="outline">
          <FaUnderline />
          Underline
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
