"use client"

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Separator } from "@chakra-ui/react"
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
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
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
  LuArrowLeft,
  LuBold,
  LuChevronDown,
  LuCode,
  LuDownload,
  LuFileText,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHistory,
  LuImage,
  LuItalic,
  LuLink,
  LuLink2Off,
  LuList,
  LuListChecks,
  LuListOrdered,
  LuListTree,
  LuMail,
  LuMenu,
  LuMinus,
  LuMove,
  LuPaintBucket,
  LuPalette,
  LuPrinter,
  LuQuote,
  LuRedo,
  // LuCloudCheck,
  LuShare2,
  LuStar,
  LuStrikethrough,
  LuSubscript,
  LuSuperscript,
  LuUnderline,
  LuUndo,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu"

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
    { value: "Arial", label: "Arial" },
    { value: "serif", label: "Times New Roman" },
    { value: "monospace", label: "Courier" },
    { value: "cursive", label: "Comic Sans" },
    { value: "Georgia", label: "Georgia" },
    { value: "Verdana", label: "Verdana" },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "Arial",
  command: (editor, value) =>
    value === "Arial"
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

const StyleSelector = createSelectControl({
  label: "Styles",
  options: [
    { value: "paragraph", label: "Normal text" },
    { value: "heading1", label: "Heading 1" },
    { value: "heading2", label: "Heading 2" },
    { value: "heading3", label: "Heading 3" },
  ],
  getValue: (editor) => {
    if (editor.isActive("heading", { level: 1 })) return "heading1"
    if (editor.isActive("heading", { level: 2 })) return "heading2"
    if (editor.isActive("heading", { level: 3 })) return "heading3"
    return "paragraph"
  },
  command: (editor, value) => {
    if (value === "paragraph") editor.chain().focus().setParagraph().run()
    if (value === "heading1")
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    if (value === "heading2")
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    if (value === "heading3")
      editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
})

const ZoomSelector = createSelectControl({
  label: "Zoom",
  options: [
    { value: "50%", label: "50%" },
    { value: "75%", label: "75%" },
    { value: "100%", label: "100%" },
    { value: "125%", label: "125%" },
    { value: "150%", label: "150%" },
  ],
  getValue: () => "100%",
  command: (editor, value) => console.log("Zoom changed to", value),
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

const DocsMenu = ({ label, children }) => (
  <MenuRoot>
    <MenuTrigger asChild>
      <Box
        as="button"
        px="2"
        py="1"
        fontSize="sm"
        rounded="sm"
        _hover={{ bg: "gray.100" }}
      >
        {label}
      </Box>
    </MenuTrigger>
    <MenuContent>{children}</MenuContent>
  </MenuRoot>
)

const SidebarOutline = () => (
  <VStack
    w="280px"
    h="full"
    bg="white"
    borderEnd="1px solid"
    borderColor="gray.200"
    gap="0"
    align="stretch"
    flexShrink={0}
  >
    <HStack p="4" borderBottom="1px solid" borderColor="gray.200" gap="2">
      <LuArrowLeft size={16} cursor="pointer" />
      <Text fontSize="md" fontWeight="semibold" color="gray.700">
        Legend Of X
      </Text>
    </HStack>

    <Box p="4" borderBottom="1px solid" borderColor="gray.200">
      <HStack gap="2">
        <LuListTree size={16} color="gray.500" />
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          Outline
        </Text>
      </HStack>
    </Box>

    <VStack align="stretch" p="4" gap="1">
      <Text
        fontSize="sm"
        color="blue.600"
        cursor="pointer"
        _hover={{ bg: "blue.50" }}
        px="2"
        py="1"
        rounded="sm"
        fontWeight="medium"
      >
        — Chapter 1: Awakening
      </Text>
      <VStack align="stretch" pl="4" gap="1">
        <Text fontSize="sm" color="gray.700" pl="2" py="0.5">
          — Part 1: Androids
        </Text>
        <Text
          fontSize="sm"
          color="purple.600"
          pl="2"
          py="0.5"
          cursor="pointer"
          _hover={{ bg: "purple.50" }}
          bg="purple.50"
          rounded="sm"
          fontWeight="medium"
        >
          — Part 2: Electric Sheeps
        </Text>
        <Text fontSize="sm" color="gray.700" pl="2" py="0.5">
          — Part 3: Encounter
        </Text>
      </VStack>
      <Text fontSize="sm" color="gray.700" px="2" py="1">
        — Chapter 2: Reborn
      </Text>
    </VStack>
  </VStack>
)

export const RichTextEditorComposition = () => {
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
        HTMLAttributes: { class: "text-blue-700 underline" },
      }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: `
      <h1 style="text-align: center;">Legend Of X</h1>
      <h2>Chapter 1: Awakening</h2>
      <p>Lorem ipsum dolor sit amet consectetur. In lorem varius non arcu eget. Odio odio placerat sit enim pretium sed risus vitae. Velit egestas montes convallis cras venenatis sed. Fermentum tristique ultrices eleifend tincidunt et. Aenean consequat congue ullamcorper vitae in cras vitae lectus malesuada cursus.</p>
      <p>Facilisis fames commodo enim vivamus cursus eget eu. Tristique platea duis et tristique ultrices dui diam nunc. Mauris elementum senectus tristique ultrices eleifend tincidunt et. Egestas urna mauris elementum eu fames feugiat lacus platea.</p>
      <h3>Part 1: Androids</h3>
      <p>Lorem ipsum dolor sit amet consectetur. At feugiat ac placerat habitant nec sed ultrices. Rutrum massa ipsum bibendum ac at feugiat felis ante. Purus leo volutpat nulla ut faucibus duis at purus. Sed pretium ut at enim.</p>
      <h3>Part 2: Electric Sheeps</h3>
      <p>Lorem ipsum dolor sit amet consectetur. At feugiat ac placerat habitant nec sed ultrices. Rutrum massa ipsum bibendum ac at feugiat felis ante. Purus leo volutpat nulla ut faucibus duis at purus. Sed pretium ut at enim.</p>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  const docsBlue = "#1A73E8"

  return (
    <Flex w="full" h="100vh" bg="gray.50">
      <SidebarOutline />

      <VStack flex="1" align="stretch" gap="0">
        <RichTextEditorRoot editor={editor}>
          {editor && (
            <BubbleMenu editor={editor}>
              <HStack
                shadow="lg"
                rounded="md"
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                p="1"
                gap="0"
              >
                <RichTextEditorButtonGroup noSeparator>
                  <Bold />
                  <Italic />
                  <Underline />
                  <Strike />
                </RichTextEditorButtonGroup>
                <Separator orientation="vertical" h="6" mx="1" />
                <RichTextEditorButtonGroup noSeparator>
                  <TextColorPicker />
                </RichTextEditorButtonGroup>
                <Separator orientation="vertical" h="6" mx="1" />
                <RichTextEditorButtonGroup noSeparator>
                  <LinkButton />
                </RichTextEditorButtonGroup>
              </HStack>
            </BubbleMenu>
          )}

          <Box
            bg="white"
            borderBottom="1px solid"
            borderColor="gray.200"
            w="full"
            zIndex="2"
          >
            <HStack
              px="4"
              py="2"
              gap="4"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <HStack gap="2">
                <LuFileText size={40} color={docsBlue} />
                <VStack align="flex-start" gap="0">
                  <HStack gap="2">
                    <Input
                      defaultValue="Untitled Document"
                      variant="outline"
                      fontWeight="medium"
                      fontSize="md"
                      w="180px"
                      p="0"
                    />
                    <IconButton size="xs" variant="ghost" aria-label="Star">
                      <LuStar size={18} />
                    </IconButton>
                    <IconButton size="xs" variant="ghost" aria-label="Move">
                      <LuMove size={18} />
                    </IconButton>
                    <IconButton size="xs" variant="ghost" aria-label="Cloud">
                      {/* <LuCloudCheck size={18} /> */}
                    </IconButton>
                  </HStack>
                  <HStack gap="1">
                    <DocsMenu label="File">
                      <MenuItem value="download">
                        <LuDownload size={16} /> Download
                      </MenuItem>
                      <MenuItem value="email">
                        <LuMail size={16} /> Email
                      </MenuItem>
                    </DocsMenu>
                    <DocsMenu label="Edit">
                      <MenuItem
                        value="undo"
                        onClick={() => editor.chain().focus().undo().run()}
                      >
                        Undo
                      </MenuItem>
                      <MenuItem
                        value="redo"
                        onClick={() => editor.chain().focus().redo().run()}
                      >
                        Redo
                      </MenuItem>
                    </DocsMenu>
                    <DocsMenu label="View">
                      <MenuItem value="outline">
                        <LuMenu size={16} /> Show Outline
                      </MenuItem>
                      <MenuItem value="viewers">
                        <LuUsers size={16} /> Viewers
                      </MenuItem>
                    </DocsMenu>
                    <DocsMenu label="Insert">
                      <MenuItem value="image">Image</MenuItem>
                    </DocsMenu>
                    <DocsMenu label="Format">
                      <MenuItem value="text">Text</MenuItem>
                    </DocsMenu>
                    <DocsMenu label="Tools">
                      <MenuItem value="word">Word count</MenuItem>
                    </DocsMenu>
                    <DocsMenu label="Extensions">
                      <MenuItem value="addons">Add-ons</MenuItem>
                    </DocsMenu>
                    <DocsMenu label="Help">
                      <MenuItem value="help">Docs Help</MenuItem>
                    </DocsMenu>
                  </HStack>
                </VStack>
              </HStack>
              <Spacer />
              <HStack gap="3">
                <IconButton size="sm" variant="ghost" aria-label="History">
                  <LuHistory size={20} />
                </IconButton>
                <IconButton size="sm" variant="ghost" aria-label="Add user">
                  <LuUserPlus size={20} />
                </IconButton>
                <Box
                  as="button"
                  bg={docsBlue}
                  color="white"
                  px="5"
                  py="2"
                  rounded="full"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{ bg: "blue.700" }}
                  shadow="sm"
                >
                  <HStack gap="2">
                    <LuShare2 size={16} />
                    <Text>Share</Text>
                  </HStack>
                </Box>
              </HStack>
            </HStack>

            <HStack px="3" py="1.5" gap="1" bg="white" flexWrap="wrap">
              <RichTextEditorButtonGroup noSeparator>
                <Undo />
                <Redo />
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <IconButton size="xs" variant="ghost" aria-label="Print">
                  <LuPrinter size={18} />
                </IconButton>
                <IconButton
                  size="xs"
                  variant="ghost"
                  aria-label="Format painter"
                >
                  <LuPaintBucket size={18} />
                </IconButton>
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <Box w="90px">
                  <ZoomSelector />
                </Box>
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <Box w="140px">
                  <StyleSelector />
                </Box>
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <Box w="120px">
                  <FontFamilySelector />
                </Box>
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <Box w="70px">
                  <FontSizeSelector />
                </Box>
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <Bold />
                <Italic />
                <Underline />
                <TextColorPicker />
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <LinkButton />
                <ImageButton />
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <AlignLeft />
                <AlignCenter />
                <AlignRight />
                <AlignJustify />
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <BulletList />
                <OrderedList />
                <TaskListButton />
              </RichTextEditorButtonGroup>
              <Separator orientation="vertical" height="6" mx="1" />

              <RichTextEditorButtonGroup noSeparator>
                <IconButton size="xs" variant="ghost" aria-label="More options">
                  <LuMenu size={18} />
                </IconButton>
              </RichTextEditorButtonGroup>
            </HStack>
          </Box>

          <Box w="full" h="full" overflowY="auto" bg="gray.50" pt="8" pb="16">
            <Box
              w="full"
              maxW="8.5in"
              minH="11in"
              bg="white"
              shadow="md"
              mx="auto"
              px="96px"
              py="96px"
              border="1px solid"
              borderColor="gray.200"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <RichTextEditorContent minH="600px" p={0} />
            </Box>
          </Box>
        </RichTextEditorRoot>
      </VStack>
    </Flex>
  )
}
