"use client"

import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ScrollArea,
  VStack,
} from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { useState } from "react"
import { LuArrowDown } from "react-icons/lu"
import { useStickToBottom } from "use-stick-to-bottom"

export const ScrollAreaStickToBottom = () => {
  const sticky = useStickToBottom()

  const [messages, setMessages] = useState<string[]>([
    "Message 1 - 10:00:00",
    "Message 2 - 10:00:01",
    "Message 3 - 10:00:02",
    "Message 4 - 10:00:03",
    "Message 5 - 10:00:04",
    "Message 6 - 10:00:05",
    "Message 7 - 10:00:06",
    "Message 8 - 10:00:07",
    "Message 9 - 10:00:08",
    "Message 10 - 10:00:09",
  ])

  const addMessage = () => {
    const newMessage = `Message ${messages.length + 1} - ${new Date().toLocaleTimeString()}`
    setMessages((prev) => [...prev, newMessage])
  }

  const addMultipleMessages = () => {
    const newMessages = Array.from(
      { length: 5 },
      (_, i) =>
        `Batch message ${messages.length + i + 1} - ${new Date().toLocaleTimeString()}`,
    )
    setMessages((prev) => [...prev, ...newMessages])
  }

  const removeMessage = () => {
    setMessages((prev) => prev.slice(0, -1))
  }

  return (
    <VStack gap="4" align="stretch" width="20rem">
      <ButtonGroup gap="2" size="sm" variant="outline">
        <Button onClick={addMessage}>Add Message</Button>
        <Button onClick={addMultipleMessages}>Add 5 Messages</Button>
        <Button onClick={removeMessage}>Remove Message</Button>
      </ButtonGroup>

      <ScrollArea.Root
        maxHeight="20rem"
        width="full"
        borderWidth="1px"
        rounded="l2"
        size="xs"
      >
        <ScrollArea.Viewport ref={sticky.scrollRef}>
          <ScrollArea.Content ref={sticky.contentRef}>
            <VStack gap="2" p="3" align="stretch">
              {messages.map((message, index) => (
                <DecorativeBox key={index} h="12">
                  {message}
                </DecorativeBox>
              ))}
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />

        {!sticky.isAtBottom && (
          <Box position="absolute" bottom="4" right="4" zIndex="10">
            <IconButton
              size="sm"
              onClick={() => {
                sticky.scrollToBottom()
              }}
              colorScheme="blue"
              variant="solid"
            >
              <LuArrowDown />
            </IconButton>
          </Box>
        )}
      </ScrollArea.Root>
    </VStack>
  )
}
