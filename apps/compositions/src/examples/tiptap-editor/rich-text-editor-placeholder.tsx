import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import Placeholder from "@tiptap/extension-placeholder"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function RichTextEditorPlaceholder() {
  const editor = useEditor({
    content: "",
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "This is a placeholder" }),
    ],
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
