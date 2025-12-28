"use client"

import {
  Box,
  Button,
  Dialog,
  FileUpload,
  Icon,
  Input,
  Portal,
  Tabs,
} from "@chakra-ui/react"
import Image from "@tiptap/extension-image"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Control,
  RichTextEditor,
  useRichTextEditorContext,
} from "compositions/ui/rich-text-editor"
import { useState } from "react"
import { LuImage, LuLink, LuUpload } from "react-icons/lu"

export const RichTextEditorWithImage = () => {
  const editor = useEditor({
    content: `
      <h2>Jiraiya Sensei</h2>
      <img src="https://preview.redd.it/was-jiraiya-good-looking-back-in-the-day-or-does-it-just-v0-7lcmj7gpf4we1.jpg?width=640&crop=smart&auto=webp&s=cbece8f347da1b9326d1958dbb46284d4bceb828" alt="Jiraiya Sensei" />
      <p><strong>Jiraiya</strong> is a legendary ninja from the Naruto series, known for his wisdom, humor, and mentorship of Naruto Uzumaki.</p>
      <p>Famed as one of the "Legendary Sannin," Jiraiya travels the world gathering knowledge and inspiring future generations.</p>
    `,
    extensions: [StarterKit, Image],
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Strikethrough />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <InsertImageControl />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

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
