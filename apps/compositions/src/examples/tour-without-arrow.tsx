"use client"

import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { LuCalendar, LuMusic, LuSparkles, LuUsers } from "react-icons/lu"

export const TourWithoutArrow = () => {
  const steps: TourStep[] = [
    {
      id: "step-1",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#stage-setup"),
      title: "Stage Setup",
      description:
        "Configure your stage layout, lighting preferences, and sound check requirements for an epic performance.",
      arrow: false,
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "step-2",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#band-members"),
      title: "Band Members",
      description:
        "Invite your bandmates, assign instruments, and coordinate rehearsal schedules all in one place.",
      arrow: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "step-3",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tour-dates"),
      title: "Tour Dates",
      description:
        "Schedule your shows, manage ticket sales, and track your tour revenue across multiple venues.",
      arrow: false,
      actions: [
        { label: "Back", action: "prev" },
        { label: "Finish", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Box>
      <Button onClick={() => tour.start()} mb={4} colorScheme="teal">
        <LuSparkles />
        Begin Tour
      </Button>

      <Tour.Root tour={tour}>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.CloseTrigger />
            <Tour.Title />
            <Tour.Description />
            <Tour.Control>
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>

      <Stack gap={4} p={6}>
        <HStack gap={4}>
          <Box
            id="stage-setup"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            borderColor="border.default"
            bg="bg.subtle"
            flex="1"
          >
            <HStack mb={2}>
              <LuMusic size={24} />
              <Text fontWeight="semibold" fontSize="lg" color="fg.emphasized">
                Stage Setup
              </Text>
            </HStack>
            <Badge colorScheme="purple">Active</Badge>
          </Box>

          {/* Band Members */}
          <Box
            id="band-members"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            borderColor="border.default"
            bg="bg.subtle"
            flex="1"
          >
            <HStack mb={2}>
              <LuUsers size={24} />
              <Text fontWeight="semibold" fontSize="lg" color="fg.emphasized">
                Members
              </Text>
            </HStack>
            <Badge colorScheme="blue">4 Members</Badge>
          </Box>
          <Box
            id="tour-dates"
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            borderColor="border.default"
            bg="bg.subtle"
            flex="1"
          >
            <HStack mb={2}>
              <LuCalendar size={24} />
              <Text fontWeight="semibold" fontSize="lg" color="fg.emphasized">
                Tour Dates
              </Text>
            </HStack>
            <Badge colorScheme="green">12 Shows</Badge>
          </Box>
        </HStack>
      </Stack>
    </Box>
  )
}
