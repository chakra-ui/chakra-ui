"use client"

import { Box, Text } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  RichTextEditorToolbar,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorWithPasteHandling = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: `
      <p>Try pasting content from external sources like Word, Google Docs, or web pages.</p>
      <p>The editor will clean up the formatting while preserving the essential structure.</p>
    `,
    shouldRerenderOnTransaction: true,
    editorProps: {
      transformPastedText,
      transformPastedHTML,
    },
  })

  if (!editor) return null

  return (
    <Box>
      <Text fontSize="sm" color="fg.muted" mb="2">
        Paste content from Word, Google Docs, or web pages - formatting will be
        cleaned automatically.
      </Text>
      <RichTextEditorRoot editor={editor} borderWidth="1px" rounded="l2">
        <RichTextEditorToolbar>
          <RichTextEditorControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <Control.H1 />
            <Control.H2 />
            <Control.H3 />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <Control.Undo />
            <Control.Redo />
          </RichTextEditorControlGroup>
        </RichTextEditorToolbar>

        <RichTextEditorContent />
      </RichTextEditorRoot>
    </Box>
  )
}

const transformPastedText = (text: string) => {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n\n")
    .trim()
}

const transformPastedHTML = (html: string) => {
  return html
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<b[^>]*>/gi, "")
    .replace(/<\/b>/gi, "")
    .replace(/style="[^"]*"/gi, "")
    .replace(/class="[^"]*"/gi, "")
    .replace(/\s*dir="[^"]*"/gi, "")
    .replace(/\s*id="[^"]*"/gi, "")
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<\/p>\s*<br\s*\/?>\s*/gi, "</p>")
    .replace(/<br\s*\/?>\s*<p/gi, "<p")
    .replace(/^(\s*<br\s*\/?>)+/gi, "")
    .replace(/(<br\s*\/?>)+\s*$/gi, "")
    .replace(/<div>/gi, "<p>")
    .replace(/<\/div>/gi, "</p>")
    .replace(/<font[^>]*>/gi, "")
    .replace(/<\/font>/gi, "")
    .replace(/<span[^>]*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<p\s*>/gi, "<p>")
    .replace(/<p>(\s|&nbsp;)*<\/p>/gi, "")
    .replace(/(<\/p>\s*)+(<p>)/gi, "</p><p>")
}
