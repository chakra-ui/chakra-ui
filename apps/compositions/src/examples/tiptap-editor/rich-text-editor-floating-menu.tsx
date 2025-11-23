import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import { useEditor } from "@tiptap/react"
import { FloatingMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"

export function RichTextEditorFloatingMenu() {
  const editor = useEditor({
    content: `Enter a new line to see floating menu`,
    extensions: [StarterKit],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      {editor && (
        <FloatingMenu editor={editor}>
          <RichTextEditor.ControlsGroup noSeparator shadow="sm" rounded="sm">
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strike />
          </RichTextEditor.ControlsGroup>
        </FloatingMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
