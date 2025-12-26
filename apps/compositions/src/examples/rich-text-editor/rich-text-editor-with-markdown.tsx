"use client"

import { HStack } from "@chakra-ui/react"
import { Extension } from "@tiptap/core"
import { Markdown } from "@tiptap/markdown"
import { Plugin } from "@tiptap/pm/state"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"
import { useState } from "react"

export const RichTextEditorWithMarkdown = () => {
  const [markdownContent, setMarkdownContent] = useState(
    "# Welcome!\n\n**This is Markdown Mode**",
  )

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Markdown,
      PasteMarkdown,
    ],
    content: markdownContent,
    contentType: "markdown",
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      const md = editor.getMarkdown()
      setMarkdownContent(md)
    },
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <HStack gap="2" p="2" borderBottom="1px solid" borderColor="border">
        <HStack gap="2" wrap="nowrap">
          <RichTextEditorControlGroup>
            <Control.Bold />
            <Control.Italic />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <Control.Undo />
            <Control.Redo />
          </RichTextEditorControlGroup>
        </HStack>
      </HStack>

      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const PasteMarkdown = Extension.create({
  name: "pasteMarkdown",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (_view, event) => {
            const text = event.clipboardData?.getData("text/plain")

            if (!text) {
              return false
            }

            // Simple heuristic to check if text is likely Markdown
            const looksLikeMarkdown = (t: string) =>
              /^#{1,6}\s/.test(t) || // Headings
              /\*\*[^*]+\*\*/.test(t) || // Bold
              /\[.+\]\(.+\)/.test(t) || // Links
              /^[-*+]\s/.test(t) // Lists

            if (looksLikeMarkdown(text)) {
              event.preventDefault()

              this.editor.commands.insertContent(text, {
                contentType: "markdown",
              })
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})
