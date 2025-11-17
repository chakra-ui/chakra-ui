import {
  EditorProvider,
  EditorRoot,
  RichTextEditor,
  TextFormatToolbar,
  ToolbarRoot,
  useEditor,
} from "@chakra-ui/tiptap-editor"

export function BasicEditor() {
  const editor = useEditor({
    content: "<p>Start typing to see the editor in action...</p>",
  })

  return (
    <EditorProvider editor={editor}>
      <RichTextEditor>
        <ToolbarRoot>
          <TextFormatToolbar />
        </ToolbarRoot>
        <EditorRoot />
      </RichTextEditor>
    </EditorProvider>
  )
}
