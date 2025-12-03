"use client"

import { HStack } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { useEditor } from "@tiptap/react"
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
  LuHeading4,
  LuItalic,
  LuLink,
  LuLink2,
  LuList,
  LuListOrdered,
  LuMinus,
  LuPalette,
  LuQuote,
  LuRotateCcw,
  LuRotateCw,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuUnderline,
} from "react-icons/lu"

export function RichTextEditorBasic() {
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
    <RichTextEditorRoot
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <HStack
        wrap="nowrap"
        gap="2"
        p="2"
        borderBottom="1px solid"
        borderColor="border"
        overflowX="auto"
      >
        <RichTextEditorButtonGroup>
          <FontFamilySelector width="200px" />
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

        <RichTextEditorButtonGroup>
          <BulletList />
          <OrderedList />
          <Blockquote />
          <Hr />
          <SubscriptBtn />
          <SuperscriptBtn />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup>
          <ColorPicker rounded="full" />
          <Link />
          <Unlink />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup>
          <AlignLeft />
          <AlignCenter />
          <AlignJustify />
          <AlignRight />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup noSeparator>
          <Undo />
          <Redo />
        </RichTextEditorButtonGroup>
      </HStack>

      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const FontFamilySelector = createSelectControl({
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

const Blockquote = createButtonControl({
  label: "Blockquote",
  icon: LuQuote,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
})

const Hr = createButtonControl({
  label: "Horizontal Rule",
  icon: LuMinus,
  command: (editor) => editor.chain().focus().setHorizontalRule().run(),
})

const Link = createButtonControl({
  label: "Link",
  icon: LuLink,
  command: (editor) => {
    const url = window.prompt("Enter URL")
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run()
  },
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
})

const Unlink = createButtonControl({
  label: "Unlink",
  icon: LuLink2,
  command: (editor) => editor.chain().focus().unsetLink().run(),
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

const AlignJustify = createButtonControl({
  label: "Align Justify",
  icon: LuAlignJustify,
  command: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "justify" }) ? "subtle" : "ghost",
})

const AlignRight = createButtonControl({
  label: "Align Right",
  icon: LuAlignRight,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
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

const BASIC_SWATCHES = [
  { label: "Black", value: "#000000", color: "#000000" },
  { label: "Red", value: "#FF0000", color: "#FF0000" },
  { label: "Green", value: "#00FF00", color: "#00FF00" },
  { label: "Blue", value: "#0000FF", color: "#0000FF" },
  { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
  { label: "Purple", value: "#800080", color: "#800080" },
  { label: "Orange", value: "#FFA500", color: "#FFA500" },
]

const ColorPicker = createSwatchControl({
  label: "Text Color",
  swatches: BASIC_SWATCHES,
  getValue: (editor) => editor.getAttributes("textStyle")?.color || "#000000",
  command: (editor, color) =>
    editor.chain().focus().setMark("textStyle", { color }).run(),
  icon: LuPalette,
  onRemove: (editor) => editor.chain().focus().unsetMark("textStyle").run(),
})
