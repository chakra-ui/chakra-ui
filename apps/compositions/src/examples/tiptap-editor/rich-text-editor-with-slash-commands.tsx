"use client"

import {
  Box,
  Menu as ChakraMenu,
  HStack,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Extension } from "@tiptap/core"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { PluginKey } from "@tiptap/pm/state"
import { Editor, ReactRenderer, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Suggestion, type SuggestionProps } from "@tiptap/suggestion"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
} from "compositions/ui/rich-text-editor"
import { forwardRef, useImperativeHandle } from "react"
import {
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuItalic,
  LuList,
  LuListOrdered,
  LuQuote,
  LuRotateCcw,
  LuRotateCw,
  LuStrikethrough,
} from "react-icons/lu"

export const RichTextEditorWithSlashCommands = () => {
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
      SlashCommandsExtension,
    ],
    content: `<h1>Slash Commands Editor</h1><p>Type <strong>/</strong> to see commands</p>`,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="sm"
    >
      <HStack
        gap="1"
        p="2"
        borderBottom="1px solid"
        borderColor="border"
        flexWrap="wrap"
      >
        <RichTextEditorButtonGroup>
          <Bold />
          <Italic />
          <Strike />
          <Code />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup>
          <H1 />
          <H2 />
          <H3 />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup>
          <BulletList />
          <OrderedList />
          <Blockquote />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup noSeparator>
          <Undo />
          <Redo />
        </RichTextEditorButtonGroup>
      </HStack>

      <RichTextEditorContent minH="400px" p="4" />
    </RichTextEditorRoot>
  )
}

interface SlashCommand {
  title: string
  description: string
  icon: string
  command: (props: { editor: Editor; range: any }) => void
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: "H₁",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run()
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: "H₂",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run()
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: "H₃",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run()
    },
  },
  {
    title: "Paragraph",
    description: "Regular text",
    icon: "¶",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run()
    },
  },
  {
    title: "Bullet List",
    description: "Simple bullet list",
    icon: "•",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: "Ordered List",
    description: "Numbered list",
    icon: "1.",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: "Block Quote",
    description: "Quote block",
    icon: "❝",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  {
    title: "Code Block",
    description: "Code block",
    icon: "</>",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
]

interface SlashMenuListProps {
  items: SlashCommand[]
  command: (item: SlashCommand) => void
  selectedIndex: number
  clientRect?: (() => DOMRect | null) | null
}

interface SlashMenuListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean
}

const SlashMenuList = forwardRef<SlashMenuListRef, SlashMenuListProps>(
  ({ items, command, clientRect }, ref) => {
    useImperativeHandle(ref, () => ({
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
              {items.map((item, index) => (
                <ChakraMenu.Item
                  key={index}
                  value={item.title}
                  onPointerDown={(event) => {
                    event.preventDefault()
                    command(item)
                  }}
                  cursor="button"
                >
                  <HStack gap="2.5" w="full">
                    <Box fontSize="lg" w="5" flexShrink={0} textAlign="center">
                      {item.icon}
                    </Box>

                    <VStack align="start" gap="0" flex="1" minW="0">
                      <Text fontSize="sm" fontWeight="medium">
                        {item.title}
                      </Text>

                      {item.description && (
                        <Text fontSize="xs" color="fg.muted">
                          {item.description}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                </ChakraMenu.Item>
              ))}
            </ChakraMenu.Content>
          </ChakraMenu.Positioner>
        </Portal>
      </ChakraMenu.Root>
    )
  },
)

SlashMenuList.displayName = "SlashMenuList"

const SlashCommandsExtension = Extension.create({
  name: "slashCommands",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        pluginKey: new PluginKey("slashCommands"),

        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: any
          props: SlashCommand
        }) => {
          props.command({ editor, range })
        },

        items: ({ query }: { query: string }) =>
          SLASH_COMMANDS.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()),
          ),

        render: () => {
          let component: ReactRenderer<
            SlashMenuListRef,
            SlashMenuListProps
          > | null = null
          let container: HTMLDivElement | null = null
          let selectedIndex = 0

          return {
            onStart(props: SuggestionProps<SlashCommand>) {
              selectedIndex = 0

              container = document.createElement("div")
              document.body.appendChild(container)

              component = new ReactRenderer(SlashMenuList, {
                props: {
                  items: props.items,
                  selectedIndex,
                  command: (item: SlashCommand) => props.command(item),
                  clientRect: props.clientRect,
                },
                editor: props.editor,
              })

              container.appendChild(component.element)
            },

            onUpdate(props: SuggestionProps<SlashCommand>) {
              if (!component) return

              component.updateProps({
                items: props.items,
                selectedIndex,
                command: (item: SlashCommand) => props.command(item),
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
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const Bold = createButtonControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
})

const Italic = createButtonControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
})

const Strike = createButtonControl({
  label: "Strike",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
})

const Code = createButtonControl({
  label: "Code",
  icon: LuCode,
  command: (editor) => editor.chain().focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive("code") ? "subtle" : "ghost"),
})

const H1 = createButtonControl({
  label: "H1",
  icon: LuHeading1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

const H2 = createButtonControl({
  label: "H2",
  icon: LuHeading2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

const H3 = createButtonControl({
  label: "H3",
  icon: LuHeading3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

const BulletList = createButtonControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
})

const OrderedList = createButtonControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
})

const Blockquote = createButtonControl({
  label: "Blockquote",
  icon: LuQuote,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
})

const Undo = createButtonControl({
  label: "Undo",
  icon: LuRotateCcw,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
})

const Redo = createButtonControl({
  label: "Redo",
  icon: LuRotateCw,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
})
