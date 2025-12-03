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
// export { RichTextEditorColor as Color } from "compositions/examples/tiptap-editor/rich-text-editor-color"
// export { RichTextEditorIcon as CustomIcon } from "compositions/examples/tiptap-editor/rich-text-editor-icon"
// export { RichTextEditorCustomControl as CustomControl } from "compositions/examples/tiptap-editor/rich-text-editor-custom-control"
export { RichTextEditorWithImage as Image } from "compositions/examples/tiptap-editor/rich-text-editor-with-image"
export { RichTextEditorWithCode as Code } from "compositions/examples/tiptap-editor/rich-text-editor-with-code"
