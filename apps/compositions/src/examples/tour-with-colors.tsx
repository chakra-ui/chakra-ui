"use client"

import { Box, Button, HStack, Tour, useTour } from "@chakra-ui/react"
import { useRef } from "react"
import { LuImage, LuMap, LuTicket } from "react-icons/lu"

export const TourWithColors = () => {
  const redRef = useRef<HTMLDivElement | null>(null)
  const blueRef = useRef<HTMLDivElement | null>(null)
  const greenRef = useRef<HTMLDivElement | null>(null)

  const steps = [
    {
      id: "welcome",
      type: "dialog" as const,
      title: "Color Palettes",
      description: "See how tour styling adapts to different color schemes.",
      actions: [{ label: "Start", action: "next" as const }],
    },
    {
      id: "red",
      type: "tooltip" as const,
      target: () => redRef.current,
      title: "Tour Poster",
      description: "Official artwork for the upcoming tour.",
      actions: [{ label: "Next", action: "next" as const }],
    },
    {
      id: "blue",
      type: "tooltip" as const,
      target: () => blueRef.current,
      title: "VIP Access",
      description: "Exclusive backstage and early entry passes.",
      actions: [
        { label: "Back", action: "prev" as const },
        { label: "Next", action: "next" as const },
      ],
    },
    {
      id: "green",
      type: "tooltip" as const,
      target: () => greenRef.current,
      title: "Venue Map",
      description: "Interactive seating chart and venue layout.",
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

      <HStack gap={4} flexWrap="wrap" mt={2}>
        <Box
          ref={redRef}
          p={6}
          bg="red.50"
          borderRadius="lg"
          borderWidth="2px"
          borderColor="red.400"
          cursor="pointer"
          _hover={{ bg: "red.100" }}
          minW="140px"
        >
          <LuImage size={24} />
          <Box mt={2} fontWeight="semibold">
            Tour Poster
          </Box>
        </Box>
        <Box
          ref={blueRef}
          p={6}
          bg="blue.50"
          borderRadius="lg"
          borderWidth="2px"
          borderColor="blue.400"
          cursor="pointer"
          _hover={{ bg: "blue.100" }}
          minW="140px"
        >
          <LuTicket size={24} />
          <Box mt={2} fontWeight="semibold">
            VIP Ticket
          </Box>
        </Box>
        <Box
          ref={greenRef}
          p={6}
          bg="green.50"
          borderRadius="lg"
          borderWidth="2px"
          borderColor="green.400"
          cursor="pointer"
          _hover={{ bg: "green.100" }}
          minW="140px"
        >
          <LuMap size={24} />
          <Box mt={2} fontWeight="semibold">
            Venue Map
          </Box>
        </Box>
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
