"use client"

import {
  Box,
  Button,
  HStack,
  Input,
  Stack,
  Text,
  Tour,
  type TourStep,
  VStack,
  useTour,
} from "@chakra-ui/react"

export const TourChatApp = () => {
  const tour = useTour({ steps })

  return (
    <VStack gap="4" alignItems="stretch">
      <Button size="sm" alignSelf="flex-start" onClick={() => tour.start()}>
        Chat Tour
      </Button>

      <HStack
        gap="0"
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        minH="320px"
        alignItems="stretch"
      >
        <Box id="chat-sidebar" w="160px" borderRightWidth="1px" p="2">
          <Text textStyle="xs" fontWeight="medium" p="2" color="fg.muted">
            Channels
          </Text>
          <Stack gap="0.5">
            {["general", "design", "engineering", "random"].map((ch) => (
              <Box
                key={ch}
                px="2"
                py="1"
                borderRadius="sm"
                bg={ch === "general" ? "bg.muted" : undefined}
                cursor="pointer"
              >
                <Text textStyle="sm"># {ch}</Text>
              </Box>
            ))}
          </Stack>
          <Text
            textStyle="xs"
            fontWeight="medium"
            p="2"
            mt="2"
            color="fg.muted"
          >
            Direct Messages
          </Text>
          <Stack gap="0.5">
            {["Alice", "Bob", "Carol"].map((name) => (
              <Box key={name} px="2" py="1" borderRadius="sm" cursor="pointer">
                <Text textStyle="sm">{name}</Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Stack gap="0" flex="1">
          <HStack
            id="chat-header"
            px="3"
            py="2"
            borderBottomWidth="1px"
            justify="space-between"
          >
            <Text textStyle="sm" fontWeight="medium">
              # general
            </Text>
            <HStack gap="1">
              <Button size="xs" variant="ghost">
                Search
              </Button>
              <Button size="xs" variant="ghost">
                Pin
              </Button>
              <Button size="xs" variant="ghost">
                Members
              </Button>
            </HStack>
          </HStack>

          <Box id="chat-messages" flex="1" p="3">
            <Stack gap="3">
              {messages.map((msg, i) => (
                <Box key={i}>
                  <HStack gap="2" mb="0.5">
                    <Text textStyle="sm" fontWeight="medium">
                      {msg.user}
                    </Text>
                    <Text textStyle="xs" color="fg.muted">
                      {msg.time}
                    </Text>
                  </HStack>
                  <Text textStyle="sm" color="fg.muted">
                    {msg.text}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>

          <HStack id="chat-input" px="3" py="2" borderTopWidth="1px" gap="2">
            <Input size="sm" placeholder="Message #general" flex="1" />
            <Button size="sm">Send</Button>
          </HStack>
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

const messages = [
  {
    user: "Alice",
    time: "9:30 AM",
    text: "Good morning! Ready for the sprint?",
  },
  {
    user: "Bob",
    time: "9:32 AM",
    text: "Yes! I'll share the design updates shortly.",
  },
  {
    user: "Carol",
    time: "9:35 AM",
    text: "Sounds good. I've pushed the API changes.",
  },
]

const steps: TourStep[] = [
  {
    id: "sidebar",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#chat-sidebar"),
    placement: "right",
    title: "Channels & DMs",
    description:
      "Browse channels or direct messages in the sidebar. Star important channels to pin them to the top.",
    actions: [{ label: "Next", action: "next" }],
  },
  {
    id: "header",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#chat-header"),
    placement: "bottom",
    title: "Channel Header",
    description:
      "Search messages, view pinned items, or see who's in the channel.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "messages",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#chat-messages"),
    title: "Messages",
    description:
      "Your conversation history. Hover on a message to react, reply in a thread, or bookmark it.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Next", action: "next" },
    ],
  },
  {
    id: "input",
    type: "tooltip",
    target: () => document.querySelector<HTMLElement>("#chat-input"),
    placement: "top",
    title: "Compose",
    description:
      "Type your message here. Use @ to mention someone, / for slash commands, and drag files to upload.",
    actions: [
      { label: "Prev", action: "prev" },
      { label: "Done", action: "dismiss" },
    ],
  },
]
