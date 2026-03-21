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
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourFeatureDiscovery = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        What&apos;s New
      </Button>

      <HStack gap="4" alignItems="stretch">
        <Stack gap="3" flex="1">
          <Box id="feature-ai" p="4" borderWidth="1px" borderRadius="md">
            <HStack mb="1">
              <Text fontWeight="medium">AI Assistant</Text>
              <Badge colorPalette="purple" size="sm">
                New
              </Badge>
            </HStack>
            <Text textStyle="sm" color="fg.muted">
              Get intelligent suggestions as you type with our AI-powered
              assistant.
            </Text>
          </Box>

          <Box id="feature-collab" p="4" borderWidth="1px" borderRadius="md">
            <HStack mb="1">
              <Text fontWeight="medium">Real-time Collaboration</Text>
              <Badge colorPalette="green" size="sm">
                Improved
              </Badge>
            </HStack>
            <Text textStyle="sm" color="fg.muted">
              Work together with your team in real-time with cursor presence and
              live edits.
            </Text>
          </Box>

          <Box id="feature-export" p="4" borderWidth="1px" borderRadius="md">
            <HStack mb="1">
              <Text fontWeight="medium">Export Options</Text>
              <Badge colorPalette="blue" size="sm">
                Updated
              </Badge>
            </HStack>
            <Text textStyle="sm" color="fg.muted">
              Export your work in PDF, Markdown, or HTML with custom templates.
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
    id: "intro",
    type: "floating",
    title: "What's New in v4.0",
    description:
      "We've shipped some exciting updates! Let us walk you through the highlights.",
    actions: [
      { label: "Dismiss", action: "dismiss" },
      { label: "Show me", action: "next" },
    ],
  },
  {
    id: "ai",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#feature-ai"),
    title: "AI Assistant",
    description:
      "Our new AI assistant helps you draft content, fix errors, and brainstorm ideas — all inline.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "collab",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#feature-collab"),
    title: "Better Collaboration",
    description:
      "See who's online, follow their cursors, and resolve comments in real-time.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "export",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#feature-export"),
    title: "New Export Options",
    description:
      "Choose from PDF, Markdown, or HTML. Custom templates are now supported too.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Got it", action: "dismiss" },
    ],
  },
]
