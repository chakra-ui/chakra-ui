import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import { useEditor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"

export function RichTextEditorBubbleMenu() {
  const editor = useEditor({
    content: `
      <p>Select some text to see the bubble menu!</p>
      <p><strong>Tip:</strong> Try selecting this sentence.</p>
    `,
    extensions: [StarterKit],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup noSeparator shadow="sm" rounded="sm">
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strike />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
