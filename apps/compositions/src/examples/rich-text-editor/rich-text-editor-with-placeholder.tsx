"use client"

import Placeholder from "@tiptap/extension-placeholder"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Control, RichTextEditor } from "compositions/ui/rich-text-editor"

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
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
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
