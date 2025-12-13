"use client"

import { HStack } from "@chakra-ui/react"
import { Extension } from "@tiptap/core"
import { Markdown } from "@tiptap/markdown"
import { Plugin } from "@tiptap/pm/state"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
} from "compositions/ui/rich-text-editor"
import { useState } from "react"
import {
  LuBold,
  LuItalic,
  LuList,
  LuListOrdered,
  LuRotateCcw,
  LuRotateCw,
} from "react-icons/lu"

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
          <RichTextEditorButtonGroup>
            <Bold />
            <Italic />
          </RichTextEditorButtonGroup>

          <RichTextEditorButtonGroup>
            <BulletList />
            <OrderedList />
          </RichTextEditorButtonGroup>

          <RichTextEditorButtonGroup noSeparator>
            <Undo />
            <Redo />
          </RichTextEditorButtonGroup>
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
