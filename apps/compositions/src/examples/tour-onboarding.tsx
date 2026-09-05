"use client"

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { TourOverlay } from "./tour-parts"

export const TourOnboarding = () => {
  const tour = useTour({ steps })

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxW="xl">
      <Flex
        align="center"
        justify="space-between"
        px="4"
        py="3"
        borderBottomWidth="1px"
      >
        <Text fontWeight="semibold">Acme</Text>
        <Button id="tour-new" size="sm">
          New project
        </Button>
      </Flex>

      <Flex minH="48">
        <Stack id="tour-nav" gap="1" p="3" borderRightWidth="1px" minW="40">
          <Text textStyle="sm" fontWeight="medium">
            Home
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Projects
          </Text>
          <Text textStyle="sm" color="fg.muted">
            Settings
          </Text>
        </Stack>

        <Box flex="1" p="5">
          <Heading size="md">Welcome to Acme</Heading>
          <Text color="fg.muted" mt="1">
            Your projects will show up here.
          </Text>
          <Button
            mt="4"
            size="sm"
            variant="outline"
            onClick={() => tour.start()}
          >
            Take the tour
          </Button>
        </Box>
      </Flex>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Box>
  )
}

const steps: TourStep[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome to Acme 👋",
    description: "A quick tour of the essentials — it takes about 20 seconds.",
    actions: [{ label: "Start", action: "next" }],
  },
  {
    id: "nav",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#tour-nav"),
    title: "Find your way around",
    description: "Jump between home, projects, and settings from the sidebar.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "new",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#tour-new"),
    title: "Create a project",
    description: "Start something new anytime from here.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "done",
    type: "dialog",
    title: "You're all set 🎉",
    description: "That's the tour. Enjoy Acme.",
    actions: [{ label: "Done", action: "dismiss" }],
  },
]
