"use client"

import { Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"
import { LuCalendarPlus, LuShare2, LuTicket, LuVideo } from "react-icons/lu"

export const TourWithVariants = () => {
  const solidRef = useRef<HTMLButtonElement | null>(null)
  const outlineRef = useRef<HTMLButtonElement | null>(null)
  const ghostRef = useRef<HTMLButtonElement | null>(null)
  const subtleRef = useRef<HTMLButtonElement | null>(null)

  const steps = [
    {
      id: "welcome",
      type: "dialog" as const,
      title: "Button Variants",
      description:
        "Discover different action styles: solid, outline, ghost, subtle.",
      actions: [{ label: "Start", action: "next" as const }],
    },
    {
      id: "solid",
      type: "tooltip" as const,
      target: () => solidRef.current,
      title: "Solid Variant",
      description: "Bold and eye-catching—perfect for primary actions.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "outline",
      type: "tooltip" as const,
      target: () => outlineRef.current,
      title: "Outline Variant",
      description: "Clean borders for secondary actions.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "ghost",
      type: "tooltip" as const,
      target: () => ghostRef.current,
      title: "Ghost Variant",
      description: "Minimal style, ideal for tertiary actions.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "subtle",
      type: "tooltip" as const,
      target: () => subtleRef.current,
      title: "Subtle Variant",
      description: "Soft background—gentle on the eyes.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Finish", action: "dismiss" as const },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4}>
        Begin Tour
      </Button>
      <HStack gap={3} flexWrap="wrap" mt={2}>
        <Button ref={solidRef} colorPalette="blue">
          <LuTicket /> Buy Tickets
        </Button>
        <Button ref={outlineRef} colorPalette="green" variant="outline">
          <LuCalendarPlus /> Add to Calendar
        </Button>
        <Button ref={ghostRef} colorPalette="purple" variant="ghost">
          <LuVideo /> Watch Trailer
        </Button>
        <Button ref={subtleRef} colorPalette="orange" variant="subtle">
          <LuShare2 /> Share Event
        </Button>
      </HStack>

      <Tour.Root tour={tour} colorPalette="purple">
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
