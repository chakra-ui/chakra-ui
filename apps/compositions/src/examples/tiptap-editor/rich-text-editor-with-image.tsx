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
import {
  RichTextEditor,
  useRichTextEditorContext,
} from "@chakra-ui/tiptap-editor"
import Image from "@tiptap/extension-image"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"
import { LuImage, LuLink, LuUpload } from "react-icons/lu"

export function RichTextEditorWithImage() {
  const editor = useEditor({
    content: `
      <h2>Dr. Stone</h2>
      <p><strong>Dr. Stone</strong> is a Japanese manga and anime series that follows the story of Senku Ishigami, a scientific genius who awakens thousands of years after humanity has been petrified.</p>
      <p>The world is in ruins, and Senku aims to rebuild civilization using the power of science. Alongside his friends, he embarks on adventures to revive humanity, confront threats, and innovate technologies from scratch.</p>
      <p>Here’s a glimpse of the main character:</p>
      <p><img src="https://wallpapers.com/images/hd/senku-ishigami-dr-stone-qecaaz5eq3v7s5do.webp" alt="Senku Ishigami" style="max-width:100%; border-radius:8px;" /></p>
      <p>Use the toolbar to add your own images and enrich the story!</p>
    `,
    extensions: [StarterKit, Image],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <InsertImageControl />
        </RichTextEditor.ControlsGroup>
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
      <RichTextEditor.Control
        icon={<LuImage />}
        label="Insert Image"
        onClick={() => setOpen(true)}
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
