"use client"

import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuCalendar, LuMessageSquare } from "react-icons/lu"
import { TourOverlay } from "./tour-parts"
import { TourAppShell } from "./tour-shell"

type Card = {
  id: string
  title: string
  label: string
  labelPalette: string
  assignees: string[]
  due: string
  comments: number
}

const initialColumns: { id: string; name: string; cards: Card[] }[] = [
  {
    id: "backlog",
    name: "Backlog",
    cards: [
      {
        id: "K-1",
        title: "Audit onboarding copy",
        label: "Design",
        labelPalette: "purple",
        assignees: ["Ana Lima", "Dev Patel"],
        due: "Apr 24",
        comments: 3,
      },
      {
        id: "K-2",
        title: "Revise pricing tiers",
        label: "Product",
        labelPalette: "blue",
        assignees: ["Mei Chen"],
        due: "Apr 25",
        comments: 1,
      },
      {
        id: "K-3",
        title: "Instrument sign-up funnel",
        label: "Eng",
        labelPalette: "orange",
        assignees: ["Jon West"],
        due: "Apr 26",
        comments: 4,
      },
      {
        id: "K-4",
        title: "Write Q2 changelog",
        label: "Docs",
        labelPalette: "green",
        assignees: ["Ana Lima"],
        due: "Apr 28",
        comments: 0,
      },
    ],
  },
  {
    id: "progress",
    name: "In Progress",
    cards: [
      {
        id: "K-5",
        title: "Migrate billing to Stripe Tax",
        label: "Eng",
        labelPalette: "orange",
        assignees: ["Dev Patel", "Jon West"],
        due: "Apr 23",
        comments: 7,
      },
      {
        id: "K-6",
        title: "Q2 launch landing page",
        label: "Design",
        labelPalette: "purple",
        assignees: ["Mei Chen"],
        due: "Apr 22",
        comments: 2,
      },
      {
        id: "K-7",
        title: "Draft customer case study",
        label: "Marketing",
        labelPalette: "pink",
        assignees: ["Ana Lima"],
        due: "Apr 24",
        comments: 1,
      },
    ],
  },
  {
    id: "done",
    name: "Done",
    cards: [
      {
        id: "K-8",
        title: "Sunset legacy invites flow",
        label: "Eng",
        labelPalette: "orange",
        assignees: ["Jon West"],
        due: "Apr 18",
        comments: 5,
      },
      {
        id: "K-9",
        title: "Ship theme switcher",
        label: "Design",
        labelPalette: "purple",
        assignees: ["Mei Chen"],
        due: "Apr 17",
        comments: 3,
      },
    ],
  },
]

export const TourKanban = () => {
  const [movedCardId, setMovedCardId] = useState<string | null>(null)

  const columns = initialColumns.map((col) => {
    if (!movedCardId) return col
    if (col.id === "backlog") {
      return { ...col, cards: col.cards.filter((c) => c.id !== movedCardId) }
    }
    if (col.id === "progress") {
      const moved = initialColumns[0].cards.find((c) => c.id === movedCardId)
      return moved ? { ...col, cards: [moved, ...col.cards] } : col
    }
    return col
  })

  const steps: TourStep[] = [
    {
      id: "filters",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tempo-filters"),
      title: "Slice the board your way",
      description:
        "Filter by assignee, label, or sprint. Your view, not the team's.",
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "card-hero",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tempo-card-hero"),
      title: "Cards hold everything",
      description:
        "Description, subtasks, attachments, activity — all in one place.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "move",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tempo-col-progress"),
      title: "Drag to update status ✨",
      description:
        "Move cards across columns — Tempo notifies assignees automatically.",
      effect: ({ show }) => {
        setMovedCardId("K-1")
        show()
        return () => setMovedCardId(null)
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "assignee",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tempo-assignee"),
      title: "Tag anyone with @",
      description:
        "Start typing a name to assign or mention. Works in comments too.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "due",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#tempo-due"),
      title: "Due dates that nudge",
      description: "We'll remind assignees 24h before, and escalate after.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "done",
      type: "dialog",
      title: "Make it yours",
      description:
        "Boards, columns, labels, and automations are all customizable. Have fun.",
      actions: [{ label: "Done", action: "dismiss" }],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Stack gap="3">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Tour Tempo
      </Button>

      <TourAppShell
        logo={<Text fontWeight="bold">Tempo</Text>}
        actions={
          <AvatarGroup size="xs">
            <Avatar.Root>
              <Avatar.Fallback name="Ana Lima" />
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Fallback name="Dev Patel" />
            </Avatar.Root>
          </AvatarGroup>
        }
        sidebar={
          <>
            <Text
              fontSize="xs"
              color="fg.muted"
              fontWeight="semibold"
              textTransform="uppercase"
            >
              Boards
            </Text>
            <Text fontSize="sm" px="2" py="1" borderRadius="sm" bg="bg.muted">
              Q2 Launch
            </Text>
            <Text fontSize="sm" px="2" py="1">
              Engineering
            </Text>
            <Text fontSize="sm" px="2" py="1">
              Design system
            </Text>
          </>
        }
      >
        <Stack gap="3">
          <HStack justify="space-between">
            <Heading size="md">Q2 Launch</Heading>
            <HStack id="tempo-filters" gap="2">
              <Badge variant="outline">Assignee</Badge>
              <Badge variant="outline">Label</Badge>
              <Badge variant="outline">Sprint</Badge>
            </HStack>
          </HStack>

          <HStack gap="3" align="start">
            {columns.map((col) => (
              <Box
                key={col.id}
                id={col.id === "progress" ? "tempo-col-progress" : undefined}
                flex="1"
                minW="0"
                bg="bg.subtle"
                borderRadius="md"
                p="2"
              >
                <HStack justify="space-between" px="1" pb="2">
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    color="fg.muted"
                  >
                    {col.name}
                  </Text>
                  <Badge variant="subtle" size="sm">
                    {col.cards.length}
                  </Badge>
                </HStack>
                <Stack gap="2">
                  {col.cards.map((card, i) => (
                    <KanbanCard
                      key={card.id}
                      card={card}
                      heroId={
                        col.id === "backlog" && i === 0
                          ? "tempo-card-hero"
                          : undefined
                      }
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </HStack>
        </Stack>
      </TourAppShell>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const KanbanCard = (props: { card: Card; heroId?: string }) => {
  const { card, heroId } = props
  return (
    <Box
      id={heroId}
      bg="bg.panel"
      borderWidth="1px"
      borderRadius="sm"
      p="3"
      transition="transform 200ms ease"
    >
      <Stack gap="2">
        <Badge
          colorPalette={card.labelPalette}
          size="sm"
          alignSelf="flex-start"
        >
          {card.label}
        </Badge>
        <Text fontSize="sm" fontWeight="medium">
          {card.title}
        </Text>
        <HStack justify="space-between">
          <AvatarGroup id="tempo-assignee" size="xs">
            {card.assignees.map((a) => (
              <Avatar.Root key={a}>
                <Avatar.Fallback name={a} />
              </Avatar.Root>
            ))}
          </AvatarGroup>
          <HStack id="tempo-due" gap="2" color="fg.muted">
            <HStack gap="1">
              <LuCalendar />
              <Text fontSize="xs">{card.due}</Text>
            </HStack>
            {card.comments > 0 && (
              <HStack gap="1">
                <LuMessageSquare />
                <Text fontSize="xs">{card.comments}</Text>
              </HStack>
            )}
          </HStack>
        </HStack>
      </Stack>
    </Box>
  )
}
