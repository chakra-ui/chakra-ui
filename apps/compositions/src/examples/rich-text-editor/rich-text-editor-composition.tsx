"use client"

import {
  Box,
  Button,
  Dialog,
  FileUpload,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Portal,
  Switch,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import Color from "@tiptap/extension-color"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyleKit } from "@tiptap/extension-text-style"
import { Plugin } from "@tiptap/pm/state"
import { Editor, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Avatar } from "compositions/ui/avatar"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"
import {
  RichTextEditor,
  type RichTextEditorControlProps,
  createBooleanControl,
  createSelectControl,
  useRichTextEditorContext,
} from "compositions/ui/rich-text-editor"
import { forwardRef, useEffect, useState } from "react"
import {
  LuChevronDown,
  LuCircleHelp,
  LuFileText,
  LuLock,
  LuMessageSquare,
  LuSearch,
  LuStar,
  LuUpload,
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
import {
  LuArrowRight,
  LuCopy,
  LuDownload,
  LuFolder,
  LuPlus,
  LuSettings,
} from "react-icons/lu"

export const RichTextEditorComposition = () => {
  const [linkBubblePosition, setLinkBubblePosition] = useState<{
    top: number
    left: number
  } | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      HeadingWithSlug.configure({ levels: [1, 2, 3] }),
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
    content: editorContent,
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("link")) {
        const { from } = editor.state.selection
        const domAtPos = editor.view.domAtPos(from)
        const node = domAtPos.node as HTMLElement
        const linkElement =
          node.nodeType === Node.TEXT_NODE ? node.parentElement : node

        if (linkElement && linkElement.tagName === "A") {
          const rect = linkElement.getBoundingClientRect()
          setLinkBubblePosition({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX + rect.width / 2,
          })
        }
      } else {
        setLinkBubblePosition(null)
      }
    },
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root
      editor={editor}
      shadow="sm"
      h="100vh"
      display="flex"
      flexDirection="column"
      css={{
        "--content-padding-x": "spacing.16",
        "--content-padding-y": "spacing.12",
      }}
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
        <Flex
          flex="1"
          justifyContent="center"
          overflowY="auto"
          position="relative"
        >
          <RichTextEditor.Content />
          {linkBubblePosition && (
            <LinkBubbleMenu
              editor={editor}
              position={linkBubblePosition}
              onClose={() => setLinkBubblePosition(null)}
            />
          )}
        </Flex>
      </HStack>
    </RichTextEditor.Root>
  )
}

const LinkBubbleMenu = ({
  editor,
  position,
  onClose,
}: {
  editor: Editor
  position: { top: number; left: number }
  onClose: () => void
}) => {
  const [url, setUrl] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const attrs = editor.getAttributes("link")
    setUrl(attrs.href || "")
  }, [editor])

  const handleSave = () => {
    if (url.trim()) {
      const isValid = /^https?:\/\//i.test(url.trim())
      const finalUrl = isValid ? url.trim() : `https://${url.trim()}`
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl })
        .run()
    }
    setIsEditing(false)
  }

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run()
    onClose()
  }

  return (
    <Box
      position="fixed"
      top={`${position.top}px`}
      left={`${position.left}px`}
      transform="translateX(-50%)"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      borderWidth="1px"
      p={3}
      zIndex={1000}
      minW="280px"
    >
      {isEditing ? (
        <VStack gap={2} align="stretch">
          <Input
            size="sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") setIsEditing(false)
            }}
          />
          <HStack justify="flex-end" gap={2}>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button size="xs" colorPalette="blue" onClick={handleSave}>
              Save
            </Button>
          </HStack>
        </VStack>
      ) : (
        <VStack gap={2} align="stretch">
          <HStack justify="space-between">
            <Text
              fontSize="sm"
              lineClamp={1}
              truncate
              flex="1"
              color="blue.600"
            >
              {url}
            </Text>
          </HStack>
          <HStack gap={2}>
            <Button
              size="xs"
              variant="outline"
              onClick={() => setIsEditing(true)}
              flex="1"
            >
              Edit
            </Button>
            <Button
              size="xs"
              variant="outline"
              colorPalette="red"
              onClick={handleRemove}
              flex="1"
            >
              Remove
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  )
}

const GoogleDocsHeader = () => {
  return (
    <Flex px={4} py={2} alignItems="center" justifyContent="space-between">
      <HStack gap={3} align="flex-start">
        <Icon as={LuFileText} color="blue.500" boxSize={8} mt={1} />

        <VStack align="flex-start" gap={0}>
          <HStack gap={2}>
            <Text fontSize="lg" fontWeight="semibold">
              Legend Of X: The Complete Saga
            </Text>
            <IconButton variant="ghost" size="xs" color="gray.500">
              <LuStar size={16} />
            </IconButton>
          </HStack>

          <HStack gap={3}>
            {menuItems.map((menu) => (
              <MenuRoot key={menu.label}>
                <MenuTrigger>
                  <Button fontSize="sm" px={2} py={1} variant="ghost" size="xs">
                    {menu.label}
                  </Button>
                </MenuTrigger>

                <MenuContent minW="200px" py={1}>
                  {menu.items.map((item) => (
                    <MenuItem
                      value={item.label}
                      key={item.label}
                      gap={3}
                      cursor="button"
                    >
                      <HStack gap={3} align="center">
                        <Icon as={() => item.icon} boxSize={4} />
                        <Text fontSize="sm">{item.label}</Text>
                      </HStack>
                    </MenuItem>
                  ))}
                </MenuContent>
              </MenuRoot>
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

        <RichTextEditor.ControlGroup>
          <UndoBtn />
          <RedoBtn />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <FontFamilySelector width="140px" />
          <FontSize width="80px" />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <BoldBtn />
          <ItalicBtn />
          <UnderlineBtn />
          <StrikeBtn />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <H1Btn />
          <H2Btn />
          <H3Btn />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <AlignLeftBtn />
          <AlignCenterBtn />
          <AlignRightBtn />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <BulletListBtn />
          <OrderedListBtn />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <LinkControl />
          <InsertImageControl />
        </RichTextEditor.ControlGroup>
      </HStack>
    </Box>
  )
}

const SidebarOutline = ({ editor }: { editor: Editor }) => {
  if (!editor) return null

  const headings: { level: number; text: string; id: string }[] = []

  if (editor.getJSON().content) {
    editor.getJSON().content.forEach((node, i) => {
      if (node.type === "heading") {
        const { attrs = {}, content = [] } = node
        const level = attrs.level ?? 1
        const id = attrs.id ?? `heading-${i}`
        const text = content.map((c: any) => c.text).join("") ?? ""
        headings.push({ level, text, id })
      }
    })
  }

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
        {headings.length === 0 ? (
          <Text fontSize="sm" textAlign="center" p={4}>
            Headings you add to the document will appear here
          </Text>
        ) : (
          headings.map((h) => (
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
          ))
        )}
      </VStack>
    </VStack>
  )
}

const LinkControl = forwardRef<
  HTMLButtonElement,
  Omit<RichTextEditorControlProps, "icon" | "label">
>(function LinkControl(props, ref) {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [external, setExternal] = useState(false)
  const [position, setPosition] = useState<{
    top: number
    left: number
  } | null>(null)

  if (!editor) return null

  const handleOpen = () => {
    const markAttrs = editor.getAttributes("link")
    setUrl(markAttrs.href ?? "")
    setExternal(markAttrs.target === "_blank")

    // Get cursor position
    const { from } = editor.state.selection
    const coords = editor.view.coordsAtPos(from)

    console.log("coords", coords)
    setPosition({
      top: coords.bottom,
      left: coords.left,
    })

    setOpen(true)
  }

  const handleApply = () => {
    const trimmed = url.trim()
    if (!trimmed) {
      editor.chain().focus().unsetLink().run()
      setOpen(false)
      return
    }

    const isValid = /^https?:\/\//i.test(trimmed)
    const finalUrl = isValid ? trimmed : `https://${trimmed}`

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: finalUrl, ...(external ? { target: "_blank" } : {}) })
      .run()

    setOpen(false)
  }

  console.log("isopen", open)

  const positioning = position
    ? {
        strategy: "fixed" as const,
        placement: "bottom-start" as const,
        gutter: 8,
        getAnchorRect: () => ({
          x: position.left,
          y: position.top,
          height: 0,
        }),
      }
    : undefined

  return (
    <PopoverRoot
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      positioning={positioning}
    >
      <PopoverTrigger>
        <RichTextEditor.ButtonControl
          ref={ref}
          icon={<LuLink />}
          variant={editor.isActive("link") ? "subtle" : "ghost"}
          onClick={handleOpen}
          label="Insert Link"
          {...props}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent p="3" minW="280px">
          <PopoverBody>
            <Text fontWeight="medium" mb="2">
              Insert Link
            </Text>
            <Input
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="sm"
              mb="3"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApply()
              }}
              autoFocus
            />
            <HStack mb="4" align="center">
              <Switch.Root
                checked={external}
                onCheckedChange={(e) => setExternal(e.checked)}
                size="sm"
              >
                <Switch.HiddenInput />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Open in new tab</Switch.Label>
              </Switch.Root>
            </HStack>
            <HStack justify="flex-end" gap="2">
              <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleApply}>
                Apply
              </Button>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </PopoverRoot>
  )
})

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  if (!editor) return null

  return (
    <>
      <RichTextEditor.ButtonControl
        icon={<LuImage />}
        label="Insert Image"
        onClick={() => setOpen(true)}
        variant="ghost"
      />

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Trigger asChild />
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="lg">
              <Dialog.Header>
                <Dialog.Title>Insert Image</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Tabs.Root defaultValue="url">
                  <Tabs.List>
                    <Tabs.Trigger value="url">
                      <LuLink /> Embed URL
                    </Tabs.Trigger>
                    <Tabs.Trigger value="upload">
                      <LuUpload /> Upload File
                    </Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="url">
                    <Box display="flex" gap="2" mt="4">
                      <Input
                        placeholder="Enter image URL"
                        id="image-url-input"
                      />
                      <Button
                        onClick={() => {
                          const url = (
                            document.getElementById(
                              "image-url-input",
                            ) as HTMLInputElement
                          ).value
                          if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                            setOpen(false)
                          }
                        }}
                      >
                        Insert
                      </Button>
                    </Box>
                  </Tabs.Content>

                  <Tabs.Content value="upload">
                    <FileUpload.Root
                      maxW="xl"
                      alignItems="stretch"
                      maxFiles={1}
                      accept="image/*"
                      onFileAccept={(accepted) => {
                        const uploaded = accepted.files ?? []
                        setFiles(uploaded)

                        if (uploaded[0]) {
                          const url = URL.createObjectURL(uploaded[0])
                          editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
                        }
                      }}
                    >
                      <FileUpload.HiddenInput />
                      <FileUpload.Dropzone>
                        <Icon size="md" color="fg.muted">
                          <LuUpload />
                        </Icon>
                        <FileUpload.DropzoneContent>
                          <Box>Drag and drop a file here</Box>
                          <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                        </FileUpload.DropzoneContent>
                      </FileUpload.Dropzone>

                      <FileUpload.List files={files} />
                    </FileUpload.Root>
                  </Tabs.Content>
                </Tabs.Root>
              </Dialog.Body>

              <Dialog.Footer mt="4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

const BoldBtn = createBooleanControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
})

const ItalicBtn = createBooleanControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
})

const UnderlineBtn = createBooleanControl({
  label: "Underline",
  icon: LuUnderline,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
})

const StrikeBtn = createBooleanControl({
  label: "Strike",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
})

const H1Btn = createBooleanControl({
  label: "H1",
  icon: LuHeading1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
})

const H2Btn = createBooleanControl({
  label: "H2",
  icon: LuHeading2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
})

const H3Btn = createBooleanControl({
  label: "H3",
  icon: LuHeading3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
})

const BulletListBtn = createBooleanControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
})

const OrderedListBtn = createBooleanControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
})

const AlignLeftBtn = createBooleanControl({
  label: "Align Left",
  icon: LuAlignLeft,
  command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
})

const AlignCenterBtn = createBooleanControl({
  label: "Align Center",
  icon: LuAlignCenter,
  command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
})

const AlignRightBtn = createBooleanControl({
  label: "Align Right",
  icon: LuAlignRight,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
})

const UndoBtn = createBooleanControl({
  label: "Undo",
  icon: LuRotateCcw,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
})

const RedoBtn = createBooleanControl({
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, "") // remove leading/trailing dashes
}

const HeadingWithSlug = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => ({
          id: attributes.id,
        }),
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (_transactions, _oldState, newState) => {
          const tr = newState.tr
          let modified = false

          newState.doc.descendants((node, pos) => {
            if (node.type.name === "heading") {
              const text = node.textContent
              const slug = slugify(text)
              if (node.attrs.id !== slug) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  id: slug,
                })
                modified = true
              }
            }
          })

          return modified ? tr : null
        },
      }),
    ]
  },
})

const editorContent = `
      <h1 id="heading-0">Legend Of X: The Complete Saga</h1>
      <p>In a world where technology and humanity collide, the fate of civilization hangs in the balance. This is the story of those who dared to question everything they knew.</p>

      <h2 id="heading-1">Chapter 1: Awakening</h2>
      <p>The city of <a href="https://example.com">Neo-Tokyo</a> stretched endlessly beneath the artificial sky. Maya Tanaka stood at the edge of the observation deck, watching the streams of data flow through the neural network that powered the megacity. She had always believed the System was infallible, that the Architects who built it had created a perfect world.</p>
      <p>But something was wrong. The anomalies in the code were becoming more frequent, more deliberate. Someone—or something—was trying to break through.</p>

      <h3 id="heading-2">Part 1: The First Glitch</h3>
      <p>It started with small things. A flicker in the holographic displays. A delay in the transportation grid. Messages that appeared and disappeared before anyone could read them. Maya had noticed these irregularities for weeks, but she was afraid to report them. In Neo-Tokyo, questioning the System was considered treason.</p>
      <p>One evening, as she worked late in the Neural Operations Center, the main screen went black. Then, slowly, text began to appear: "They are watching. They have always been watching. Find the Archive before it's too late."</p>
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
    `

const menuItems = [
  {
    label: "File",
    items: [
      { label: "New", icon: <LuPlus /> },
      { label: "Open", icon: <LuFolder /> },
      { label: "Make a copy", icon: <LuCopy /> },
      { label: "Download", icon: <LuDownload /> },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", icon: <LuArrowRight /> },
      { label: "Redo", icon: <LuArrowRight /> },
      { label: "Cut", icon: <LuSettings /> },
      { label: "Copy", icon: <LuCopy /> },
      { label: "Paste", icon: <LuArrowRight /> },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Zoom in", icon: <LuArrowRight /> },
      { label: "Zoom out", icon: <LuArrowRight /> },
      { label: "Full screen", icon: <LuSettings /> },
    ],
  },
  {
    label: "Insert",
    items: [
      { label: "Image", icon: <LuPlus /> },
      { label: "Table", icon: <LuSettings /> },
      { label: "Drawing", icon: <LuFolder /> },
    ],
  },
  {
    label: "Format",
    items: [
      { label: "Bold", icon: <LuSettings /> },
      { label: "Italic", icon: <LuSettings /> },
      { label: "Underline", icon: <LuSettings /> },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Spelling", icon: <LuSettings /> },
      { label: "Word count", icon: <LuSettings /> },
    ],
  },
  {
    label: "Extensions",
    items: [
      { label: "Add-ons", icon: <LuSettings /> },
      { label: "Apps Script", icon: <LuSettings /> },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "Docs Help", icon: <LuCircleHelp /> },
      { label: "Keyboard shortcuts", icon: <LuSettings /> },
    ],
  },
]
