"use client"

import Highlight from "@tiptap/extension-highlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  RichTextEditorToolbar,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorWithHighlight = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: `
      <p>This is a basic example of implementing text <mark data-color="#FFFF00" style="background-color: #FFFF00">highlighting</mark> using the Tiptap editor.</p>
      <p>Select some text and click the highlight button to <mark data-color="#00FFFF" style="background-color: #00FFFF">apply a highlight color</mark>.</p>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditorToolbar>
        <RichTextEditorControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.Highlight />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditorControlGroup>
      </RichTextEditorToolbar>

      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}
