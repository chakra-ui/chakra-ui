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

export const TourConditional = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch" maxW="md">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <Stack gap="3">
        <Box id="option-beginner" p="4" borderWidth="1px" borderRadius="md">
          <Text fontWeight="medium">Beginner</Text>
          <Text textStyle="sm" color="fg.muted">
            New to the platform? Start here for the basics.
          </Text>
        </Box>

        <Box id="option-advanced" p="4" borderWidth="1px" borderRadius="md">
          <Text fontWeight="medium">Advanced</Text>
          <Text textStyle="sm" color="fg.muted">
            Already familiar? Jump to power-user features.
          </Text>
        </Box>

        <HStack gap="3">
          <Box
            id="feature-basics"
            p="3"
            borderWidth="1px"
            borderRadius="md"
            flex="1"
          >
            <Text textStyle="sm" fontWeight="medium">
              Getting Started
            </Text>
            <Text textStyle="xs" color="fg.muted">
              Create your first project and invite your team.
            </Text>
          </Box>
          <Box
            id="feature-power"
            p="3"
            borderWidth="1px"
            borderRadius="md"
            flex="1"
          >
            <Text textStyle="sm" fontWeight="medium">
              Power Features
            </Text>
            <Text textStyle="xs" color="fg.muted">
              Automations, API access, and custom workflows.
            </Text>
          </Box>
        </HStack>
      </Stack>

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
    id: "choose",
    type: "dialog",
    title: "Choose Your Path",
    description:
      "Are you new here or a returning user? Pick your experience level.",
    actions: [
      {
        label: "I'm new",
        action: (actionMap) => actionMap.goto("beginner"),
      },
      {
        label: "I know the basics",
        action: (actionMap) => actionMap.goto("advanced"),
      },
    ],
  },
  {
    id: "beginner",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#option-beginner"),
    title: "Welcome!",
    description:
      "Great choice. We'll start with the fundamentals to get you up and running quickly.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "basics",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#feature-basics"),
    title: "Getting Started Guide",
    description:
      "This section walks you through creating your first project, inviting team members, and basic navigation.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
  {
    id: "advanced",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#option-advanced"),
    title: "Welcome Back!",
    description: "Let's skip the basics and show you what's new and powerful.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "power",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#feature-power"),
    title: "Power Features",
    description:
      "Set up automations, generate API keys, and build custom workflows to supercharge your productivity.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
