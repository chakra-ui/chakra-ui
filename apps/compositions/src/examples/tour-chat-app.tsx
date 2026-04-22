"use client"

import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Popover,
  Stack,
  Text,
  Tour,
  type TourStep,
  useTour,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuAtSign, LuBell, LuPaperclip, LuPin } from "react-icons/lu"
import { TourOverlay } from "./tour-parts"
import { TourAppShell } from "./tour-shell"

type Msg = {
  author: string
  time: string
  text: string
  pinned?: boolean
  reactions?: { emoji: string; count: number }[]
}

const messages: Msg[] = [
  {
    author: "Ana Lima",
    time: "11:42",
    text: "Shipping the new header today — review when you can 🙏",
    pinned: true,
    reactions: [
      { emoji: "🔥", count: 3 },
      { emoji: "👀", count: 2 },
    ],
  },
  {
    author: "Dev Patel",
    time: "11:43",
    text: "Nice. Can we match the title size on /pricing while we're at it?",
  },
  {
    author: "Mei Chen",
    time: "11:44",
    text: "I'll do the audit across marketing pages after lunch.",
  },
  {
    author: "Jon West",
    time: "11:52",
    text: "Figma is pushed. Thread below for the spacing tokens.",
  },
]

export const TourChatApp = () => {
  const [mentionOpen, setMentionOpen] = useState(false)

  const steps: TourStep[] = [
    {
      id: "channels",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#pulse-channels"),
      title: "Channels stay focused",
      description: "One topic per channel. Use threads for side-conversations.",
      actions: [{ label: "Next", action: "next" }],
    },
    {
      id: "pinned",
      type: "tooltip",
      target: () =>
        document.querySelector<HTMLElement>("#pulse-message-pinned"),
      title: "Pin what matters",
      description: "Hover any message to pin, bookmark, or reply in thread.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "mention",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#pulse-mention"),
      title: "@mention to notify",
      description:
        "Type @ and start typing — mentions DM the person even if the channel is muted.",
      effect: ({ show }) => {
        setMentionOpen(true)
        show()
        return () => setMentionOpen(false)
      },
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "attach",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#pulse-attach"),
      title: "Drop any file",
      description: "Drag & drop from Finder. Files stay searchable forever.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Next", action: "next" },
      ],
    },
    {
      id: "notifs",
      type: "tooltip",
      target: () => document.querySelector<HTMLElement>("#pulse-notifs"),
      title: "Tune the noise",
      description:
        "Mute channels, schedule DND, and let @here break through when urgent.",
      actions: [
        { label: "Back", action: "prev" },
        { label: "Done", action: "dismiss" },
      ],
    },
  ]

  const tour = useTour({ steps })

  return (
    <Stack gap="3">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Tour Pulse
      </Button>

      <TourAppShell
        logo={<Text fontWeight="bold">Pulse</Text>}
        actions={
          <IconButton
            id="pulse-notifs"
            aria-label="Notifications"
            size="sm"
            variant="ghost"
          >
            <LuBell />
          </IconButton>
        }
        sidebar={
          <Stack id="pulse-channels" gap="0.5">
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              color="fg.muted"
            >
              Channels
            </Text>
            <SidebarRow label="# general" />
            <SidebarRow active label="# design" />
            <SidebarRow label="# launch-q2" />
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              color="fg.muted"
              mt="2"
            >
              Direct
            </Text>
            <SidebarRow label="Ana Lima" online />
            <SidebarRow label="Dev Patel" />
            <SidebarRow label="Mei Chen" online />
          </Stack>
        }
      >
        <Stack gap="3" h="full">
          <HStack justify="space-between" borderBottomWidth="1px" pb="2">
            <Stack gap="0">
              <Text fontWeight="semibold"># design</Text>
              <Text fontSize="xs" color="fg.muted">
                12 members · shipping the new header
              </Text>
            </Stack>
          </HStack>

          <Stack gap="3" flex="1" overflowY="auto">
            {messages.map((m, i) => (
              <HStack
                key={i}
                align="start"
                gap="3"
                id={m.pinned ? "pulse-message-pinned" : undefined}
              >
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={m.author} />
                </Avatar.Root>
                <Stack gap="1" flex="1">
                  <HStack gap="2">
                    <Text fontWeight="medium" fontSize="sm">
                      {m.author}
                    </Text>
                    <Text fontSize="xs" color="fg.muted">
                      {m.time}
                    </Text>
                    {m.pinned && (
                      <Badge size="sm" variant="subtle">
                        <LuPin /> Pinned
                      </Badge>
                    )}
                  </HStack>
                  <Text fontSize="sm">{m.text}</Text>
                  {m.reactions && (
                    <HStack gap="1">
                      {m.reactions.map((r) => (
                        <Badge key={r.emoji} variant="outline" size="sm">
                          {r.emoji} {r.count}
                        </Badge>
                      ))}
                    </HStack>
                  )}
                </Stack>
              </HStack>
            ))}
          </Stack>

          <HStack borderWidth="1px" borderRadius="md" px="2" py="1">
            <Popover.Root
              open={mentionOpen}
              onOpenChange={(d) => setMentionOpen(d.open)}
            >
              <Popover.Trigger asChild>
                <IconButton
                  id="pulse-mention"
                  aria-label="Mention"
                  size="sm"
                  variant="ghost"
                >
                  <LuAtSign />
                </IconButton>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Body>
                    <Stack gap="1">
                      <MentionRow name="Ana Lima" />
                      <MentionRow name="Dev Patel" />
                      <MentionRow name="Mei Chen" />
                    </Stack>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
            <Input
              variant="flushed"
              border="none"
              size="sm"
              placeholder="Message #design"
            />
            <IconButton
              id="pulse-attach"
              aria-label="Attach"
              size="sm"
              variant="ghost"
            >
              <LuPaperclip />
            </IconButton>
          </HStack>
        </Stack>
      </TourAppShell>

      <Tour.Root tour={tour}>
        <TourOverlay />
      </Tour.Root>
    </Stack>
  )
}

const SidebarRow = (props: {
  label?: string
  active?: boolean
  online?: boolean
  children?: React.ReactNode
}) => (
  <HStack
    px="2"
    py="1"
    borderRadius="sm"
    bg={props.active ? "bg.muted" : undefined}
    fontSize="sm"
    gap="2"
  >
    {props.online !== undefined && (
      <Box
        w="2"
        h="2"
        borderRadius="full"
        bg={props.online ? "green.500" : "gray.300"}
      />
    )}
    <Text>{props.label ?? props.children}</Text>
  </HStack>
)

const MentionRow = (props: { name: string }) => (
  <HStack
    px="2"
    py="1"
    borderRadius="sm"
    _hover={{ bg: "bg.muted" }}
    cursor="pointer"
  >
    <Avatar.Root size="xs">
      <Avatar.Fallback name={props.name} />
    </Avatar.Root>
    <Text fontSize="sm">{props.name}</Text>
  </HStack>
)
