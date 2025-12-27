"use client"

import { Box, Stack } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"
import { useState } from "react"

export const RichTextEditorControlled = () => {
  const [content, setContent] = useState<string>("<p>Edit here...</p>")

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <Stack maxW="3xl">
      <RichTextEditor.Root editor={editor} maxHeight="2xl">
        <RichTextEditor.Toolbar>
          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
            <Control.Code />
          </RichTextEditor.ControlGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor.Root>

      <Box p="4" bg="bg.muted" flex="1">
        <Box
          as="pre"
          textStyle="sm"
          wordWrap="break-word"
          whiteSpace="pre-wrap"
        >
          {content}
        </Box>
      </Box>
    </Stack>
  )
}
