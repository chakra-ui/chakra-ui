import {
  BubbleMenu,
  EditorProvider,
  EditorRoot,
  H1,
  H2,
  RichTextEditor,
  TextFormatToolbar,
  ToolbarRoot,
  Underline,
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
          <BubbleMenu>
            <H1 />
            <H2 />
            <Underline />
          </BubbleMenu>
          <TextFormatToolbar />
        </ToolbarRoot>
        <EditorRoot />
      </RichTextEditor>
    </EditorProvider>
  )
}
