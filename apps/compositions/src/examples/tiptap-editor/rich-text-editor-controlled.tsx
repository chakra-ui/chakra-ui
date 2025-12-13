"use client"

import { Center, HStack } from "@chakra-ui/react"
import { Splitter } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
  createSelectControl,
} from "compositions/ui/rich-text-editor"
import {
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuItalic,
  LuRotateCcw,
  LuRotateCw,
  LuStrikethrough,
  LuUnderline,
} from "react-icons/lu"

export const RichTextEditorControlled = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content: `
        <p>Edit here...</p>
        <p><strong>Tip:</strong> Try selecting this sentence.</p>
        <h2>Example Subheading</h2>
        <p>Here's a paragraph with <em>italic</em>, <u>underline</u>, and <strong>bold</strong> text.</p>
        <p><code>Code snippets can be inline or block-level.</code></p>
        <ul>
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
        </ul>
        <ol>
        <li>First numbered item</li>
        <li>Second numbered item</li>
        </ol>
        <blockquote>This is a blockquote example.</blockquote>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <Splitter.Root
      panels={[{ id: "editor" }, { id: "preview" }]}
      minH="60"
      borderWidth="1px"
    >
      <Splitter.Panel id="editor">
        <RichTextEditorRoot editor={editor}>
          <HStack
            wrap="nowrap"
            gap="2"
            overflowX="auto"
            p="2"
            borderBottom="1px solid"
            borderColor="border"
          >
            <RichTextEditorButtonGroup>
              <FontFamily width="200px" />
              <FontSize width="100px" />
            </RichTextEditorButtonGroup>
            <RichTextEditorButtonGroup>
              <Bold />
              <Italic />
              <Underline />
              <Strike />
              <Code />
            </RichTextEditorButtonGroup>
            <RichTextEditorButtonGroup>
              <H1 />
              <H2 />
              <H3 />
              <H4 />
            </RichTextEditorButtonGroup>
            <RichTextEditorButtonGroup noSeparator>
              <Undo />
              <Redo />
            </RichTextEditorButtonGroup>
          </HStack>

          <RichTextEditorContent minH="60" />
        </RichTextEditorRoot>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="editor:preview" />
      <Splitter.Panel id="preview" p="4">
        <Center boxSize="full">
          <div
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
            style={{ width: "100%", textAlign: "left" }}
          />
        </Center>
      </Splitter.Panel>
    </Splitter.Root>
  )
}

const FontFamily = createSelectControl({
  label: "Font Family",
  options: [
    { value: "default", label: "Default" },
    { value: "serif", label: "Serif" },
    { value: "mono", label: "Monospace" },
    { value: "cursive", label: "Cursive" },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "default",
  command: (editor, value) =>
    value === "default"
      ? editor.chain().focus().unsetFontFamily().run()
      : editor.chain().focus().setFontFamily(value).run(),
})

const FontSize = createSelectControl({
  label: "Font Size",
  options: [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ],
  getValue: (editor) => editor.getAttributes("textStyle")?.fontSize || "14px",
  command: (editor, value) =>
    editor.chain().focus().setMark("textStyle", { fontSize: value }).run(),
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

const Underline = createButtonControl({
  label: "Underline",
  icon: LuUnderline,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
})

const Strike = createButtonControl({
  label: "Strike",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
})

const Code = createButtonControl({
  label: "Code",
  icon: LuCode,
  command: (editor) => editor.chain().focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive("code") ? "subtle" : "ghost"),
})

const H1 = createButtonControl({
  label: "H1",
  icon: LuHeading1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

const H2 = createButtonControl({
  label: "H2",
  icon: LuHeading2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

const H3 = createButtonControl({
  label: "H3",
  icon: LuHeading3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

const H4 = createButtonControl({
  label: "H4",
  icon: LuHeading4,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 4 }) ? "subtle" : "ghost",
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
