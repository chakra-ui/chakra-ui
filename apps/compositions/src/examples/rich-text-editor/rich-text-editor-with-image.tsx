"use client"

import {
  Box,
  Button,
  Dialog,
  FileUpload,
  HStack,
  Icon,
  Input,
  Portal,
  Tabs,
} from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonControl,
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  createBooleanControl,
  useRichTextEditorContext,
} from "compositions/ui/rich-text-editor"
import { useState } from "react"
import {
  LuBold,
  LuImage,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuStrikethrough,
  LuUpload,
} from "react-icons/lu"

export const RichTextEditorWithImage = () => {
  const editor = useEditor({
    content: `
      <h2>Dr. Stone</h2>
      <p><strong>Dr. Stone</strong> is a Japanese manga and anime series that follows the story of Senku Ishigami, a scientific genius who awakens thousands of years after humanity has been petrified.</p>
      <p>The world is in ruins, and Senku aims to rebuild civilization using the power of science.</p>
    `,
    extensions: [StarterKit, Image],
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot
      editor={editor}
      borderBottom="1px solid"
      borderColor="border"
    >
      <Box>
        <HStack gap={1} border="1px solid" borderColor="border" p="3">
          <RichTextEditorControlGroup>
            <Bold />
            <Italic />
            <Strikethrough />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <BulletList />
            <OrderedList />
          </RichTextEditorControlGroup>

          <RichTextEditorControlGroup>
            <InsertImageControl />
          </RichTextEditorControlGroup>
        </HStack>
      </Box>

      <RichTextEditorContent
        minH="400px"
        p={6}
        borderX="1px solid"
        borderColor="border"
      />
    </RichTextEditorRoot>
  )
}

const Bold = createBooleanControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "solid" : "ghost"),
})

const Italic = createBooleanControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "solid" : "ghost"),
})

const Strikethrough = createBooleanControl({
  label: "Strikethrough",
  icon: LuStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "solid" : "ghost"),
})

const BulletList = createBooleanControl({
  label: "Bullet List",
  icon: LuList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "solid" : "ghost"),
})

const OrderedList = createBooleanControl({
  label: "Ordered List",
  icon: LuListOrdered,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "solid" : "ghost"),
})

function InsertImageControl() {
  const { editor } = useRichTextEditorContext()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  if (!editor) return null

  return (
    <>
      <RichTextEditorButtonControl
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
                          if (url)
                            editor.chain().focus().setImage({ src: url }).run()
                          setOpen(false)
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
