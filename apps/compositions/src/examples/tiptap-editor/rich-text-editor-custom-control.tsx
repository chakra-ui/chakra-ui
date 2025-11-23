import {
  RichTextEditor,
  useRichTextEditorContext,
} from "@chakra-ui/tiptap-editor"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { FaBolt } from "react-icons/fa"

export function RichTextEditorCustomControl() {
  const editor = useEditor({
    content: `Try clicking the lightning button to insert a ⚡ emoji!`,
    extensions: [StarterKit],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <InsertLightningControl />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

function InsertLightningControl() {
  const { editor } = useRichTextEditorContext()

  if (!editor) return null

  return (
    <RichTextEditor.Control
      onClick={() => editor.commands.insertContent("⚡")}
      aria-label="Insert lightning"
      label="Insert lightning"
      icon={<FaBolt />}
    />
  )
}
