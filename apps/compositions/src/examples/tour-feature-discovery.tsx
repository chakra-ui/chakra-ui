"use client"

import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { TourOverlay } from "./tour-parts"

const STORAGE_KEY = "tour:whats-new:v3"

export const TourFeatureDiscovery = () => {
  const tour = useTour({
    steps,
    onStatusChange(details) {
      if (details.status === "dismissed" && details.stepId === "folders") {
        try {
          localStorage.setItem(STORAGE_KEY, "1")
        } catch {}
      }
    },
  })

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => tour.start(), 400)
        return () => clearTimeout(t)
      }
    } catch {}
  }, [tour])

  const resetAndStart = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    tour.start()
  }

  return (
    <Stack gap="3">
      <Button size="sm" alignSelf="flex-start" onClick={resetAndStart}>
        Replay what's new
      </Button>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <HStack align="stretch" minH="360px">
          <Stack
            as="nav"
            gap="1"
            w="220px"
            p="3"
            borderRightWidth="1px"
            bg="bg.subtle"
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              color="fg.muted"
            >
              Settings
            </Text>
            <NavItem label="Profile" />
            <NavItem label="Team" />
            <NavItem label="Billing" />
            <NavItem label="Integrations" />
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              color="fg.muted"
              mt="3"
            >
              New
            </Text>
            <NavItem id="whatsnew-ai" label="AI assist" isNew />
            <NavItem id="whatsnew-shortcuts" label="Shortcuts" isNew />
            <NavItem
              id="whatsnew-folders"
              label="Shared folders"
              isNew
              active
            />
          </Stack>
          <Stack p="5" flex="1" gap="4">
            <Heading size="md">Shared folders</Heading>
            <Text color="fg.muted" fontSize="sm">
              Share a folder with any team — changes sync to everyone in real
              time.
            </Text>
            <HStack
              justify="space-between"
              borderWidth="1px"
              borderRadius="md"
              p="3"
            >
              <Stack gap="0">
                <Text fontSize="sm" fontWeight="medium">
                  Sync on save
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  Pushes to collaborators after every file change.
                </Text>
              </Stack>
              <Switch.Root defaultChecked>
                <Switch.Control />
              </Switch.Root>
            </HStack>
            <Input placeholder="Add a teammate by email…" size="sm" />
          </Stack>
        </HStack>
      </Box>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const NavItem = (props: {
  id?: string
  label: string
  isNew?: boolean
  active?: boolean
}) => (
  <HStack
    id={props.id}
    px="2"
    py="1"
    borderRadius="sm"
    bg={props.active ? "bg.muted" : undefined}
    justify="space-between"
  >
    <Text fontSize="sm">{props.label}</Text>
    {props.isNew && (
      <Badge size="sm" colorPalette="purple">
        New
      </Badge>
    )}
  </HStack>
)

const steps: TourStep[] = [
  {
    id: "intro",
    type: "dialog",
    title: "3 new ways to work 🚀",
    description:
      "We shipped a few things while you were away. Take 30 seconds?",
    actions: [
      { label: "Skip", action: "dismiss" },
      { label: "Show me", action: "next" },
    ],
  },
  {
    id: "ai",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#whatsnew-ai"),
    title: "AI assist",
    description:
      "Summarize threads, draft replies, and translate — all on-device.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "shortcuts",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#whatsnew-shortcuts"),
    title: "Every screen, one keystroke",
    description: "Press ⌘K anywhere to jump. Fully rebindable.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "folders",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#whatsnew-folders"),
    title: "Shared folders",
    description:
      "Share a folder with a team — changes sync to everyone in real time.",
    actions: [
      { label: "Back", action: "prev" },
      { label: "Got it", action: "dismiss" },
    ],
  },
]
