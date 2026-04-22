"use client"

import {
  Badge,
  Box,
  Button,
  Circle,
  HStack,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Tour,
  type TourStep,
  VStack,
  createToaster,
  useTour,
} from "@chakra-ui/react"
import { LuCheck } from "react-icons/lu"
import { TourOverlay } from "./tour-parts"

const toaster = createToaster({ placement: "top-end", overlap: true })

const focusById = (id: string) => {
  const el = document.querySelector<HTMLElement>(id)
  el?.focus()
}

export const TourOnboarding = () => {
  const tour = useTour({
    steps,
    onStatusChange(details) {
      if (details.status === "dismissed" && details.stepId === "done") {
        toaster.success({ title: "Workspace ready", description: "Let's go." })
      }
    },
  })

  return (
    <VStack
      gap="6"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      bgGradient="to-br"
      gradientFrom="purple.50"
      gradientTo="pink.50"
      _dark={{ gradientFrom: "purple.950", gradientTo: "pink.950" }}
      align="stretch"
      maxW="lg"
    >
      <HStack justify="space-between">
        <HStack gap="2">
          <Circle
            size="6"
            bg="purple.600"
            color="white"
            fontWeight="bold"
            fontSize="xs"
          >
            L
          </Circle>
          <Text fontWeight="semibold">Loop</Text>
        </HStack>
        <Text textStyle="xs" color="fg.muted">
          Step 1 of 5
        </Text>
      </HStack>

      <Box>
        <Heading size="lg">Let's set up your workspace</Heading>
        <Text color="fg.muted" mt="1">
          Four quick steps to invite your team and ship something today.
        </Text>
      </Box>

      <Stack gap="2" p="4" borderRadius="md" bg="bg.panel" borderWidth="1px">
        <ChecklistRow done label="Create your account" />
        <ChecklistRow id="loop-team" label="Invite your team">
          <Input
            id="loop-team-input"
            placeholder="name@team.com"
            size="sm"
            mt="2"
          />
        </ChecklistRow>
        <ChecklistRow id="loop-project" label="Start your first project">
          <Input
            id="loop-project-input"
            placeholder="e.g. Q2 Launch"
            size="sm"
            mt="2"
          />
        </ChecklistRow>
        <ChecklistRow id="loop-templates" label="Explore templates">
          <HStack gap="2" mt="2">
            <Badge variant="outline">Sprint planning</Badge>
            <Badge variant="outline">Roadmap</Badge>
            <Badge variant="outline">Personal todo</Badge>
          </HStack>
        </ChecklistRow>
      </Stack>

      <HStack justify="space-between">
        <Button variant="ghost" size="sm">
          Skip for now
        </Button>
        <Button size="sm" onClick={() => tour.start()}>
          Continue
        </Button>
      </HStack>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </VStack>
  )
}

const ChecklistRow = (props: {
  id?: string
  label: string
  done?: boolean
  children?: React.ReactNode
}) => {
  const { id, label, done, children } = props
  return (
    <Box id={id} p="2" borderRadius="sm">
      <HStack>
        <Circle
          size="5"
          borderWidth="1px"
          bg={done ? "green.500" : "transparent"}
          borderColor={done ? "green.500" : "border"}
          color="white"
        >
          {done && <Icon as={LuCheck} boxSize="3" />}
        </Circle>
        <Text
          fontWeight="medium"
          textDecoration={done ? "line-through" : undefined}
          color={done ? "fg.muted" : undefined}
        >
          {label}
        </Text>
      </HStack>
      {children}
    </Box>
  )
}

const steps: TourStep[] = [
  {
    id: "welcome",
    type: "dialog",
    title: "Welcome to Loop 👋",
    description: "You're 60 seconds from your first project. Let's set you up.",
    actions: [{ label: "Let's go", action: "next" }],
  },
  {
    id: "team",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#loop-team"),
    title: "Invite 2–3 people",
    description:
      "Loop works best with a team. Paste emails — they'll get an invite link.",
    effect: ({ show }) => {
      focusById("#loop-team-input")
      show()
      return () => {}
    },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "project",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#loop-project"),
    title: "Name your first project",
    description:
      "Projects are where work happens. You can rename or archive anytime.",
    effect: ({ show }) => {
      focusById("#loop-project-input")
      show()
      return () => {}
    },
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "templates",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#loop-templates"),
    title: "Start from a template",
    description:
      "Sprint planning, product roadmap, personal todo — pick one or start blank.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "done",
    type: "dialog",
    title: "You're all set 🎉",
    description: "We've saved your progress. Jump in whenever you're ready.",
    actions: [{ label: "Enter Loop", action: "dismiss" }],
  },
]
