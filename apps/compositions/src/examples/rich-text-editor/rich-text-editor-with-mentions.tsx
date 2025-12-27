"use client"

import {
  Box,
  Center,
  Menu as ChakraMenu,
  HStack,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react"
import Mention from "@tiptap/extension-mention"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { PluginKey } from "@tiptap/pm/state"
import {
  NodeViewWrapper,
  ReactNodeViewRenderer,
  ReactRenderer,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"
import { Tag } from "compositions/ui/tag"
import * as React from "react"
import { LuUser } from "react-icons/lu"

export const RichTextEditorWithMentions = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyle,
      CustomMention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: {
          char: "@",
          pluginKey: new PluginKey("mention"),
          items: ({ query }) =>
            MENTION_USERS.filter((user) =>
              user.label.toLowerCase().includes(query.toLowerCase()),
            ),
          render: () => {
            let component: ReactRenderer<
              MentionListRef,
              MentionListProps
            > | null = null
            let container: HTMLDivElement | null = null
            let selectedIndex = 0

            return {
              onStart(props) {
                selectedIndex = 0
                container = document.createElement("div")
                document.body.appendChild(container)

                component = new ReactRenderer(MentionList, {
                  props: {
                    items: props.items,
                    selectedIndex,
                    command: (item: any) => props.command(item),
                    clientRect: props.clientRect,
                  },
                  editor: props.editor,
                })

                container.appendChild(component.element)
              },
              onUpdate(props) {
                if (!component) return
                component.updateProps({
                  items: props.items,
                  selectedIndex,
                  command: (item: any) => props.command(item),
                  clientRect: props.clientRect,
                })
              },

              onKeyDown({ event }: { event: KeyboardEvent }) {
                if (!component) return false
                if (event.key === "ArrowUp") {
                  selectedIndex =
                    (selectedIndex - 1 + component.props.items.length) %
                    component.props.items.length
                  component.updateProps({ ...component.props, selectedIndex })
                  return true
                }
                if (event.key === "ArrowDown") {
                  selectedIndex =
                    (selectedIndex + 1) % component.props.items.length
                  component.updateProps({ ...component.props, selectedIndex })
                  return true
                }
                if (event.key === "Enter") {
                  const item = component.props.items[selectedIndex]
                  if (item) component.props.command(item)
                  return true
                }
                if (event.key === "Escape") return true
                return false
              },

              onExit() {
                if (container) container.remove()
                container = null
                if (component) component.destroy()
                component = null
              },
            }
          },
        },
      }),
    ],
    content: `<h1>Rich Text Editor</h1><p>Type <strong>@</strong> to mention someone</p>`,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="sm">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const MENTION_USERS = [
  { id: "1", label: "Alice Johnson", email: "alice@example.com" },
  { id: "2", label: "Bob Smith", email: "bob@example.com" },
  { id: "3", label: "Charlie Davis", email: "charlie@example.com" },
  { id: "4", label: "Diana Wilson", email: "diana@example.com" },
  { id: "5", label: "Ethan Brown", email: "ethan@example.com" },
  { id: "6", label: "Fiona Martinez", email: "fiona@example.com" },
  { id: "7", label: "George Anderson", email: "george@example.com" },
  { id: "8", label: "Hannah Taylor", email: "hannah@example.com" },
]

type MentionUser = (typeof MENTION_USERS)[number]

const MentionComponent = (props: any) => {
  return (
    <NodeViewWrapper as="span" style={{ display: "inline" }}>
      <Tag size="lg" colorPalette="orange" mr="1">
        @{props.node.attrs.label ?? props.node.attrs.id}
      </Tag>
    </NodeViewWrapper>
  )
}

const CustomMention = Mention.extend({
  addNodeView() {
    return ReactNodeViewRenderer(MentionComponent)
  },
})

interface MentionListProps {
  items: MentionUser[]
  command: (item: MentionUser) => void
  selectedIndex: number
  clientRect?: (() => DOMRect | null) | null
}

interface MentionListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

const MentionList = React.forwardRef<MentionListRef, MentionListProps>(
  function MentionList(props, ref) {
    const { items, command, clientRect } = props

    React.useImperativeHandle(ref, () => ({
      onKeyDown: () => false,
    }))

    const rect = clientRect?.()
    const positioning = rect
      ? {
          strategy: "fixed" as const,
          placement: "bottom-start" as const,
          gutter: 8,
          getAnchorRect: () => ({
            x: rect.left,
            y: rect.bottom,
            width: rect.width,
            height: 0,
          }),
        }
      : undefined

    return (
      <ChakraMenu.Root open positioning={positioning}>
        <Portal>
          <ChakraMenu.Positioner>
            <ChakraMenu.Content
              p="1"
              minW="280px"
              maxH="360px"
              overflowY="auto"
            >
              {items.length === 0 ? (
                <Box p="3" textAlign="center">
                  <Text fontSize="sm" color="fg.muted">
                    No results found
                  </Text>
                </Box>
              ) : (
                items.map((item) => (
                  <ChakraMenu.Item
                    key={item.id}
                    value={item.label}
                    onPointerDown={(event) => {
                      event.preventDefault()
                      command(item)
                    }}
                    cursor="pointer"
                  >
                    <HStack gap="2.5" w="full">
                      <Center
                        boxSize="8"
                        rounded="full"
                        bg="gray.200"
                        color="gray.700"
                      >
                        <LuUser size={16} />
                      </Center>
                      <VStack align="start" gap="0" flex="1" minW="0">
                        <Text fontSize="sm" fontWeight="medium">
                          {item.label}
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          {item.email}
                        </Text>
                      </VStack>
                    </HStack>
                  </ChakraMenu.Item>
                ))
              )}
            </ChakraMenu.Content>
          </ChakraMenu.Positioner>
        </Portal>
      </ChakraMenu.Root>
    )
  },
)
