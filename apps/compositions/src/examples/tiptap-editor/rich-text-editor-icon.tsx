import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa"

export function RichTextEditorIcon() {
  const editor = useEditor({
    content: `You can change the control <code>icon</code> by using the "icon" prop.`,
    extensions: [StarterKit],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold icon={<FaBold />} />
          <RichTextEditor.Italic icon={<FaItalic />} />
          <RichTextEditor.Underline icon={<FaUnderline />} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
