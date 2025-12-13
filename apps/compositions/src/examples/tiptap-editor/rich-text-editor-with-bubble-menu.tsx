import { HStack, Text } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
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
  LuItalic,
  LuList,
  LuListOrdered,
  LuMinus,
  LuStrikethrough,
  LuUnderline,
} from "react-icons/lu"

export const RichTextEditorWithBubbleMenu = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: sampleContent,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot editor={editor} borderWidth="1px" rounded="lg">
      {editor && (
        <BubbleMenu editor={editor}>
          <HStack shadow="lg" rounded="lg" bg="bg" p="1" gap="1">
            <RichTextEditorButtonGroup>
              <ParagraphSelect minWidth="120px" />
            </RichTextEditorButtonGroup>
            <RichTextEditorButtonGroup>
              <Bold />
              <Italic />
              <UnderlineControl />
              <Strike />
            </RichTextEditorButtonGroup>
            <RichTextEditorButtonGroup noSeparator>
              <BulletList />
              <OrderedList />
            </RichTextEditorButtonGroup>
          </HStack>
        </BubbleMenu>
      )}
      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const sampleContent = `
  <h2>Select some text in this paragraph to see the bubble menu!</h2>
  <p>The <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, and <strike>Strikethrough</strike> controls will appear. You can also change the block type here.</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <ul>
    <li>Try selecting text within this list item.</li>
    <li>Use the list buttons to switch between bullet and ordered lists.</li>
  </ul>
`

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

const UnderlineControl = createButtonControl({
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

const blockOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading1", label: "Heading 1" },
  { value: "heading2", label: "Heading 2" },
  { value: "heading3", label: "Heading 3" },
  { value: "blockquote", label: "Quote" },
  { value: "horizontalRule", label: "Divider", icon: <LuMinus /> },
]

const ParagraphSelect = createSelectControl({
  label: "Block Type",
  placeholder: "Paragraph",
  options: blockOptions,
  getValue: (editor) => {
    if (editor.isActive("heading", { level: 1 })) return "heading1"
    if (editor.isActive("heading", { level: 2 })) return "heading2"
    if (editor.isActive("heading", { level: 3 })) return "heading3"
    if (editor.isActive("blockquote")) return "blockquote"
    return "paragraph"
  },
  command: (editor, value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run()
    } else if (value === "heading1") {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    } else if (value === "heading2") {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    } else if (value === "heading3") {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    } else if (value === "blockquote") {
      editor.chain().focus().toggleBlockquote().run()
    } else if (value === "horizontalRule") {
      editor.chain().focus().setHorizontalRule().run()
    }
  },
  renderValue: (value, option) => {
    const textStyle: any = {
      paragraph: { fontWeight: "normal", fontSize: "sm" },
      heading1: { fontWeight: "bold", fontSize: "lg" },
      heading2: { fontWeight: "semibold", fontSize: "md" },
      heading3: { fontWeight: "medium", fontSize: "sm" },
      blockquote: { fontStyle: "italic", fontSize: "sm" },
      horizontalRule: { fontWeight: "medium", fontSize: "sm" },
    }
    return <Text {...textStyle[value]}>{option?.label || "Paragraph"}</Text>
  },
})
