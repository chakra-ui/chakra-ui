"use client"

import { Box, HStack, Portal, Text, VStack } from "@chakra-ui/react"
import { Menu as ChakraMenu } from "@chakra-ui/react"
import { Extension } from "@tiptap/core"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { Decoration, DecorationSet } from "@tiptap/pm/view"
import { Editor, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { MenuItemGroup, MenuSeparator } from "compositions/ui/menu"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
} from "compositions/ui/rich-text-editor"
import { useCallback, useState } from "react"
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

interface SlashCommand {
  title: string
  description: string
  icon: string
  command: (editor: Editor) => void
}

interface SlashCommandGroup {
  group: string
  items: SlashCommand[]
}

const SLASH_COMMANDS: SlashCommandGroup[] = [
  {
    group: "Text blocks",
    items: [
      {
        title: "Heading 1",
        description: "Large section heading",
        icon: "H₁",
        command: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
      },
      {
        title: "Heading 2",
        description: "Medium section heading",
        icon: "H₂",
        command: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
      },
      {
        title: "Heading 3",
        description: "Small section heading",
        icon: "H₃",
        command: (editor: Editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
      },
      {
        title: "Paragraph",
        description: "Medium section heading",
        icon: "¶",
        command: (editor: Editor) =>
          editor.chain().focus().setParagraph().run(),
      },
    ],
  },
  {
    group: "Interactive blocks",
    items: [
      {
        title: "Call Out",
        description: "Large section heading",
        icon: "📢",
        command: (editor: Editor) =>
          editor.chain().focus().toggleBlockquote().run(),
      },
      {
        title: "Block Quote",
        description: "",
        icon: "❝",
        command: (editor: Editor) =>
          editor.chain().focus().toggleBlockquote().run(),
      },
      {
        title: "Bullet List",
        description: "Create a simple bullet list",
        icon: "•",
        command: (editor: Editor) =>
          editor.chain().focus().toggleBulletList().run(),
      },
      {
        title: "Ordered List",
        description: "Create a numbered list",
        icon: "1.",
        command: (editor: Editor) =>
          editor.chain().focus().toggleOrderedList().run(),
      },
    ],
  },
]

interface SlashCommandsStorage {
  active: boolean
  query: string
  position: { top: number; left: number }
  slashPos: number | null
  selectedIndex: number
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    slashCommands: {
      openSlashMenu: () => ReturnType
      closeSlashMenu: () => ReturnType
    }
  }
}

const SlashCommandsExtension = Extension.create<{}, SlashCommandsStorage>({
  name: "slashCommands",

  addStorage() {
    return {
      active: false,
      query: "",
      position: { top: 0, left: 0 },
      slashPos: null,
      selectedIndex: 0,
    }
  },

  addCommands() {
    return {
      openSlashMenu:
        () =>
        ({ state }) => {
          this.storage.active = true
          return true
        },
      closeSlashMenu:
        () =>
        ({ state }) => {
          this.storage.active = false
          this.storage.query = ""
          this.storage.slashPos = null
          return true
        },
    }
  },

  addProseMirrorPlugins() {
    const storage = this.storage

    return [
      new Plugin({
        key: new PluginKey("slashCommands"),

        state: {
          init: () => DecorationSet.empty,
          apply(tr, set) {
            set = set.map(tr.mapping, tr.doc)
            return set
          },
        },

        props: {
          decorations(state) {
            return this.getState(state)
          },
        },

        view() {
          return {
            update: (view, prevState) => {
              const { state } = view
              const { selection } = state
              const { $from } = selection

              const textBefore = $from.parent.textContent.slice(
                0,
                $from.parentOffset,
              )
              const slashMatch = textBefore.match(/\/(\w*)$/)

              if (slashMatch) {
                const query = slashMatch[1]
                storage.query = query
                storage.slashPos = $from.pos - query.length - 1

                const coords = view.coordsAtPos($from.pos)
                storage.position = {
                  top: coords.top + 24,
                  left: coords.left,
                }
                storage.active = true
                storage.selectedIndex = 0
              } else {
                storage.active = false
                storage.query = ""
                storage.slashPos = null
              }
            },
          }
        },
      }),
    ]
  },
})

export default function RichTextEditorWithSlashCommands() {
  const [, forceUpdate] = useState({})

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyleKit,
      SlashCommandsExtension,
    ],
    content: `<h1>Welcome to Chakra UI + Tiptap!</h1><p>Type / to see slash commands...</p>`,
    onUpdate: () => {
      forceUpdate({})
    },
  })

  const getAllFilteredItems = useCallback((): SlashCommand[] => {
    if (!editor) return []
    const query = editor.storage.slashCommands.query
    const filtered: SlashCommand[] = []
    SLASH_COMMANDS.forEach((group) => {
      group.items.forEach((item) => {
        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          filtered.push(item)
        }
      })
    })
    return filtered
  }, [editor])

  const executeCommand = useCallback(
    (item: SlashCommand) => {
      if (!editor) return
      const slashPos = editor.storage.slashCommands.slashPos
      const query = editor.storage.slashCommands.query

      if (slashPos !== null) {
        editor
          .chain()
          .focus()
          .deleteRange({ from: slashPos, to: slashPos + query.length + 1 })
          .run()

        item.command(editor)
        editor.commands.closeSlashMenu()
      }
    },
    [editor],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!editor || !editor.storage.slashCommands.active) return false

      if (event.key === "ArrowDown") {
        event.preventDefault()
        const allItems = getAllFilteredItems()
        editor.storage.slashCommands.selectedIndex =
          (editor.storage.slashCommands.selectedIndex + 1) % allItems.length
        forceUpdate({})
        return true
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        const allItems = getAllFilteredItems()
        editor.storage.slashCommands.selectedIndex =
          (editor.storage.slashCommands.selectedIndex - 1 + allItems.length) %
          allItems.length
        forceUpdate({})
        return true
      }

      if (event.key === "Enter") {
        event.preventDefault()
        const allItems = getAllFilteredItems()
        const selectedItem =
          allItems[editor.storage.slashCommands.selectedIndex]
        if (selectedItem) {
          executeCommand(selectedItem)
        }
        return true
      }

      if (event.key === "Escape") {
        event.preventDefault()
        editor.commands.closeSlashMenu()
        forceUpdate({})
        return true
      }

      return false
    },
    [editor, getAllFilteredItems, executeCommand],
  )

  if (!editor) return null

  const showMenu = editor.storage.slashCommands.active
  const menuPosition = editor.storage.slashCommands.position
  const searchQuery = editor.storage.slashCommands.query
  const selectedIndex = editor.storage.slashCommands.selectedIndex

  const filteredGroups = SLASH_COMMANDS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  })).filter((group) => group.items.length > 0)

  let currentIndex = 0

  if (showMenu) {
    document.addEventListener("keydown", handleKeyDown)
  } else {
    document.removeEventListener("keydown", handleKeyDown)
  }

  return (
    <Box position="relative" maxW="900px" mx="auto" mt="8">
      <RichTextEditorRoot
        editor={editor}
        border="1px solid"
        borderColor="border"
        rounded="md"
      >
        <HStack
          wrap="nowrap"
          gap="2"
          p="2"
          borderBottom="1px solid"
          borderColor="border"
          overflowX="auto"
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

        <RichTextEditorContent minH="400px" />
      </RichTextEditorRoot>

      {showMenu && (
        <Portal>
          <Box
            position="fixed"
            top={`${menuPosition.top}px`}
            left={`${menuPosition.left}px`}
            zIndex={1000}
          >
            <ChakraMenu.Content
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              rounded="md"
              shadow="lg"
              w="320px"
              maxH="400px"
              overflowY="auto"
              py="2"
            >
              <VStack align="stretch" gap="0">
                {filteredGroups.map((group, groupIndex) => (
                  <Box key={groupIndex}>
                    <MenuItemGroup title={group.group}>
                      {group.items.map((item, itemIndex) => {
                        const isSelected = currentIndex === selectedIndex
                        const itemCurrentIndex = currentIndex
                        currentIndex++

                        return (
                          <ChakraMenu.Item
                            key={itemIndex}
                            value={item.title}
                            cursor="pointer"
                            bg={isSelected ? "gray.100" : "transparent"}
                            _hover={{ bg: "gray.100" }}
                            onClick={() => executeCommand(item)}
                            px="4"
                            py="2"
                          >
                            <HStack gap="3" w="full">
                              <Box
                                fontSize="xl"
                                w="6"
                                textAlign="center"
                                fontWeight="medium"
                              >
                                {item.icon}
                              </Box>
                              <VStack align="start" gap="0" flex="1">
                                <Text fontSize="sm" fontWeight="medium">
                                  {item.title}
                                </Text>
                                {item.description && (
                                  <Text fontSize="xs" color="gray.500">
                                    {item.description}
                                  </Text>
                                )}
                              </VStack>
                            </HStack>
                          </ChakraMenu.Item>
                        )
                      })}
                    </MenuItemGroup>
                  </Box>
                ))}
              </VStack>
              <MenuSeparator />
              <Box px="4" py="2" bg="gray.50">
                <HStack fontSize="xs" color="gray.500" gap="4">
                  <HStack gap="1">
                    <Text fontWeight="medium">↑↓</Text>
                    <Text>to navigate</Text>
                  </HStack>
                  <HStack gap="1">
                    <Text fontWeight="medium">↵</Text>
                    <Text>to select</Text>
                  </HStack>
                  <HStack gap="1">
                    <Text fontWeight="medium">esc</Text>
                    <Text>to dismiss</Text>
                  </HStack>
                </HStack>
              </Box>
            </ChakraMenu.Content>
          </Box>
        </Portal>
      )}
    </Box>
  )
}

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
