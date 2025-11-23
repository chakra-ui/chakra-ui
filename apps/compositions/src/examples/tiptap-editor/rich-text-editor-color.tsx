import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function RichTextEditorColor() {
  const editor = useEditor({
    content: `
      <p>Select some text to try the color options!</p>
      <p>You can make text bold, italic, or change its color.</p>
    `,
    extensions: [StarterKit, TextStyle, Color],
    shouldRerenderOnTransaction: true,
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Color color="#fa5252" />
          <RichTextEditor.Color color="#12b886" />
          <RichTextEditor.Color color="#228be6" />
          <RichTextEditor.ColorPicker />
          <RichTextEditor.UnsetColor />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
