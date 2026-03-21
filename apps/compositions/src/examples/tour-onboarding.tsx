"use client"

import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourOnboarding = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Start Onboarding
      </Button>

      <HStack gap="4" alignItems="stretch" minH="300px">
        <Box
          id="app-sidebar"
          w="180px"
          p="4"
          borderWidth="1px"
          borderRadius="md"
          flexShrink={0}
        >
          <Stack gap="2">
            <Text fontWeight="medium" textStyle="sm">
              Navigation
            </Text>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Projects
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Messages
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Settings
            </Button>
          </Stack>
        </Box>

        <Stack gap="4" flex="1">
          <HStack
            id="app-header"
            p="3"
            borderWidth="1px"
            borderRadius="md"
            justify="space-between"
          >
            <Text fontWeight="medium">Dashboard</Text>
            <HStack gap="2">
              <Button id="app-search" variant="outline" size="sm">
                Search
              </Button>
              <Button id="app-notifications" variant="outline" size="sm">
                Notifications
              </Button>
              <Button id="app-profile" variant="outline" size="sm">
                Profile
              </Button>
            </HStack>
          </HStack>

          <Box
            id="app-content"
            p="4"
            borderWidth="1px"
            borderRadius="md"
            flex="1"
          >
            <Text fontWeight="medium" mb="2">
              Welcome back!
            </Text>
            <Text textStyle="sm" color="fg.muted">
              Here&apos;s an overview of your recent activity and quick access
              to your projects.
            </Text>
          </Box>
        </Stack>
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
            <Tour.Control>
              <Tour.ActionTriggers />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour.Root>
    </VStack>
  )
}

const steps: TourStep[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome to Your Workspace",
    description:
      "Let's take a quick tour to help you get familiar with the interface.",
    actions: [
      { label: "Skip", action: "dismiss" },
      { label: "Let's go", action: "next" },
    ],
  },
  {
    id: "sidebar",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#app-sidebar"),
    placement: "right",
    title: "Sidebar Navigation",
    description:
      "Use the sidebar to navigate between different sections of the app. You can access your dashboard, projects, messages, and settings.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "search",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#app-search"),
    title: "Search",
    description:
      "Quickly find projects, messages, or team members using the search.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "notifications",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#app-notifications"),
    title: "Notifications",
    description: "Stay updated with mentions, comments, and project activity.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "content",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#app-content"),
    placement: "top",
    title: "Main Content",
    description:
      "This area shows your dashboard overview. You'll see recent activity, stats, and quick actions here.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Get Started", action: "dismiss" },
    ],
  },
]
