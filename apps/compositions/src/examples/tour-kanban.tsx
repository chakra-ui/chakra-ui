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

export const TourKanban = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Learn the Board
      </Button>

      <HStack gap="3" alignItems="flex-start" overflowX="auto">
        <Column
          id="col-todo"
          title="To Do"
          badge="3"
          cards={["Design homepage", "Write API docs", "Set up CI"]}
        />
        <Column
          id="col-progress"
          title="In Progress"
          badge="2"
          cards={["Auth flow", "Dashboard charts"]}
        />
        <Column
          id="col-review"
          title="Review"
          badge="1"
          cards={["Onboarding tour"]}
        />
        <Column
          id="col-done"
          title="Done"
          badge="4"
          cards={["Project setup", "DB schema", "Landing page", "Logo design"]}
        />
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

interface ColumnProps {
  id: string
  title: string
  badge: string
  cards: string[]
}

const Column = (props: ColumnProps) => {
  const { id, title, badge, cards } = props
  return (
    <Box
      id={id}
      minW="180px"
      p="3"
      borderWidth="1px"
      borderRadius="md"
      bg="bg.muted"
    >
      <HStack mb="3" justify="space-between">
        <Text textStyle="sm" fontWeight="medium">
          {title}
        </Text>
        <Badge size="sm" variant="subtle">
          {badge}
        </Badge>
      </HStack>
      <Stack gap="2">
        {cards.map((card) => (
          <Box key={card} p="2" bg="bg" borderRadius="sm" borderWidth="1px">
            <Text textStyle="xs">{card}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

const steps: TourStep[] = [
  {
    id: "intro",
    type: "dialog",
    title: "Your Project Board",
    description:
      "This Kanban board helps you track tasks through different stages. Let's see how it works.",
    actions: [{ label: "Show me", action: "next" }],
  },
  {
    id: "todo",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#col-todo"),
    placement: "bottom",
    title: "To Do",
    description:
      "New tasks land here. Drag cards to move them to the next stage, or click to edit details.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "progress",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#col-progress"),
    placement: "bottom",
    title: "In Progress",
    description:
      "Tasks you're actively working on. Assign team members and set due dates here.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "review",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#col-review"),
    placement: "bottom",
    title: "Review",
    description:
      "Tasks waiting for feedback or approval. Reviewers get notified automatically.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "done",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#col-done"),
    placement: "bottom",
    title: "Done",
    description:
      "Completed tasks live here. Great for tracking velocity and celebrating progress!",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Got it", action: "dismiss" },
    ],
  },
]
