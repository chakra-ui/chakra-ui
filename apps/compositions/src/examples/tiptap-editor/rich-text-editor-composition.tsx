import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { Editor, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Avatar } from "compositions/ui/avatar"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
  createSelectControl,
} from "compositions/ui/rich-text-editor"
import {
  LuChevronDown,
  LuFileText,
  LuLock,
  LuMessageSquare,
  LuSearch,
  LuStar,
  LuVideo,
} from "react-icons/lu"
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuBold,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuImage,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuRotateCcw,
  LuRotateCw,
  LuStrikethrough,
  LuUnderline,
} from "react-icons/lu"

export const RichTextEditorComposition = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextStyleKit,
      Color,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: `
      <h1 id="heading-0">Legend Of X: The Complete Saga</h1>
      <p>In a world where technology and humanity collide, the fate of civilization hangs in the balance. This is the story of those who dared to question everything they knew.</p>

      <h2 id="heading-1">Chapter 1: Awakening</h2>
      <p>The city of Neo-Tokyo stretched endlessly beneath the artificial sky. Maya Tanaka stood at the edge of the observation deck, watching the streams of data flow through the neural network that powered the megacity. She had always believed the System was infallible, that the Architects who built it had created a perfect world.</p>
      <p>But something was wrong. The anomalies in the code were becoming more frequent, more deliberate. Someone—or something—was trying to break through.</p>

      <h3 id="heading-2">Part 1: The First Glitch</h3>
      <p>It started with small things. A flicker in the holographic displays. A delay in the transportation grid. Messages that appeared and disappeared before anyone could read them. Maya had noticed these irregularities for weeks, but she was afraid to report them. In Neo-Tokyo, questioning the System was considered treason.</p>
      <p>One evening, as she worked late in the Neural Operations Center, the main screen went black. Then, slowly, text began to appear: "They are watching. They have always been watching. Find the Archive before it's too late."</p>
      <p>Maya's heart raced. The Archive was a myth, a legend whispered about in underground forums. It was said to contain the truth about the world before the Great Collapse, before the Architects took control. But accessing it would mean going against everything she had been taught.</p>

      <h3 id="heading-3">Part 2: The Underground</h3>
      <p>The next day, Maya received an encrypted message directing her to an abandoned sector of the city. She knew it was dangerous, but curiosity overwhelmed her caution. The meeting place was a decrepit building, its walls covered in graffiti that depicted symbols she didn't recognize.</p>
      <p>Inside, she found a group of people huddled around old terminals. They called themselves the Disconnected—those who had rejected the neural implants that connected everyone to the System. Their leader, a man named Kenzo, explained that the glitches were intentional.</p>
      <p>"We're trying to wake people up," he said. "The System isn't what you think it is. The Architects didn't save humanity—they enslaved it."</p>

      <h2 id="heading-4">Chapter 2: The Archive</h2>
      <p>Maya's decision to join the Disconnected changed everything. Kenzo taught her how to navigate the hidden layers of the System, the forgotten protocols and backdoors that the Architects thought they had sealed. Together, they began their search for the Archive.</p>
      <p>The journey took them through the darkest corners of Neo-Tokyo. They encountered other groups of rebels, each with their own theories about what the Archive contained. Some believed it held the key to shutting down the System entirely. Others thought it was a weapon that could be used to take control.</p>

      <h3 id="heading-5">Part 3: Revelations</h3>
      <p>After months of searching, they found it. The Archive wasn't a physical location—it was a fragment of code hidden in the deepest layer of the System, protected by encryption so complex that even the Architects had lost access to it.</p>
      <p>When Maya finally broke through the encryption, what she found shocked her. The Archive contained memories—thousands of them, uploaded from the minds of people who had lived before the Great Collapse. They revealed a truth that the Architects had hidden: the Collapse had been engineered.</p>
      <p>The Architects had created the disaster that destroyed the old world so they could rebuild it in their image. And now, they were planning to do it again.</p>

      <h2 id="heading-6">Chapter 3: Resistance</h2>
      <p>Armed with the truth, Maya and the Disconnected began spreading the Archive's contents throughout the city. The response was immediate. Some people refused to believe it, clinging to their faith in the System. Others joined the resistance, ready to fight for their freedom.</p>
      <p>The Architects responded with force. Security drones filled the streets, hunting down anyone suspected of accessing the Archive. The city descended into chaos as the battle between the Disconnected and the System's defenders intensified.</p>

      <h3 id="heading-7">Part 4: The Final Stand</h3>
      <p>Maya knew they couldn't win through violence alone. The System was too powerful, too entrenched. Instead, she devised a plan to use the Archive itself as a weapon. If they could upload its contents directly into the neural network, everyone connected to the System would see the truth simultaneously.</p>
      <p>The operation was risky. It required infiltrating the Central Node, the heart of the System's infrastructure. Many of the Disconnected would have to sacrifice themselves to create a distraction. But it was their only chance.</p>
      <p>As Maya stood before the Central Node's interface, her fingers trembling over the controls, she thought about all the lives that had been lost, all the lies that had been told. With one final command, she initiated the upload.</p>

      <h2 id="heading-8">Epilogue: A New Beginning</h2>
      <p>The System didn't collapse overnight. But once people knew the truth, they began to question, to resist, to rebuild. Maya watched from a rooftop as the artificial sky flickered and went dark for the first time in decades, revealing the stars above.</p>
      <p>The world would never be perfect. But it would be real. And that, she thought, was worth fighting for.</p>
    `,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot
      editor={editor}
      shadow="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
    >
      <GoogleDocsHeader />
      <Toolbar />
      <HStack
        borderTop="1px solid"
        borderColor="border"
        flex="1"
        mt="4"
        alignItems="stretch"
        gap={0}
        overflow="hidden"
      >
        <Box
          w="280px"
          borderRight="1px solid"
          borderColor="border"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <SidebarOutline editor={editor} />
        </Box>
        <Flex flex="1" justifyContent="center" overflowY="auto">
          <RichTextEditorContent px={16} py={12} />
        </Flex>
      </HStack>
    </RichTextEditorRoot>
  )
}

const GoogleDocsHeader = () => {
  const menuItems = [
    "File",
    "Edit",
    "View",
    "Insert",
    "Format",
    "Tools",
    "Extensions",
    "Help",
  ]

  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between">
      <HStack gap={3} align="flex-start">
        <Icon as={LuFileText} color="blue.500" boxSize={8} mt={1} />

        <VStack align="flex-start" gap={0}>
          <HStack gap={2}>
            <Text fontSize="lg">Legend Of X: The Complete Saga</Text>
            <IconButton variant="ghost" size="xs" color="gray.500">
              <LuStar size={16} />
            </IconButton>
          </HStack>

          <HStack gap={3}>
            {menuItems.map((item) => (
              <Text
                key={item}
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                px={2}
                py={1}
                rounded="sm"
              >
                {item}
              </Text>
            ))}
          </HStack>
        </VStack>
      </HStack>

      <HStack gap={4}>
        <IconButton variant="ghost">
          <LuMessageSquare size={20} />
        </IconButton>

        <HStack gap={0}>
          <IconButton variant="ghost">
            <LuVideo size={20} />
          </IconButton>
          <IconButton variant="ghost" size="xs">
            <LuChevronDown size={14} />
          </IconButton>
        </HStack>

        <Button borderRadius="full" px={6} gap={2} colorPalette="blue">
          <LuLock size={14} />
          Share
        </Button>

        <Avatar
          fallback={<Text fontSize="sm">SA</Text>}
          name="Segun Adebayo"
          src="https://bit.ly/sage-adebayo"
        />
      </HStack>
    </Flex>
  )
}

const Toolbar = () => {
  return (
    <Box px={4}>
      <HStack
        bg="bg.muted"
        p={2}
        gap={1}
        rounded="50px"
        mt="4"
        overflowX="auto"
      >
        <IconButton variant="ghost" size="sm">
          <LuSearch />
        </IconButton>

        <RichTextEditorButtonGroup>
          <UndoBtn />
          <RedoBtn />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup>
          <FontFamilySelector width="140px" />
          <FontSize width="80px" />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup>
          <BoldBtn />
          <ItalicBtn />
          <UnderlineBtn />
          <StrikeBtn />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup noSeparator>
          <H1Btn />
          <H2Btn />
          <H3Btn />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup noSeparator>
          <AlignLeftBtn />
          <AlignCenterBtn />
          <AlignRightBtn />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup noSeparator>
          <BulletListBtn />
          <OrderedListBtn />
        </RichTextEditorButtonGroup>

        <RichTextEditorButtonGroup noSeparator>
          <LinkBtn />
          <ImageBtn />
        </RichTextEditorButtonGroup>
      </HStack>
    </Box>
  )
}

const SidebarOutline = ({ editor }: { editor: Editor }) => {
  if (!editor) return null

  const headings = editor
    .getJSON()
    .content?.filter((b) => b.type === "heading")
    .map((h, i) => ({
      level: h.attrs?.level || 1,
      text: h.content?.map((c) => (c as any).text).join("") || "",
      id: `heading-${i}`,
    }))

  const getPaddingLeft = (level: number = 1) => {
    return (level - 1) * 16 + 4
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <VStack align="stretch" gap={0} h="full">
      <HStack
        justify="space-between"
        align="center"
        p={4}
        borderBottom="1px solid"
        borderColor="border"
        flexShrink={0}
      >
        <Text fontWeight="medium" fontSize="sm">
          Document outline
        </Text>
        <IconButton variant="ghost" size="xs" aria-label="Options">
          <Icon as={LuChevronDown} />
        </IconButton>
      </HStack>

      <VStack align="stretch" gap={1} p={2} overflowY="auto" flex="1">
        {headings?.map((h) => (
          <Button
            key={h.id}
            variant="ghost"
            size="sm"
            pl={`${getPaddingLeft(h.level)}px`}
            py={2}
            onClick={() => scrollToHeading(h.id)}
            lineClamp="1"
            truncate
          >
            <Icon
              as={LuFileText}
              mr={2}
              flexShrink={0}
              color="gray.500"
              boxSize={4}
            />
            {h.text}
          </Button>
        ))}
      </VStack>
    </VStack>
  )
}

const BoldBtn = createButtonControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
})

const ItalicBtn = createButtonControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
})

const UnderlineBtn = createButtonControl({
  label: "Underline",
  icon: LuUnderline,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
})

const StrikeBtn = createButtonControl({
  label: "Strike",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
})

const H1Btn = createButtonControl({
  label: "H1",
  icon: LuHeading1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

const H2Btn = createButtonControl({
  label: "H2",
  icon: LuHeading2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

const H3Btn = createButtonControl({
  label: "H3",
  icon: LuHeading3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

const BulletListBtn = createButtonControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
})

const OrderedListBtn = createButtonControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
})

const LinkBtn = createButtonControl({
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

const ImageBtn = createButtonControl({
  label: "Image",
  icon: LuImage,
  command: (editor) => {
    const url = window.prompt("Enter Image URL")
    if (url) editor.chain().focus().setImage({ src: url }).run()
  },
})

const AlignLeftBtn = createButtonControl({
  label: "Align Left",
  icon: LuAlignLeft,
  command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
})

const AlignCenterBtn = createButtonControl({
  label: "Align Center",
  icon: LuAlignCenter,
  command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
})

const AlignRightBtn = createButtonControl({
  label: "Align Right",
  icon: LuAlignRight,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
})

const UndoBtn = createButtonControl({
  label: "Undo",
  icon: LuRotateCcw,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
})

const RedoBtn = createButtonControl({
  label: "Redo",
  icon: LuRotateCw,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
})

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
