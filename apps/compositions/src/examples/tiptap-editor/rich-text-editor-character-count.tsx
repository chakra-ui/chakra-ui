"use client"

import { Box, HStack, Text } from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { CharacterCount } from "@tiptap/extensions/character-count"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
} from "compositions/ui/rich-text-editor"
import {
  LuBold,
  LuItalic,
  LuList,
  LuListOrdered,
  LuStrikethrough,
} from "react-icons/lu"

export function RichTextEditorCharacterCount() {
  const editor = useEditor({
    content: `
      <h2>Dr. Stone</h2>
      <p><strong>Dr. Stone</strong> is a Japanese manga and anime series that follows the story of Senku Ishigami, a scientific genius who awakens thousands of years after humanity has been petrified.</p>
      <p>The world is in ruins, and Senku aims to rebuild civilization using the power of science.</p>
    `,
    extensions: [
      StarterKit,
      Image,
      CharacterCount.configure({
        limit: 1000,
        mode: "textSize",
      }),
    ],
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  const charCount = editor.storage.characterCount.characters()
  const wordCount = editor.storage.characterCount.words()

  return (
    <RichTextEditorRoot editor={editor}>
      <Box>
        <HStack gap={1} border="1px solid" borderColor="border" p="3">
          <RichTextEditorButtonGroup>
            <Bold />
            <Italic />
            <Strikethrough />
          </RichTextEditorButtonGroup>

          <RichTextEditorButtonGroup>
            <BulletList />
            <OrderedList />
          </RichTextEditorButtonGroup>
        </HStack>
      </Box>

      <RichTextEditorContent
        minH="400px"
        p={6}
        borderX="1px solid"
        borderColor="border"
      />

      <Box border="1px solid" borderColor="border" p={3} textAlign="right">
        <Text>
          Characters: {charCount} | Words: {wordCount}
        </Text>
      </Box>
    </RichTextEditorRoot>
  )
}

const Bold = createButtonControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "solid" : "ghost"),
})

const Italic = createButtonControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "solid" : "ghost"),
})

const Strikethrough = createButtonControl({
  label: "Strikethrough",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "solid" : "ghost"),
})

const BulletList = createButtonControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "solid" : "ghost"),
})

const OrderedList = createButtonControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "solid" : "ghost"),
})
