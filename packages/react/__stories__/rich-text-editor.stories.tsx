import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Rich Text Editor / Editors",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RichTextEditorBasic as Basic } from "compositions/examples/tiptap-editor/rich-text-editor-basic"
export { RichTextEditorControlled as Controlled } from "compositions/examples/tiptap-editor/rich-text-editor-controlled"
export { RichTextEditorBubbleMenu as BubbleMenu } from "compositions/examples/tiptap-editor/rich-text-editor-bubble-menu"
export { RichTextEditorTask as Task } from "compositions/examples/tiptap-editor/rich-text-editor-task"
export { RichTextEditorCharacterCount as CharacterCount } from "compositions/examples/tiptap-editor/rich-text-editor-character-count"
export { RichTextEditorWithImage as Image } from "compositions/examples/tiptap-editor/rich-text-editor-with-image"
export { RichTextEditorWithCode as Code } from "compositions/examples/tiptap-editor/rich-text-editor-with-code"
export { RichTextEditorWithHashtags as Hashtags } from "compositions/examples/tiptap-editor/rich-text-editor-with-hashtags"
