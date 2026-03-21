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

export const TourWithProgress = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch" maxW="md">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Start Tour
      </Button>

      <Stack gap="3">
        <Box id="step-create" p="3" borderWidth="1px" borderRadius="md">
          <Text fontWeight="medium" textStyle="sm">
            Create Project
          </Text>
          <Text textStyle="xs" color="fg.muted">
            Start a new project from scratch or use a template.
          </Text>
        </Box>
        <Box id="step-invite" p="3" borderWidth="1px" borderRadius="md">
          <Text fontWeight="medium" textStyle="sm">
            Invite Team
          </Text>
          <Text textStyle="xs" color="fg.muted">
            Add collaborators by email to start working together.
          </Text>
        </Box>
        <Box id="step-configure" p="3" borderWidth="1px" borderRadius="md">
          <Text fontWeight="medium" textStyle="sm">
            Configure Integrations
          </Text>
          <Text textStyle="xs" color="fg.muted">
            Connect GitHub, Slack, or Figma to your workspace.
          </Text>
        </Box>
        <Box id="step-deploy" p="3" borderWidth="1px" borderRadius="md">
          <Text fontWeight="medium" textStyle="sm">
            Deploy
          </Text>
          <Text textStyle="xs" color="fg.muted">
            Push your project live with one click.
          </Text>
        </Box>
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
            <HStack justify="space-between" mb="2">
              <Tour.ProgressText />
              <Tour.Context>
                {(api) => (
                  <Text textStyle="xs" color="fg.subtle">
                    {Math.round(api.getProgressPercent())}%
                  </Text>
                )}
              </Tour.Context>
            </HStack>
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
    id: "create",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-create"),
    placement: "right",
    title: "Create a Project",
    description:
      "Start here. Choose a blank project or pick from one of our starter templates.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "invite",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-invite"),
    placement: "right",
    title: "Invite Your Team",
    description:
      "Add team members to collaborate. They'll get an email invite with access to the project.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "configure",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-configure"),
    placement: "right",
    title: "Set Up Integrations",
    description:
      "Connect your favorite tools — GitHub for code, Slack for notifications, Figma for design.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "deploy",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#step-deploy"),
    placement: "right",
    title: "Deploy Your Project",
    description:
      "When you're ready, deploy with a single click. Your project will be live in seconds.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
