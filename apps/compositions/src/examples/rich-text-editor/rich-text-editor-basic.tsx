"use client"

import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  RichTextEditorToolbar,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorBasic = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyleKit,
    ],
    content: `<h1>Welcome to Chakra UI + Tiptap!</h1><p>Edit using the toolbar below...</p>`,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot editor={editor} borderWidth="1px" rounded="l2">
      <RichTextEditorToolbar>
        <RichTextEditorControlGroup>
          <Control.FontFamily />
          <Control.FontSize />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
          <Control.H4 />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
          <Control.Hr />
          <Control.Subscript />
          <Control.Superscript />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.TextColor />
          <Control.Link />
          <Control.Unlink />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.AlignLeft />
          <Control.AlignCenter />
          <Control.AlignJustify />
          <Control.AlignRight />
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
