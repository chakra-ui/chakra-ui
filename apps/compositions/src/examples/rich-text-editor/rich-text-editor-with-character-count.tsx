"use client"

import { Box, HStack, Text } from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { CharacterCount } from "@tiptap/extensions/character-count"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorWithCharacterCount = () => {
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
        <HStack gap="1" borderWidth="1px" p="2">
          <RichTextEditorControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Strike />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditorControlGroup>
        </HStack>
      </Box>

      <RichTextEditorContent minH="400px" borderXWidth="1px" />

      <HStack
        borderWidth="1px"
        p="3"
        textAlign="end"
        textStyle="xs"
        justify="flex-end"
        gap="4"
      >
        <Box fontVariantNumeric="tabular-nums">Characters: {charCount}</Box>
        <Box fontVariantNumeric="tabular-nums">Words: {wordCount}</Box>
      </HStack>
    </RichTextEditorRoot>
  )
}
