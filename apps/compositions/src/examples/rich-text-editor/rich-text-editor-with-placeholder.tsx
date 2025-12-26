"use client"

import Placeholder from "@tiptap/extension-placeholder"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  RichTextEditorToolbar,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorWithPlaceholder = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing your content here...",
      }),
    ],
    content: "",
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
  )
}
