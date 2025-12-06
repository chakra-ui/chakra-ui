"use client"

import { Box, HStack, Text } from "@chakra-ui/react"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { useEditor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
  createSelectControl,
  createSwatchControl,
} from "compositions/ui/rich-text-editor"
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuCode,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuImage,
  LuItalic,
  LuLink,
  LuLink2Off,
  LuList,
  LuListChecks,
  LuListOrdered,
  LuMinus,
  LuPalette,
  LuQuote,
  LuRedo,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuUnderline,
  LuUndo,
} from "react-icons/lu"

export function RichTextEditorComposition() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyleKit,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: `
      <h1>Welcome to Your Document</h1>
      <p>This is a <strong>Google Docs-style</strong> editor built with <em>Chakra UI</em> and <u>Tiptap</u>. Select text to see the bubble menu appear!</p>
      <p>You can format text with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s>.</p>
      <h2>Features Include:</h2>
      <ul>
        <li>Multiple heading levels</li>
        <li>Text formatting and colors</li>
        <li>Lists (bullet, numbered, tasks)</li>
        <li>Text alignment options</li>
        <li>Links and images</li>
      </ul>
      <p>Try selecting this text to see formatting options!</p>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  const charCount = editor.storage.characterCount?.characters?.() || 0
  const wordCount = editor.storage.characterCount?.words?.() || 0

  return (
    <Box maxW="900px" mx="auto" bg="white" shadow="md" rounded="lg">
      <RichTextEditorRoot editor={editor}>
        {editor && (
          <BubbleMenu editor={editor}>
            <HStack
              shadow="xl"
              rounded="lg"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              p="1"
              gap="1"
            >
              <RichTextEditorButtonGroup>
                <Bold />
                <Italic />
                <Underline />
                <Strike />
              </RichTextEditorButtonGroup>
              <RichTextEditorButtonGroup>
                <TextColorPicker />
              </RichTextEditorButtonGroup>
              <RichTextEditorButtonGroup>
                <LinkButton />
              </RichTextEditorButtonGroup>
            </HStack>
          </BubbleMenu>
        )}

        <Box borderBottom="1px solid" borderColor="gray.200">
          <HStack gap="2" p="3" flexWrap="wrap" bg="gray.50" roundedTop="lg">
            <RichTextEditorButtonGroup>
              <Undo />
              <Redo />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <FontFamilySelector width="140px" />
              <FontSizeSelector width="80px" />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <Bold />
              <Italic />
              <Underline />
              <Strike />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <TextColorPicker />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <LinkButton />
              <UnlinkButton />
              <ImageButton />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <AlignLeft />
              <AlignCenter />
              <AlignRight />
              <AlignJustify />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <BulletList />
              <OrderedList />
              <TaskListButton />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <H1 />
              <H2 />
              <H3 />
              <Blockquote />
              <Hr />
            </RichTextEditorButtonGroup>

            <RichTextEditorButtonGroup>
              <Code />
              <SubscriptBtn />
              <SuperscriptBtn />
            </RichTextEditorButtonGroup>
          </HStack>
        </Box>

        <RichTextEditorContent minH="600px" p={8} />

        <Box
          borderTop="1px solid"
          borderColor="gray.200"
          p={3}
          bg="gray.50"
          roundedBottom="lg"
        >
          <Text fontSize="xs" color="gray.600" textAlign="right">
            {wordCount} words • {charCount} characters
          </Text>
        </Box>
      </RichTextEditorRoot>
    </Box>
  )
}

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
  label: "Strikethrough",
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

const SubscriptBtn = createButtonControl({
  label: "Subscript",
  icon: LuSubscript,
  command: (editor) => editor.chain().focus().toggleSubscript().run(),
  getVariant: (editor) => (editor.isActive("subscript") ? "subtle" : "ghost"),
})

const SuperscriptBtn = createButtonControl({
  label: "Superscript",
  icon: LuSuperscript,
  command: (editor) => editor.chain().focus().toggleSuperscript().run(),
  getVariant: (editor) => (editor.isActive("superscript") ? "subtle" : "ghost"),
})

const H1 = createButtonControl({
  label: "Heading 1",
  icon: LuHeading1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

const H2 = createButtonControl({
  label: "Heading 2",
  icon: LuHeading2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

const H3 = createButtonControl({
  label: "Heading 3",
  icon: LuHeading3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

const BulletList = createButtonControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
})

const OrderedList = createButtonControl({
  label: "Numbered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
})

const TaskListButton = createButtonControl({
  label: "Task List",
  icon: LuListChecks,
  command: (editor) => editor.chain().focus().toggleTaskList().run(),
  getVariant: (editor) => (editor.isActive("taskList") ? "subtle" : "ghost"),
})

const Blockquote = createButtonControl({
  label: "Quote",
  icon: LuQuote,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
})

const Hr = createButtonControl({
  label: "Divider",
  icon: LuMinus,
  command: (editor) => editor.chain().focus().setHorizontalRule().run(),
})

const LinkButton = createButtonControl({
  label: "Link",
  icon: LuLink,
  command: (editor) => {
    const url = window.prompt("Enter URL:")
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run()
    }
  },
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

const UnlinkButton = createButtonControl({
  label: "Remove Link",
  icon: LuLink2Off,
  command: (editor) => editor.chain().focus().unsetLink().run(),
  isDisabled: (editor) => !editor.isActive("link"),
})

const ImageButton = createButtonControl({
  label: "Image",
  icon: LuImage,
  command: (editor) => {
    const url = window.prompt("Enter image URL:")
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  },
})

const AlignLeft = createButtonControl({
  label: "Align Left",
  icon: LuAlignLeft,
  command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
})

const AlignCenter = createButtonControl({
  label: "Align Center",
  icon: LuAlignCenter,
  command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
})

const AlignRight = createButtonControl({
  label: "Align Right",
  icon: LuAlignRight,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
})

const AlignJustify = createButtonControl({
  label: "Justify",
  icon: LuAlignJustify,
  command: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "justify" }) ? "subtle" : "ghost",
})

const Undo = createButtonControl({
  label: "Undo",
  icon: LuUndo,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
})

const Redo = createButtonControl({
  label: "Redo",
  icon: LuRedo,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
})

const FontFamilySelector = createSelectControl({
  label: "Font",
  options: [
    { value: "default", label: "Arial" },
    { value: "serif", label: "Times New Roman" },
    { value: "monospace", label: "Courier" },
    { value: "cursive", label: "Comic Sans" },
    { value: "Georgia", label: "Georgia" },
    { value: "Verdana", label: "Verdana" },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "default",
  command: (editor, value) =>
    value === "default"
      ? editor.chain().focus().unsetFontFamily().run()
      : editor.chain().focus().setFontFamily(value).run(),
})

const FontSizeSelector = createSelectControl({
  label: "Size",
  options: [
    { value: "10px", label: "10" },
    { value: "11px", label: "11" },
    { value: "12px", label: "12" },
    { value: "14px", label: "14" },
    { value: "16px", label: "16" },
    { value: "18px", label: "18" },
    { value: "20px", label: "20" },
    { value: "24px", label: "24" },
    { value: "28px", label: "28" },
    { value: "32px", label: "32" },
  ],
  getValue: (editor) => editor.getAttributes("textStyle")?.fontSize || "14px",
  command: (editor, value) =>
    editor.chain().focus().setMark("textStyle", { fontSize: value }).run(),
})

const TEXT_COLORS = [
  { label: "Black", value: "#000000", color: "#000000" },
  { label: "Dark Gray", value: "#374151", color: "#374151" },
  { label: "Gray", value: "#6B7280", color: "#6B7280" },
  { label: "Red", value: "#EF4444", color: "#EF4444" },
  { label: "Orange", value: "#F97316", color: "#F97316" },
  { label: "Yellow", value: "#EAB308", color: "#EAB308" },
  { label: "Green", value: "#22C55E", color: "#22C55E" },
  { label: "Blue", value: "#3B82F6", color: "#3B82F6" },
  { label: "Purple", value: "#A855F7", color: "#A855F7" },
  { label: "Pink", value: "#EC4899", color: "#EC4899" },
]

const TextColorPicker = createSwatchControl({
  label: "Text Color",
  swatches: TEXT_COLORS,
  getValue: (editor) => editor.getAttributes("textStyle")?.color || "#000000",
  command: (editor, color) => editor.chain().focus().setColor(color).run(),
  icon: LuPalette,
  onRemove: (editor) => editor.chain().focus().unsetColor().run(),
})
